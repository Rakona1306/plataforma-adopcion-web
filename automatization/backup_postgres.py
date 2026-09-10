#!/usr/bin/env python3
"""
Script para conectarse a una base de datos PostgreSQL y generar
un respaldo (dump) comprimido en formato .gz, listo para importar
desde pgAdmin (Restore) o desde psql.

Requisitos:
- Tener instalado PostgreSQL client tools (incluye pg_dump).
  En Ubuntu/Debian: sudo apt install postgresql-client
  En Windows: instalar PostgreSQL y agregar la carpeta "bin" al PATH.
- Instalar python-dotenv para leer el archivo .env:
    pip install python-dotenv
- Crear un archivo ".env" (junto a este script) con este contenido:
    DB_HOST=localhost
    DB_PORT=5432
    DB_NAME=mi_base_de_datos
    DB_USER=postgres
    DB_PASSWORD=mi_password

Uso:
    python3 backup_postgres.py
"""

import subprocess
import gzip
import shutil
import os
import sys
from datetime import datetime

try:
    from dotenv import load_dotenv
except ImportError:
    print("ERROR: falta el paquete 'python-dotenv'. Instálalo con:")
    print("    pip install python-dotenv")
    sys.exit(1)

# ------------------------------------------------------------------
# CONFIGURACIÓN: se carga desde el archivo .env
# ------------------------------------------------------------------
load_dotenv()  # busca un archivo ".env" en el directorio actual

DB_HOST = os.getenv("DB_HOST")
DB_PORT = os.getenv("DB_PORT")
DB_NAME = os.getenv("DB_NAME")
DB_USER = os.getenv("DB_USER")
DB_PASSWORD = os.getenv("DB_PASSWORD")

# Validar que las variables obligatorias estén presentes
_faltantes = [
    nombre for nombre, valor in {
        "DB_HOST": DB_HOST,
        "DB_PORT": DB_PORT,
        "DB_NAME": DB_NAME,
        "DB_USER": DB_USER,
        "DB_PASSWORD": DB_PASSWORD,
    }.items() if not valor
]
if _faltantes:
    print(f"ERROR: faltan variables en el archivo .env: {', '.join(_faltantes)}")
    sys.exit(1)

# Carpeta y nombre de archivo de salida
OUTPUT_DIR = "backups"
TIMESTAMP = datetime.now().strftime("%Y%m%d_%H%M%S")
DUMP_FILENAME = f"{DB_NAME}_{TIMESTAMP}.sql"
GZ_FILENAME = f"{DUMP_FILENAME}.gz"


def hacer_backup():
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    dump_path = os.path.join(OUTPUT_DIR, DUMP_FILENAME)
    gz_path = os.path.join(OUTPUT_DIR, GZ_FILENAME)

    # Ruta al binario de pg_dump. Si tienes varias versiones instaladas
    # (por ejemplo en Ubuntu con postgresql-client-17), es más seguro
    # apuntar directo al binario correcto en vez de depender del PATH.
    # Se puede sobreescribir agregando PG_DUMP_BIN=... en el archivo .env
    PG_DUMP_BIN = os.getenv("PG_DUMP_BIN", "pg_dump")

    # Comando pg_dump: -F p = formato plano (SQL plano, legible)
    # Puedes cambiar a -F c si quieres formato "custom" de pg_dump
    # (más eficiente, pero requiere pg_restore en lugar de psql)
    #
    # -n public       -> Solo trae el schema "public" (ignora auth, storage,
    #                     extensions, graphql, etc. que trae Supabase por defecto)
    # --no-owner      -> No incluye comandos ALTER OWNER (evita errores si el
    #                     rol dueño no existe en la base de datos destino)
    # --no-privileges -> No incluye GRANT/REVOKE (evita errores de permisos
    #                     de roles propios de Supabase que no existen afuera)
    comando = [
        PG_DUMP_BIN,
        "-h", DB_HOST,
        "-p", DB_PORT,
        "-U", DB_USER,
        "-d", DB_NAME,
        "-n", "public",
        "--no-owner",
        "--no-privileges",
        "-F", "p",          # formato plano SQL
        "-f", dump_path      # archivo de salida
    ]

    # Pasamos la contraseña mediante variable de entorno (más seguro
    # que ponerla en la línea de comandos)
    env = os.environ.copy()
    env["PGPASSWORD"] = DB_PASSWORD

    print(f"Conectando a la base de datos '{DB_NAME}' en {DB_HOST}:{DB_PORT}...")
    try:
        resultado = subprocess.run(
            comando,
            env=env,
            check=True,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True
        )
    except FileNotFoundError:
        print("ERROR: No se encontró 'pg_dump'. Instala PostgreSQL client tools "
              "y asegúrate de que esté en el PATH del sistema.")
        sys.exit(1)
    except subprocess.CalledProcessError as e:
        print("ERROR al ejecutar pg_dump:")
        print(e.stderr)
        sys.exit(1)

    print(f"Dump generado correctamente en: {dump_path}")

    # Comprimir el archivo .sql resultante a .gz
    print("Comprimiendo el archivo a .gz...")
    with open(dump_path, "rb") as f_in:
        with gzip.open(gz_path, "wb") as f_out:
            shutil.copyfileobj(f_in, f_out)

    # Eliminar el .sql sin comprimir (opcional)
    os.remove(dump_path)

    print(f"Backup comprimido creado con éxito: {gz_path}")
    print("\nPara importarlo desde pgAdmin:")
    print(" 1. Clic derecho sobre la base de datos destino -> Restore...")
    print(" 2. Formato: Plain, y selecciona el archivo .gz")
    print("    (pgAdmin descomprime automáticamente archivos .gz)")
    print("\nO desde la terminal con psql:")
    print(f"    gunzip -c {gz_path} | psql -h {DB_HOST} -U {DB_USER} -d nombre_base_destino")


if __name__ == "__main__":
    hacer_backup()
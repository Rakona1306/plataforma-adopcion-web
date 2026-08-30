export default {
    extends: ['@commitlint/config-conventional'],
    // 1. Mantenemos tu parser para que entienda las partes de tu commit
    parserPreset: {
        parserOpts: {
            headerPattern: /^(\w+)\(([A-Z]+-\d+)\): (.+)$/,
            headerCorrespondence: ["type", "ticket", "subject"],
        },
    },

    // 2. Creamos un plugin local para personalizar el error
    plugins: [
        {
            rules: {
                "formato-personalizado": (parsed) => {
                    // Extraemos el mensaje completo que escribiste
                    const { header } = parsed;
                    const patron = /^(\w+)\(([A-Z]+-\d+)\): (.+)$/;

                    if (!patron.test(header)) {
                        // Aquí defines tu mensaje de error personalizado
                        return [
                            false,
                            `\n❌ FORMATO DE COMMIT INVÁLIDO ❌\n` +
                            `Intentaste usar: "${header}"\n\n` +
                            `Tu commit DEBE cumplir con el formato: tipo(TICKET-123): descripción corta\n\n` +
                            `Ejemplos válidos:\n` +
                            `  feat(FRONT-12): agregar botón de adopción\n` +
                            `  fix(API-404): corregir error en el servidor\n`,
                        ];
                    }
                    return [true];
                },
            },
        },
    ],

    // 3. Aplicamos las reglas
    rules: {
        // Apagamos estas reglas por defecto para que no hagan "ruido" con tu mensaje personalizado
        "type-empty": [0],
        "subject-empty": [0],

        // Activamos nuestra nueva regla estricta
        "formato-personalizado": [2, "always"],

        // Mantenemos tu regla de tipos válidos
        "type-enum": [
            2,
            "always",
            [
                "feat",
                "fix",
                "refactor",
                "chore",
                "docs",
                "test",
                "style",
                "perf",
                "build",
                "ci",
                "revert",
            ],
        ],
    },
};

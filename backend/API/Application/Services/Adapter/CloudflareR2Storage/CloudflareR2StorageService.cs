using Amazon.S3;
using Amazon.S3.Model;
using Microsoft.AspNetCore.Http;
using System.Net;

namespace API.Application.Services.Adapter.CloudflareR2Storage
{
    public class CloudflareR2StorageService : ICloudflareR2StorageService
    {
        private readonly IAmazonS3 _s3Client;
        private readonly string _publicDomain;

        public CloudflareR2StorageService()
        {
            var accessKey = Environment.GetEnvironmentVariable("R2_ACCESS_KEY_ID");
            var secretKey = Environment.GetEnvironmentVariable("R2_SECRET_ACCESS_KEY");
            var endpointUrl = Environment.GetEnvironmentVariable("R2_ENDPOINT_URL");
            _publicDomain = Environment.GetEnvironmentVariable("R2_PUBLIC_CUSTOM_DOMAIN") ?? "";

            if (string.IsNullOrEmpty(accessKey) || string.IsNullOrEmpty(secretKey) || string.IsNullOrEmpty(endpointUrl))
            {
                throw new ArgumentNullException("Falta configurar las variables de entorno de Cloudflare R2.");
            }

            _publicDomain = _publicDomain.TrimEnd('/');

            var config = new AmazonS3Config
            {
                ServiceURL = endpointUrl,
                ForcePathStyle = true
            };

            _s3Client = new AmazonS3Client(accessKey, secretKey, config);
        }

        // 📤 SUBIDA: Recibe el bucket raíz ("alberguesalvavidas")
        public async Task<string> UploadImageAsync(IFormFile file, Guid petId, string bucketName)
        {
            if (file == null || file.Length == 0)
                throw new ArgumentException("El archivo está vacío.");

            // Generamos el nombre único del archivo
            var fileName = $"{petId}__{Guid.NewGuid()}{Path.GetExtension(file.FileName)}";

            // 🔥 AQUÍ SE CREA LA CARPETA EN R2: Estipulamos explícitamente la ruta "MASKOTS/archivo.webp"
            var fileKey = $"MASKOTS/{fileName}";

            using var stream = file.OpenReadStream();

            var putRequest = new PutObjectRequest
            {
                BucketName = bucketName, // "alberguesalvavidas"
                Key = fileKey,          // "MASKOTS/tu-guid.webp"
                InputStream = stream,
                ContentType = file.ContentType,
                DisablePayloadSigning = true
            };

            var response = await _s3Client.PutObjectAsync(putRequest);

            if (response.HttpStatusCode != HttpStatusCode.OK)
                throw new Exception("Error al subir el archivo a Cloudflare R2.");

            // Retorna exactamente lo que tu Base de Datos tiene:
            // https://pub-xxx.r2.dev/MASKOTS/7ae6a93f-4ae9-4629-9c72-af26502a28f1.webp
            return $"{_publicDomain}/{fileKey}";
        }

        // 🗑️ BORRADO: Extrae la ruta completa ("MASKOTS/archivo.webp") directamente de la URL
        public async Task DeleteFileAsync(string bucketName, string fileUrl)
        {
            if (string.IsNullOrWhiteSpace(fileUrl))
                return;

            // Extrae "MASKOTS/tu-guid.webp" de la URL de la base de datos
            var fileKey = ExtractFileKey(fileUrl);

            var deleteRequest = new DeleteObjectRequest
            {
                BucketName = bucketName, // "alberguesalvavidas"
                Key = fileKey           // "MASKOTS/tu-guid.webp"
            };

            var response = await _s3Client.DeleteObjectAsync(deleteRequest);

            int statusCode = (int)response.HttpStatusCode;
            if (statusCode < 200 || statusCode > 299)
            {
                Console.WriteLine($"Advertencia: R2 rechazó el borrado. Status: {response.HttpStatusCode}");
            }
        }

        private static string ExtractFileKey(string url)
        {
            var uri = new Uri(url);
            string decodedPath = WebUtility.UrlDecode(uri.LocalPath);
            return decodedPath.TrimStart('/');
        }
    }
}
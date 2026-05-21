
using Supabase;

namespace API.Application.Services.Adapter.SupabaseS3
{
    public class SupabaseStorageService : ISupabaseStorageService
    {
        private readonly Client _client;

        public SupabaseStorageService(
            Client client
        )
        {
            _client = client;
        }

        public async Task<string> UploadImageAsync(
            IFormFile file,
            string bucket
        )
        {
            using var memoryStream =
                new MemoryStream();

            await file.CopyToAsync(memoryStream);

            byte[] bytes = memoryStream.ToArray();

            var fileName =
                $"{Guid.NewGuid()}{Path.GetExtension(file.FileName)}";

            await _client.Storage
                .From(bucket)
                .Upload(
                    bytes,
                    fileName
                );

            return _client.Storage
                .From(bucket)
                .GetPublicUrl(fileName);
        }

        public async Task DeleteFileAsync(
            string bucket,
            string fileUrl
        )
        {
            if (string.IsNullOrWhiteSpace(fileUrl))
                return;

            var fileName = ExtractFileName(fileUrl);

            await _client.Storage
                .From(bucket)
                .Remove(
                    new List<string>
                    {
                    fileName
                    }
                );
        }

        private static string ExtractFileName(
            string url
        )
        {
            return new Uri(url)
                .Segments
                .Last();
        }
    }
}

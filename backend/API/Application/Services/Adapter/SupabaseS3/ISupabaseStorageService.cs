namespace API.Application.Services.Adapter.SupabaseS3
{
    public interface ISupabaseStorageService
    {
        Task<string> UploadImageAsync(
            IFormFile file,
            string bucket
        );

        Task DeleteFileAsync(
            string bucket,
            string fileUrl
        );
    }
}

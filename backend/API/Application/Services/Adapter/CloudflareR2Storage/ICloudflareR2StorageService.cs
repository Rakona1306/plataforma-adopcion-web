namespace API.Application.Services.Adapter.CloudflareR2Storage;

public interface ICloudflareR2StorageService
{
    Task<string> UploadImageAsync(IFormFile file, Guid petId, string bucketName);
    Task DeleteFileAsync(string bucketName, string fileUrl);
}
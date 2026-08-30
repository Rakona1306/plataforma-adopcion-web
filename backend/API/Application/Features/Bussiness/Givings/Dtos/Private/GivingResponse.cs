namespace API.Application.Features.Bussiness.Givings.Dtos.Private
{
    public class GivingResponse
    {
        public int Id { get; set; }
        public decimal? Amount { get; set; }
        public string Name { get; set; } = null!;
        public string Type { get; set; } = null!; // Se expone como String para facilitar lectura en Frontend
        public decimal? Quantity { get; set; }
        public string? Unit { get; set; }
        public decimal? Kg { get; set; }

        // Columnas de Auditoría (Heredadas de BaseModelInt)
        public DateTime CreatedAt { get; set; }
        public Guid? CreatedBy { get; set; }
        public DateTime LastUpdatedAt { get; set; }
        public Guid? UpdatedBy { get; set; }
    }
}
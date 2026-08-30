using API.Domain.Model.Bussiness;

namespace API.Application.Features.Bussiness.Givings.Dtos
{
    public class GivingFilterDto
    {
        public int Page { get; set; } = 1;
        public int PageSize { get; set; } = 10;
        public string? Search { get; set; }
        public GivingType? Type { get; set; }
        public MeasurementUnit? Unit { get; set; }
        public decimal? MinAmount { get; set; }
        public decimal? MaxAmount { get; set; }
    }
}
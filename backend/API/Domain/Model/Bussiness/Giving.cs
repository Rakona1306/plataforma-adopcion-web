using System.ComponentModel.DataAnnotations.Schema;
using API.Domain.Common.Model;

namespace API.Domain.Model.Bussiness
{
    public class Giving : BaseModelInt
    {
        [Column(TypeName = "decimal(10,2)")]
        public decimal? Amount { get; set; }
        public string Name { get; set; } = null!;
        public GivingType Type { get; set; }

        [Column(TypeName = "decimal(10,2)")]
        public decimal? Quantity { get; set; }
        public MeasurementUnit? Unit { get; set; } = null!;

        [Column(TypeName = "decimal(10,2)")]
        public decimal? Kg { get; set; }

        public ICollection<PricingDonation> PricingDonations { get; set; } = new List<PricingDonation>();
        public ICollection<PricingSponsor> PricingSponsors { get; set; } = new List<PricingSponsor>();
    }

    public enum MeasurementUnit
    {
        KG = 1,            // Kilogramos
        GRAMS = 2,         // Gramos
        LITERS = 3,        // Litros
        UNITS = 4,         // Unidades (bolsas, latas, etc.)
        BOXES = 5,         // Cajas
        BAGS = 6           // Bolsas
    }

    public enum GivingType
    {
        MONEY = 1,
        GOODS = 2
    }
}
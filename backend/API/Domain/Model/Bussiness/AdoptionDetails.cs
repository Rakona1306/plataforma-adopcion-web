using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.Domain.Model.Bussiness
{
    public class AdoptionDetails
    {
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();
        public Guid RequestId { get; set; }

        public Request Request { get; set; } = null!;

        public string HouseType { get; set; } = string.Empty;

        public bool HasOtherPets { get; set; }

        public bool HasChildren { get; set; }

        public bool AcceptHomeVisit { get; set; }
    }
}
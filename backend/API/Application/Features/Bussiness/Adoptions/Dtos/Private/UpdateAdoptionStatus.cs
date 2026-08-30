using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using API.Domain.Model.Bussiness;

namespace API.Application.Features.Bussiness.Adoptions.Dtos.Private
{
    public class UpdateAdoptionStatus
    {
        [Required]
        public int Id { get; set; }

        [Required]
        public AdoptionStatus Status { get; set; }

        [MaxLength(2000)]
        public string? Observations { get; set; }
    }
}
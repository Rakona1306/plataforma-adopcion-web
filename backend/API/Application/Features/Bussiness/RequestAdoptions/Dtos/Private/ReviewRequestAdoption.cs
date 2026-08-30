using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using API.Domain.Model.Enums;

namespace API.Application.Features.Bussiness.RequestAdoptions.Dtos.Private
{
    public class ReviewRequestAdoption
    {
        [Required]
        public int Id { get; set; }

        [Required]
        public RequestStatus Status { get; set; }

        [MaxLength(1000)]
        public string? ReviewComment { get; set; }
    }
}
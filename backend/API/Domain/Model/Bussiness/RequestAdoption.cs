using System.ComponentModel.DataAnnotations;
using API.Domain.Common.Model;
using API.Domain.Model.Enums;
using API.Domain.Model.Organization;
using API.Domain.Model.Shelter;

namespace API.Domain.Model.Bussiness
{
    public class RequestAdoption : BaseModelInt
    {
        public Guid UserId { get; set; }
        public Guid? PetId { get; set; }
        public string HouseType { get; set; } = string.Empty;
        public bool HasOtherPets { get; set; }
        public bool HasChildren { get; set; }
        public bool AcceptHomeVisit { get; set; }
        public DateTime? ReviewedAt { get; set; }
        public Guid? ReviewedBy { get; set; }
        public string? ReviewComment { get; set; }
        public string Dni { get; set; } = string.Empty;
        public PlatformProvider PlatformProvider { get; set; } = PlatformProvider.Web;

        public RequestStatus Status { get; set; }
        public string Motivation { get; set; } = string.Empty;
        public string District { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public string Address { get; set; } = string.Empty;
        public string? Reference { get; set; } = string.Empty;

        public User User { get; set; } = null!;
        public User? Reviewer { get; set; }
        public Pet Pet { get; set; } = null!;
    }

    public enum PlatformProvider
    {
        Web = 1,
        Sistema = 2,
    }
}
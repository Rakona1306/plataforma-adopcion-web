using API.Application.Features.Bussiness.VolunteerApplications.Dtos.Private;
using API.Application.Features.Bussiness.VolunteerApplications.Dtos.Public;
using API.Domain.Repository.Bussiness;
using AutoMapper;

namespace API.Application.Services.Bussiness.VolunteerApplications
{
    public class PrivateVolunteerApplicationService : VolunteerApplicationService<VolunteerApplicationResponse>
    {
        public PrivateVolunteerApplicationService(
            IVolunteerApplicationRepository repository,
            IMapper mapper) : base(repository, mapper) { }
    }

    // ✅ Implementación concreta para Público/Voluntarios
    public class PublicVolunteerApplicationService : VolunteerApplicationService<VolunteerApplicationPublicResponse>
    {
        public PublicVolunteerApplicationService(
            IVolunteerApplicationRepository repository,
            IMapper mapper) : base(repository, mapper) { }
    }
}

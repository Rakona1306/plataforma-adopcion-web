using API.Application.Features.Bussiness.Donations.Dtos;
using API.Domain.Model.Bussiness;
using Riok.Mapperly.Abstractions;

namespace API.Application.Features.Bussiness.Donations.Mappers;

[Mapper]
public partial class DonationMapper
{
    public partial Donation ToEntity(CreateDonationDto dto);

    public partial void Update(UpdateDonationDto dto, [MappingTarget] Donation entity);

    // Suponiendo que tu entidad User tiene una propiedad 'Name' (o 'FirstName', cámbialo si es necesario)
    [MapProperty(nameof(Donation.User.Name), nameof(DonationResponse.UserName))]
    public partial DonationResponse ToResponse(Donation entity);

    public partial List<DonationResponse> ToResponseList(List<Donation> entities);
}
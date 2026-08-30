using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Application.Features.Bussiness.PricingSponsors.Dtos;
using API.Domain.Model.Bussiness;
using Riok.Mapperly.Abstractions;

namespace API.Application.Features.Bussiness.PricingSponsors.Mappers
{
    [Mapper]
    public partial class PricingSponsorMapper
    {
        [MapperIgnoreTarget(
            nameof(PricingSponsor.Id)
        )]
        [MapperIgnoreTarget(
            nameof(PricingSponsor.CreatedAt)
        )]
        [MapperIgnoreTarget(
            nameof(PricingSponsor.CreatedBy)
        )]
        [MapperIgnoreTarget(
            nameof(PricingSponsor.LastUpdatedAt)
        )]
        [MapperIgnoreTarget(
            nameof(PricingSponsor.UpdatedBy)
        )]
        public partial PricingSponsor ToEntity(
            CreatePricingSponsor dto
        );
    }
}
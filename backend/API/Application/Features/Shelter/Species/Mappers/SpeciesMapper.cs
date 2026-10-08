using API.Application.Features.Shelter.Species.Dtos;
using API.Domain.Model.Shelter;
using AutoMapper;
using AutoMapper.QueryableExtensions;

namespace API.Application.Features.Shelter.Species.Mappers
{
    public partial class SpeciesMapper
    {
        private readonly IMapper _mapper;

        public SpeciesMapper(IMapper mapper)
        {
            _mapper = mapper;
        }

        // Proyecta directamente el IQueryable hacia el DTO en la base de datos
        public IQueryable<SpeciesResponse> ProjectToResponse(IQueryable<Specie> query)
        {
            return query.ProjectTo<SpeciesResponse>(_mapper.ConfigurationProvider);
        }

        public Specie ToEntity(CreateSpeciesDto dto)
        {
            return _mapper.Map<Specie>(dto);
        }

        public void Update(UpdateSpeciesDto dto, Specie entity)
        {
            _mapper.Map(dto, entity);
        }
    }
}
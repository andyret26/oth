using AutoMapper;
using othApi.Data.Dtos.OtmDtos;
using othApi.Data.Entities.Otm;

namespace othApi.Services.Mappers.OtmMappers;
public class OtmMapper : Profile
{
    public OtmMapper()
    {
        CreateMap<OTMPostTourneyDto, HostedTournament>();
    }
}

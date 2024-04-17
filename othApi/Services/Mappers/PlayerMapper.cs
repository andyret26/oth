using AutoMapper;
using othApi.Data;
using othApi.Data.Dtos;
using othApi.Data.Dtos.OtmDtos;
using othApi.Data.Entities;

namespace othApi.Services.Mappers
{
    public class PlayerMapper : Profile
    {
        public PlayerMapper()
        {
            CreateMap<Player, PlayerDto>();
            CreateMap<Player, PlayerMinimalDto>();
            CreateMap<Player, PlayerWithoutTournamentsDto>();

            CreateMap<PlayerResponseData, Player>()
                .ForMember(
                    (p) => p.Global_rank,
                    (opt) => opt.MapFrom(prd => prd.Statistics_rulesets.Osu.Global_rank));

            CreateMap<Player, OtmDashboardPlayerDto>()
                .ForMember(dto => dto.DiscordUsername, opt => opt.MapFrom(p => p.DiscordTag));

            CreateMap<Player, OtmPlayerDto>()
                .ForMember(dto => dto.DiscordUsername, opt => opt.MapFrom(p => p.DiscordTag));

        }
    }
}
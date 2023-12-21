using AutoMapper;
using othApi.Data.Dtos;
using othApi.Data.Entities;

namespace othApi.Services.Mappers
{
    public class TournamentMapper: Profile
    {
        public TournamentMapper()
        {
            CreateMap<TournamentPostDto, Tournament>();
            CreateMap<Tournament, TournamentDto>();
            CreateMap<TournamentDto, Tournament>();
            CreateMap<Tournament, Tournament>();
            CreateMap<Tournament, TournamentWithoutPlayersDto>();
            CreateMap<TournamentPutDto, Tournament>();
        }
    }
}
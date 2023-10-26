using AutoMapper;
using othApi.Data.Dtos;
using othApi.Data.Entities;

namespace othApi.Services.Mappers
{
    public class PlayerMapper: Profile
    {
        public PlayerMapper()
        {
            CreateMap<PlayerPostDto, Player>();
            CreateMap<Player, PlayerDto>();
        }
    }
}
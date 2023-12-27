using System.Data.SqlClient;
using System.Reflection;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using othApi.Data;
using othApi.Data.Dtos;
using othApi.Data.Entities;

namespace othApi.Services.Players;

public class PlayerService : IPlayerService
{
    private readonly DataContext _db;
    private readonly IMapper _mapper;

    public PlayerService(DataContext db, IMapper mapper)
    {
        _db = db;
        _mapper = mapper;
    }

    public Player? Delete(int id)
    {
        throw new NotImplementedException();
    }

    public List<Player> Get()
    {
        try
        {
            var players = _db.Players.ToList();
            return players;
        }
        catch (SqlException err)
        {
            Console.WriteLine(err.Message);
            throw;
        }
    }

    public Player? GetById(int id)
    {
        try
        {
            var player = _db.Players.Include(p => p.Tournaments).SingleOrDefault((p) => p.Id == id);
            return player;
        }
        catch (SqlException err)
        {
            Console.WriteLine(err.Message);
            throw;
        };
    }

    public List<Player>? GetMultipleById(List<int> ids)
    {
        try
        {
            var players = _db.Players.Where((p) => ids.Contains(p.Id)).ToList();
            return players;
        }
        catch (SqlException err)
        {
            Console.WriteLine(err.Message);
            throw;
        };
    }

    public Player Post(Player player)
    {
        try
        {
            var addedPlayer = _db.Players.Add(player);
            _db.SaveChanges();

            return addedPlayer.Entity;
        }
        catch (SqlException err)
        {
            Console.WriteLine(err.Message);
            throw;
        }
    }

    public Player? Update(Player player)
    {

        throw new NotImplementedException();
        // TODO use automapper to update
        // try
        // {
        //     var playerToUpdate = _db.Players.SingleOrDefault((t) => t.Id == player.Id);
        //     if (playerToUpdate != null)
        //     {
        //         playerToUpdate.Name = player.Name;
        //         playerToUpdate.Rank = player.Rank;
        //         playerToUpdate.Country = player.Country;
        //         playerToUpdate.Tournaments = player.Tournaments;

        //         _db.SaveChanges();
        //         return playerToUpdate;
        //     }
        //     else
        //     {
        //         return null;
        //     }

        // }
        // catch (SqlException err)
        // {
        //     Console.WriteLine(err.Message);
        //     throw;
        // }
    }

    public bool Exists(int id)
    {
        try
        {
            var player = _db.Players.SingleOrDefault((p) => p.Id == id);
            return player != null;
        }
        catch (SqlException err)
        {
            Console.WriteLine(err.Message);
            throw;
        }
    }

    public List<Player> GetMinimal()
    {
        try
        {
            var players = _db.Players.Select(p => new Player
            {
                Id = p.Id,
                Username = p.Username,

            }).ToList();
            return players;
        }
        catch (SqlException err)
        {
            Console.WriteLine(err.Message);
            throw;
        }
    }

    public async Task<bool> GetStats(int id)
    {
        // Unique TeamMates count
        var tournaments = await _db.Tournaments.Where(t => t.TeamMates!.Any(p => p.Id == id)).Include(t => t.TeamMates).ToListAsync();
        var idList = new List<int>();
        foreach (var t in tournaments)
        {
            foreach(var p in t.TeamMates!)
            {
                if(!idList.Contains(p.Id))
                {
                    idList.Add(p.Id);
                }
            }   
        }

        
        Console.WriteLine(idList.Count);
        return true;
    }
}
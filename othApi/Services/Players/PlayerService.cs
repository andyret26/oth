using System.Data.SqlClient;
using System.IO.Compression;
using System.Reflection;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using othApi.Data;
using othApi.Data.Dtos;
using othApi.Data.Entities;
using othApi.Data.Exceptions;

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

    public PlayerStats GetStats(int id)
    {

        var totalTournaments = _db.Players
            .Where(p => p.Id == id)
            .Select(p => p.Tournaments!.Count)
            .FirstOrDefault();

        var uniqueTeamMatesCount = _db.Tournaments
            .Where(t => t.TeamMates!.Any(p => p.Id == id))
            .SelectMany(t => t.TeamMates!)
            .Select(p => p.Id)
            .Distinct()
            .ToList().Count;

        var uniqueFlagCount = _db.Tournaments
            .Where(t => t.TeamMates!.Any(p => p.Id == id))
            .SelectMany(t => t.TeamMates!)
            .Select(p => p.Country_code)
            .Distinct()
            .ToList().Count;

        var wins = _db.Players
            .Where(p => p.Id == id)
            .Select(p => new
            {
                firsts = p.Tournaments!.Count(t => t.Placement == "1st"),
                seconds = p.Tournaments!.Count(t => t.Placement == "2nd"),
                thirds = p.Tournaments!.Count(t => t.Placement == "3rd")
            })
            .FirstOrDefault();

        var firstRate = wins!.firsts / (decimal)totalTournaments * 100;
        var top3Rate = (wins!.firsts + wins.seconds + wins.thirds) / (decimal)totalTournaments * 100;



        var allplace = _db.Tournaments
            .Where(t => t.TeamMates!.Any(p => p.Id == id))
            .Select(t => ParsePlacement(t.Placement!))
            .ToList();

        var avgPlace = Convert.ToDecimal(allplace.Average());

        return new PlayerStats
        {
            AvgPlacement = Math.Round(avgPlace, 1),
            FirstPlaces = wins.firsts,
            FirstRate = Math.Round(firstRate, 1),
            SecondPlaces = wins.seconds,
            ThirdPlaces = wins.thirds,
            Top3Rate = Math.Round(top3Rate, 1),
            TotalTournaments = totalTournaments,
            UniqueFlagCount = uniqueFlagCount,
            UniqueTeamMatesCount = uniqueTeamMatesCount
        };
    }

    private static int? ParsePlacement(string placement)
    {
        if (placement == "1st" || placement == "2nd" || placement == "3rd")
        {
            return int.Parse(placement[..1]);
        }
        else if (placement != "Did Not Qualify")
        {
            return int.Parse(placement.Split(" ")[1]);
        }

        // Handle other cases or return a default value if needed
        return null;
    }

    public async Task AddMultipleAsync(List<Player> players)
    {
        await _db.AddRangeAsync(players);
        await _db.SaveChangesAsync();
        return;
    }

    public async Task UpdateDiscordUsername(int id, string newDiscordUsername)
    {
        var player = _db.Players.SingleOrDefault(p => p.Id == id);
        if (player == null) throw new NotFoundException("Player", id);

        player.DiscordTag = newDiscordUsername;
        await _db.SaveChangesAsync();
    }
}
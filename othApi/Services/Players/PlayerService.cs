

using System.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using othApi.dbModels;
using WebApi.Helpers;

namespace othApi.Services.Players;

public class PlayerService : IPlayerService
{
    private readonly DataContext _db;
    public PlayerService(DataContext db)
    {
        _db = db;
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
            var player = _db.Players.SingleOrDefault((p) => p.Id == id);
            return player;
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
        try
        {
            var playerToUpdate = _db.Players.SingleOrDefault((t) => t.Id == player.Id);
            if (playerToUpdate != null)
            {
                playerToUpdate.Name = player.Name;
                playerToUpdate.Rank = player.Rank;
                playerToUpdate.Country = player.Country;
                playerToUpdate.Tournaments = player.Tournaments;

                _db.SaveChanges();
                return playerToUpdate;
            }
            else
            {
                return null;
            }

        }
        catch (SqlException err)
        {
            Console.WriteLine(err.Message);
            throw;
        }
    }
}


using System.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using othApi.Data;
using othApi.Data.Entities;

namespace othApi.Services.Tournaments;

public class TournamentService : ITournamentService
{
    private readonly DataContext _db;
    public TournamentService(DataContext db)
    {
        _db = db;
    }

    public Tournament? Delete(int id)
    {
        System.Console.WriteLine("Delete called");
        _db.Tournaments.Where((t) => t.Id == id).ExecuteDelete();
        _db.SaveChanges();
        return null;
    }

    public List<Tournament> Get()
    {
        try
        {
            var tournaments = _db.Tournaments.ToList();
            return tournaments;
        }
        catch (SqlException err)
        {
            Console.WriteLine(err.Message);
            throw;
        }
    }

    public Tournament? GetById(int id)
    {
        try
        {
            var tournament = _db.Tournaments.SingleOrDefault((t) => t.Id == id);
            return tournament;
        }
        catch (SqlException err)
        {
            Console.WriteLine(err.Message);
            throw;
        };
    }

    public Tournament Post(Tournament tournament)
    {
        try
        {
            var addedTournament = _db.Tournaments.Add(tournament);
            _db.SaveChanges();

            return addedTournament.Entity;
        }
        catch (SqlException err)
        {
            Console.WriteLine(err.Message);
            throw;
        }

    }

    public Tournament? Update(Tournament tournament)
    {
        throw new NotImplementedException();
        // TODO use automapper to update
        // try
        // {
        //     var tournamentToUpdate = _db.Tournaments.SingleOrDefault((t) => t.Id == tournament.Id);
        //     if (tournamentToUpdate != null)
        //     {
        //         tournamentToUpdate.Name = tournament.Name;
        //         tournamentToUpdate.TeamName = tournament.TeamName;
        //         tournamentToUpdate.Start = tournament.Start;
        //         tournamentToUpdate.RankRange = tournament.RankRange;
        //         tournamentToUpdate.Format = tournament.Format;
        //         tournamentToUpdate.Seed = tournament.Seed;
        //         tournamentToUpdate.Placement = tournament.Placement;
        //         tournamentToUpdate.Notes = tournament.Notes;
        //         tournamentToUpdate.TeamMates = tournament.TeamMates;

        //         _db.SaveChanges();
        //         return tournamentToUpdate;
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
}
using System.Data.SqlClient;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using othApi.Data;
using othApi.Data.Entities;
using othApi.Data.Exceptions;
using othApi.Services.OsuApi;

namespace othApi.Services.Tournaments;

public class TournamentService : ITournamentService
{
    private readonly DataContext _db;
    private readonly IMapper _mapper;
    private readonly IOsuApiService _osuApiService;

    public TournamentService(DataContext db, IMapper mapper, IOsuApiService osuApiService)
    {
        _db = db;
        _mapper = mapper;
        _osuApiService = osuApiService;
    }

    public Tournament? Delete(int id)
    {
        _db.Tournaments.Where((t) => t.Id == id).ExecuteDelete();
        _db.SaveChanges();
        return null;
    }

    public List<Tournament> Get()
    {
        try
        {
            var tournaments = _db.Tournaments.Include((t) => t.TeamMates).ToList();
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
            var tournament = _db.Tournaments.Include(t => t.TeamMates).SingleOrDefault((t) => t.Id == id);
            return tournament;
        }
        catch (SqlException err)
        {
            Console.WriteLine(err.Message);
            throw;
        };
    }

    public async Task<Tournament> PostAsync(Tournament tournament)
    {
        try
        {
            if (!tournament.ForumPostLink.IsNullOrEmpty())
            {
                var img = await _osuApiService.GetForumPostCover(tournament.ForumPostLink!.Split("/")[6]);
                tournament.ImageLink = img;
            }

            var addedTournament = await _db.Tournaments.AddAsync(tournament);
            await _db.SaveChangesAsync();

            return addedTournament.Entity;
        }
        catch (SqlException err)
        {
            Console.WriteLine(err.Message);
            throw;
        }

    }

    public async Task<Tournament?> UpdateAsync(Tournament tournament)
    {

        var tournamentToUpdate = await _db.Tournaments.SingleOrDefaultAsync((t) => t.Id == tournament.Id);


        if (tournamentToUpdate != null)
        {
            if (!tournament.ForumPostLink.IsNullOrEmpty() && tournament.ForumPostLink != tournamentToUpdate.ForumPostLink)
            {
                var img = await _osuApiService.GetForumPostCover(tournament.ForumPostLink!.Split("/")[6]);
                tournament.ImageLink = img;
            }

            if (tournamentToUpdate.AddedBy != tournament.AddedBy) throw new UnauthorizedAccessException();

            if (tournamentToUpdate.Name == tournament.Name && tournamentToUpdate.TeamName == tournament.TeamName)
            {
                _mapper.Map(tournament, tournamentToUpdate);
                await _db.SaveChangesAsync();
                return tournamentToUpdate;
            }
            else
            {
                if (TournamentWithTeamNameExists(tournament.TeamName, tournament.Name))
                {
                    throw new ConflitctException();
                }
                else
                {
                    _mapper.Map(tournament, tournamentToUpdate);
                    await _db.SaveChangesAsync();
                    return tournamentToUpdate;
                }
            }

        }
        else
        {
            return null;
        }



    }

    public Tournament? AddTeamMates(List<Player> TeamMates, int tourneyId)
    {
        var tournament = _db.Tournaments.SingleOrDefault((t) => t.Id == tourneyId);
        if (tournament != null)
        {
            tournament.TeamMates = TeamMates;
            _db.SaveChanges();
            return tournament;
        }
        else
        {
            return null;
        }
    }

    public List<Tournament> GetByPlayerId(int playerId)
    {
        var tournaments = _db.Tournaments
            .Include((t) => t.TeamMates)
            .Where((t) => t.TeamMates!.Any((p) => p.Id == playerId))
            .OrderBy((t) => t.Date)
            .ToList();
        return tournaments;
    }

    public bool TournamentWithTeamNameExists(string? teamName, string tournamentName)
    {
        if (teamName == null || teamName.Length <= 0) return false;
        var tournament = _db.Tournaments.SingleOrDefault((t) => t.TeamName == teamName && t.Name == tournamentName);
        if (tournament != null)
        {
            return true;
        }
        else
        {
            return false;
        }
    }

    public async Task<Tournament?> UpdateTeamMatesAsync(int tournamentId, int[] TeamIds)
    {
        var teamMates = await _db.Players.Where((p) => TeamIds.Contains(p.Id)).ToListAsync();

        var tournament = await _db.Tournaments.Include(t => t.TeamMates).SingleOrDefaultAsync((t) => t.Id == tournamentId);
        if (tournament == null) return null;

        tournament.TeamMates = teamMates;
        await _db.SaveChangesAsync();
        return tournament;
    }
}
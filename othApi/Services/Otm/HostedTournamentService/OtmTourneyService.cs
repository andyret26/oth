using Microsoft.EntityFrameworkCore;
using othApi.Data;
using othApi.Data.Entities.Otm;
using othApi.Data.Exceptions;

namespace othApi.Services.Otm.HostedTournamentService;

public class OtmTourneyService : IOtmTourneyService
{
    private readonly DataContext _db;

    public OtmTourneyService(DataContext db)
    {
        _db = db;
    }
    public async Task<HostedTournament> AddAsync(HostedTournament tournament)
    {
        var tAdded = await _db.OtmTournaments.AddAsync(tournament);
        await _db.SaveChangesAsync();
        return tAdded.Entity;
    }

    public Task<HostedTournament?> DeleteAsync(int id)
    {
        throw new NotImplementedException();
    }

    public Task<List<HostedTournament>> GetAsync()
    {
        throw new NotImplementedException();
    }

    public async Task<HostedTournament?> GetByIdAsync(int id)
    {
        var t = await _db.OtmTournaments
            .Include(t => t.Teams!).ThenInclude(team => team.Players)
            .Include(t => t.Players)
            .Include(t => t.Rounds)
            .Include(t => t.Staff)
            .FirstOrDefaultAsync(t => t.Id == id);
        if (t == null) throw new NotFoundException("Tournament", id);
        return t;
    }

    public Task<HostedTournament?> UpdateAsync(HostedTournament tournament)
    {
        throw new NotImplementedException();
    }

    public async Task<List<HostedTournament>> GetAllByHostIdAsync(int hostId)
    {
        if (!await _db.OtmHosts.AnyAsync((h) => h.Id == hostId)) throw new NotFoundException("Host", hostId);
        return await _db.OtmTournaments.Where(t => t.HostId == hostId).Include(t => t.Rounds).Include(t => t.Players).Include(t => t.Teams).Include(t => t.Staff).ToListAsync();

    }

    public async Task<HostedTournament> AddTeamAsync(int tournamentId, Team team)
    {
        var t = _db.OtmTournaments.SingleOrDefault(t => t.Id == tournamentId);
        if (t == null) throw new NotFoundException("Tournament", tournamentId);
        if (t.Teams == null) t.Teams = new List<Team>();
        t.Teams.Add(team);
        await _db.SaveChangesAsync();
        return t;

    }

    public async Task<bool> TeamNameExistsInTournamentAsync(int tournamentId, string teamName)
    {
        var t = await GetByIdAsync(tournamentId);
        return t!.Teams!.Any(t => t.TeamName == teamName);
    }
    public async Task<List<int>> PlayerExistsInTeamTournamentAsync(int tournamentId, List<int> playerIds)
    {
        // return players that alreay exists
        var t = await GetByIdAsync(tournamentId);
        List<int> players = new();
        foreach (var team in t!.Teams!)
        {
            foreach (var player in team!.Players!)
            {
                if (playerIds.Contains(player.Id))
                {
                    if (!players.Contains(player.Id))
                    {
                        players.Add(player.Id);
                    }
                }
            }
        }
        return players;
    }
}
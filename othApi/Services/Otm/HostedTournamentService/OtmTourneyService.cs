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

    public Task<HostedTournament?> GetByIdAsync(int id)
    {
        throw new NotImplementedException();
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
}
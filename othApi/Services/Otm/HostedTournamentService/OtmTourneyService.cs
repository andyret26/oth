using othApi.Data;
using othApi.Data.Entities.Otm;

namespace othApi.Services.Otm.HostedTournamentService;

public class OtmTourneyService : IOtmTourneyService
{
    private readonly DataContext _db;

    public OtmTourneyService(DataContext db)
    {
        _db = db;
    }
    public async Task<HostedTournament> AddtAsync(HostedTournament tournament)
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
}
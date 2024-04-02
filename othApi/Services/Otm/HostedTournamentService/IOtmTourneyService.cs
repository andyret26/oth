using othApi.Data.Entities.Otm;

namespace othApi.Services.Otm.HostedTournamentService;

public interface IOtmTourneyService
{
    public Task<HostedTournament> AddAsync(HostedTournament tournament);
    public Task<List<HostedTournament>> GetAsync();
    public Task<HostedTournament?> GetByIdAsync(int id);
    public Task<HostedTournament?> UpdateAsync(HostedTournament tournament);
    public Task<HostedTournament?> DeleteAsync(int id);

    /// <summary>
    /// Get all tournaments created by the spcified host
    /// </summary>
    /// <param name="hostId">Host to get tournaments from</param>
    /// <returns>List of tournaments created by the specified host</returns>
    public Task<List<HostedTournament>> GetAllByHostIdAsync(int hostId);
}

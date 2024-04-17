using othApi.Data.Entities;
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
    public Task<HostedTournament> AddTeamAsync(int tournamentId, Team team);
    public Task<Player> AddPlayerAsync(int tournamentId, Player player);
    public Task<bool> TeamNameExistsInTournamentAsync(int tournamentId, string teamName);
    public Task<bool> PlayerExistsInTourneyAsync(int tournamentId, int osuId);
    /// <summary>
    /// Check if a player exists in a team in the specified tournament
    /// </summary>
    /// <param name="tournamentId">Tournament to check in</param>
    /// <param name="playerIds">List of player ids to check</param>
    /// <returns>List of player ids that has a team</returns>
    public Task<List<int>> PlayerExistsInTeamTournamentAsync(int tournamentId, List<int> playerIds);
}

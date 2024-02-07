using othApi.Data.Entities;
namespace othApi.Services.Tournaments;
public interface ITournamentService
{
    List<Tournament> Get();
    Tournament? GetById(int id);
    Task<Tournament> PostAsync(Tournament tournament);
    Task<Tournament?> UpdateAsync(Tournament tournament);
    Tournament? Delete(int id);
    Tournament? AddTeamMates(List<Player> TeamMates, int tournamentId);
    List<Tournament> GetByPlayerId(int playerId);
    Task<Tournament?> UpdateTeamMatesAsync(int tournamentId, int[] TeamIds);

    bool TournamentWithTeamNameExists(string? teamName, string tournamentName);
}
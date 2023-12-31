using othApi.Data.Entities;
namespace othApi.Services.Tournaments;
public interface ITournamentService
{
    List<Tournament> Get();
    Tournament? GetById(int id);
    Tournament Post(Tournament tournament);
    Tournament? Update(Tournament tournament);
    Tournament? Delete(int id);
    Tournament? AddTeamMates(List<Player> TeamMates, int tournamentId);
    List<Tournament> GetByPlayerId(int playerId);
    Tournament? UpdateTeamMates(int tournamentId, int[] TeamIds);

    bool TournamentWithTeamNameExists(string? teamName, string tournamentName);
}
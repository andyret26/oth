using othApi.dbModels;
namespace othApi.Services.Tournaments;
public interface ITournamentService
{
    List<Tournament> Get();
    Tournament? GetById(int id);
    Tournament Post(Tournament tournament);
    Tournament? Update(Tournament tournament);
    Tournament? Delete(int id);

}
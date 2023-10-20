using othApi.dbModels;

namespace othApi.Services.Players;

public interface IPlayerService
{
    List<Player> Get();
    Player? GetById(int id);
    Player Post(Player player);
    Player? Update(Player player);
    Player? Delete(int id);

}
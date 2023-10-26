using othApi.Data.Entities;

namespace othApi.Services.Players;

public interface IPlayerService
{
    List<Player> Get();
    Player? GetById(int id);
    Player Post(Player player);
    Player? Update(Player player);
    Player? Delete(int id);

}
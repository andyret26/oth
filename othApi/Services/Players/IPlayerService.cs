using othApi.Data;
using othApi.Data.Entities;

namespace othApi.Services.Players;

public interface IPlayerService
{
    List<Player> Get();
    List<Player> GetMinimal();
    Player? GetById(int id);
    public List<Player>? GetMultipleById(List<int> ids);
    Player Post(Player player);
    Task AddMultipleAsync(List<Player> players);
    Player? Update(Player player);
    Player? Delete(int id);
    bool Exists(int id);
    PlayerStats GetStats(int id);
    Task UpdateDiscordUsername(int id, string newDiscordUsername);

}
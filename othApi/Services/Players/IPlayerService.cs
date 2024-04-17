using othApi.Data;
using othApi.Data.Entities;

namespace othApi.Services.Players;

public interface IPlayerService
{
    List<Player> Get();
    List<Player> GetMinimal();
    Task<Player?> GetByIdAsync(int id);
    public Task<List<Player>> GetMultipleById(List<int> ids);
    Task<Player> PostAsync(Player player);
    Task AddMultipleAsync(List<Player> players);
    Player? Update(Player player);
    Player? Delete(int id);
    bool Exists(int id);
    PlayerStats GetStats(int id);
    Task UpdateDiscordUsername(int id, string newDiscordUsername);

}
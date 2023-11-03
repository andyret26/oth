using othApi.Data.Entities;

namespace othApi.Services.OsuApi;

public interface IOsuApiService
{
    Task<string> GetToken();
    Task<Player[]?> GetPlayers(List<int> ids);

}
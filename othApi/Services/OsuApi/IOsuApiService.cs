using othApi.Data;
using othApi.Data.Entities;

namespace othApi.Services.OsuApi;

public interface IOsuApiService
{
    Task<string> GetToken();
    Task<Player[]?> GetPlayers(List<int> ids);
    Task<Player> GetPlayerByUsername(string username);
    Task<string> GetForumPostCover(string forumPostId);
    Task<MatchResponseObj> GetMatchInfo(int MatchId);

}
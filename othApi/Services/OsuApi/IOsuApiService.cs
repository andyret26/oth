namespace othApi.Services.OsuApi;

public interface IOsuApiService
{
    Task<string> GetToken();

}
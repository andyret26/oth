namespace othApi.Services.Discord
{
    public interface IDiscordService
    {
        Task SendMessage(string message);
    }
}
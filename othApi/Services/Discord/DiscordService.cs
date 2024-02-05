
using Discord.WebSocket;

namespace othApi.Services.Discord
{
    public class DiscordService : IDiscordService
    {
        private readonly DiscordSocketClient _discord;
        private readonly ulong _guild = 622429522154749992;
        private readonly ulong _channel = 1173892318244376596;

        public DiscordService(DiscordSocketClient discord)
        {
            _discord = discord;
        }
        public async Task SendMessage(string message)
        {
            try
            {
                var guild = _discord.GetGuild(_guild);
                var channel = guild.GetTextChannel(_channel);

                await channel.SendMessageAsync(message);

            }
            catch (Exception)
            {
                Console.WriteLine("Error Notifying");
                return;
            }
            return;
        }
    }
}

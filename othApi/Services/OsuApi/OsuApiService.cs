
using System.Net.Http.Headers;
using AutoMapper;
using Azure.Core;
using Google.Apis.Auth.OAuth2;
using Newtonsoft.Json;
using othApi.Data;
using othApi.Data.Entities;

namespace othApi.Services.OsuApi;

class OsuApiService : IOsuApiService
{
    private readonly string BaseUrl = "https://osu.ppy.sh/api/v2";
    private readonly IMapper _mapper;

    public OsuApiService(IMapper mapper)
    {
        _mapper = mapper;
    }
    public async Task<string> GetToken()
    {
        string apiUrl = "https://osu.ppy.sh/oauth/token";
        string clientId = Environment.GetEnvironmentVariable("OSU_CLIENT_ID")!;
        string clientSecret = Environment.GetEnvironmentVariable("OSU_CLIENT_SECRET")!;
        string grantType = "client_credentials";
        string scope = "public";


        // Prepare the request data
        var requestData = new List<KeyValuePair<string, string>>
        {
            new ("client_id", clientId),
            new ("client_secret", clientSecret),
            new ("grant_type", grantType),
            new ("scope", scope)
        };

        // Create a request content with the form URL-encoded data
        var content = new FormUrlEncodedContent(requestData);

        // Send the POST request
        using (HttpClient http = new())
        {
            var response = await http.PostAsync(apiUrl, content);

            if (response.IsSuccessStatusCode)
            {
                string responseBody = await response.Content.ReadAsStringAsync();
                var responseObj = JsonConvert.DeserializeObject<TokenResponse>(responseBody);
                return responseObj!.Access_token;
            }
            else
            {
                throw new Exception("Request failed with status code: " + response.StatusCode);
            }
        }
    }


    public async Task<Player[]> GetPlayers(List<int> ids) {
        string bearerToken = await GetToken();

        var baseUrl = new Uri("https://osu.ppy.sh/api/v2/users");

        var queryParams = new List<KeyValuePair<string, string>>();

        foreach (int id in ids)
        {
            queryParams.Add(new KeyValuePair<string, string>("ids[]", id.ToString()));
        }

        var queryString = string.Join("&", queryParams.Select(kvp => $"{Uri.EscapeDataString(kvp.Key)}={Uri.EscapeDataString(kvp.Value)}"));

        var fullUrl = new Uri($"{baseUrl}?{queryString}");

        using (HttpClient client = new HttpClient())
        {
            client.DefaultRequestHeaders.Add("Accept", "application/json");
            client.DefaultRequestHeaders.Add("Authorization", $"Bearer {bearerToken}");

            HttpResponseMessage response = await client.GetAsync(fullUrl);

            if (response.IsSuccessStatusCode)
            {
                string responseBody = await response.Content.ReadAsStringAsync();
                var respObj = JsonConvert.DeserializeObject<ManyPlayersResponseData>(responseBody)!;
                var players = _mapper.Map<Player[]>(respObj.Users);
                return players;
            }
            else
            {
                throw new Exception($"Request failed with status code {response.StatusCode}");
            }
        }
    }
}


public class TokenResponse
{
    public string Access_token { get; set; } = null!;
    public string Token_type { get; set; } = null!;
    // Add more properties as needed to match the JSON structure
}
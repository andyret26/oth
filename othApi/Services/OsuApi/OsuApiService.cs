
using Newtonsoft.Json;

namespace othApi.Services.OsuApi;

class OsuApiService : IOsuApiService
{
    private readonly HttpClient http = new ();


    public async Task<string> GetToken()
    {
        string apiUrl = "https://osu.ppy.sh/oauth/token";
        string clientId = "Client here";
        string clientSecret = "Secret here";
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


public class TokenResponse
{
    public string Access_token { get; set; } = null!;
    public string Token_type { get; set; } = null!;
    // Add more properties as needed to match the JSON structure
}
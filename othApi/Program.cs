using dotenv.net;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using othApi.Services.Tournaments;
using othApi.Services.Players;
using othApi.Data;
using System.Reflection;
using othApi.Services.OsuApi;
using Discord;
using Discord.WebSocket;
using Microsoft.AspNetCore.RateLimiting;
using othApi.Services.Discord;


DotEnv.Load();

var builder = WebApplication.CreateBuilder(args);
// Add services to the container.
builder.Services.AddScoped<ITournamentService, TournamentService>();
builder.Services.AddScoped<IPlayerService, PlayerService>();



builder.Services.AddScoped<IOsuApiService, OsuApiService>();
builder.Services.AddScoped<IDiscordService, DiscordService>();
builder.Services.AddSingleton(new DiscordSocketClient());

builder.Services.AddCors();

var test = await FetchJwksAsync(Environment.GetEnvironmentVariable("JWKS_URI")!);

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    // Configure the token validation parameters
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidIssuer = "https://oth.eu.auth0.com/", // iss in token
        ValidAudience = "3pZ5jlt7hfCvxjxT06tSYtxRIVm8aZdj", // aud in token
        IssuerSigningKey = test[0], // singing key set (some/url/certs)
        ValidateIssuer = true, // Validate the token's issuer
        ValidateAudience = false, // Validate the token's audience
        ValidateLifetime = true, // Check if the token is expired
        ValidateIssuerSigningKey = true
    };
});


builder.Services.AddAuthorization();

builder.Services.AddDbContext<DataContext>(options =>
{
    // connect to postgres with env
    options.UseNpgsql(Environment.GetEnvironmentVariable("SUPABASE_CONNECTION"));
});


builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "Oth!", Version = "v1" });


    // Add JWT Authentication support in Swagger
    var securityScheme = new OpenApiSecurityScheme
    {
        Name = "JWT Authentication",
        Description = "Enter your JWT token",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.Http,
        Scheme = "bearer", // The name of the HTTP Authorization scheme to be used in the Swagger UI
        BearerFormat = "JWT", // JWT format
        Reference = new OpenApiReference
        {
            Type = ReferenceType.SecurityScheme,
            Id = "Bearer"
        }
    };
    c.AddSecurityDefinition("Bearer", securityScheme);
    c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        { securityScheme, new List<string>() }
    });

    var xmlFilename = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
    c.IncludeXmlComments(Path.Combine(AppContext.BaseDirectory, xmlFilename));
});


// Add AutoMapper service
builder.Services.AddAutoMapper(typeof(Program));

// Add rateLimiter
builder.Services.AddRateLimiter(_ => _
    .AddFixedWindowLimiter(policyName: "fixed", options =>
    {
        options.PermitLimit = 20;
        options.Window = TimeSpan.FromSeconds(60);
    }));


var app = builder.Build();
var discordClient = app.Services.GetService<DiscordSocketClient>();
discordClient!.LoginAsync(TokenType.Bot, Environment.GetEnvironmentVariable("DISCORD_BOT_TOKEN")).GetAwaiter().GetResult();
discordClient.StartAsync().GetAwaiter().GetResult();
app.UseCors(builder =>
    {
        builder.WithOrigins("http://localhost:5173", "https://osu-th.vercel.app", "http://localhost:5174", "https://osu-tm.vercel.app", "https://ot-timer.azurewebsites.net") // Replace with the allowed origin(s)
               .AllowAnyMethod()
               .AllowAnyHeader();
    });

if (app.Environment.IsDevelopment())
{

    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();
app.UseRateLimiter();
app.Run();


static async Task<SecurityKey[]> FetchJwksAsync(string jwksUri)
{
    using (var httpClient = new HttpClient())
    {
        var jwksJson = await httpClient.GetStringAsync(jwksUri);

        // Parse the JWKS JSON and build the SecurityKey array
        var jwks = JsonWebKeySet.Create(jwksJson);
        return jwks.Keys.ToArray();
    }
}
#See https://aka.ms/customizecontainer to learn how to customize your debug container and how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

ARG SUBABASE_CONNECTION
ARG JWKS_URI
ARG OSU_CLIENT_ID
ARG OSU_CLIENT_SECRET
ARG DISCORD_BOT_TOKEN
ENV SUBABASE_CONNECTION=${SUBABASE_CONNECTION}
ENV JWKS_URI=${JWKS_URI}
ENV OSU_CLIENT_ID=${OSU_CLIENT_ID}
ENV OSU_CLIENT_SECRET=${OSU_CLIENT_SECRET}
ENV DISCORD_BOT_TOKEN=${DISCORD_BOT_TOKEN}

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["othApi/othApi.csproj", "."]
RUN dotnet restore "./othApi.csproj"
COPY . .
WORKDIR "/src/."
RUN dotnet build "othApi/othApi.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "othApi/othApi.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "othApi.dll"]
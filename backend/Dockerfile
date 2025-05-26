# Etapa de build
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copia todos os arquivos do backend
COPY . .

# Restaura e publica o projeto principal
RUN dotnet restore ./src/Presentation/Presentation.csproj
RUN dotnet publish ./src/Presentation/Presentation.csproj -c Release -o /app/publish

# Etapa final
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app
COPY --from=build /app/publish .
EXPOSE 80
ENTRYPOINT ["dotnet", "Presentation.dll"]

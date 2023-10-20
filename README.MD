### Cloud services
- Supabase
- Auth0
- 
### Frontend vite 
```bash
npm install
npm run dev
```

### Backend
```bash
dotnet restore
dotnet run
```

### .env files
```bash
# Frontend
VITE_AUTH_DOMAIN=AuthDomainHere
VITE_AUTH_CLIENT_ID=ClienIDHere

# Backend
SUPABASE_CONNECTION="ConnectionStringHere"
JWKS_URI="JWKS_URI_Here"
```
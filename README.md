# Vet Finder (maqueta RN)

- Pantallas: Login, Mapa, Detalle, Cómo llegar, Mis Mascotas, Añadir Mascota.
- Hooks:
  - `useHydrateAuth`: hidrata sesión (futuro AsyncStorage).
  - `useFocusData`: refresca datos al enfocarse la screen.

## Notas:
  - `Mapa`: imagen placeholder.
  - `Vets`: data/vets.js.
  - `Filtros`: solo UI (modal).
  - `Mascotas`: estado en memoria (Context).

## Scripts:
```bash
npm run start
npx expo start --tunnel 


Backend (API)
Terminal 1
cd backend
npm i
# crea tu .env a partir del ejemplo
cp .env.example .env
# (opcional) edita .env si querés cambiar PORT o CORS_ORIGIN
npm run dev

Listar todas las mascotas:
GET http:// /api/pets


Frontend (Expo)
Terminal 2 – PowerShell en Windows
cd frontend
$env:EXPO_PUBLIC_API_URL=" "
npm start
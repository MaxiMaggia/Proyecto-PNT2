# Vet Finder

- Pantallas: Login, Registro, Mapa, Detalle Veterinaria, Mis Mascotas, Añadir/Editar Mascota, Perfil.
- Hooks:
  - `useHydrateAuth`: hidrata sesión desde AsyncStorage.
  - `useFocusData`: recarga datos automáticamente cada vez que la pantalla se vuelve visible (útil para mantener datos actualizados al navegar entre pantallas).
  - `useLogoutAlert`: alerta de cierre de sesión.

## Backend (persiste):
  -  **Autenticación**: Login y Registro conectados a API.
  -  **Sesión**: Token y userId guardados en AsyncStorage.
  -  **Mascotas**: CRUD completo (crear, leer, actualizar, eliminar) desde API.
  -  **Usuarios**: Perfil y edición conectados a API.
  -  **Tipos y Razas**: obtenidos desde API al agregar/editar mascotas.

## Mock (no persiste):
  -  **Veterinarias**: datos estáticos en `data/vets.js`.

## Scripts:
```bash
npx expo start --tunnel
npx expo start 

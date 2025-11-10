// Punto de entrada Expo que registra la aplicación principal.
import { registerRootComponent } from 'expo';

import App from './App';

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
// Registra `App` para que reciba los contextos y navegación definidos en `App.js`.
registerRootComponent(App);

import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes'; //contient les chemins

import { provideHttpClient } from '@angular/common/http'; //envoyer des requêtes HTTP vers le backend.
import { importProvidersFrom } from '@angular/core'; //importer des modules dans standalone
import { FormsModule } from '@angular/forms'; //Permet d’utiliser ngModel pour les formulaires.

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),

    provideHttpClient(),

    // 👇 IMPORTANT pour ngModel
    importProvidersFrom(FormsModule)
  ]
};
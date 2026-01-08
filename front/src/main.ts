// main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { appConfig } from './app/app.config';

bootstrapApplication(App, appConfig) 
  .catch((err) => console.error(err));

  // import { ApplicationConfig } from '@angular/core';
  // import { provideRouter } from '@angular/router';
  // import { routes } from './app/app.routes';
  // export const appConfig: ApplicationConfig = {
  //   providers: [
  //     provideRouter(routes), // 🔥 YAHI MISSING THA
  //   ],
  // };

import { ApplicationConfig } from '@angular/core';
import { provideRouter, withRouterConfig } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app.routes'; // تأكد من أن ملف التوجيهات (routes) موجود

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      routes,
      withRouterConfig({ onSameUrlNavigation: 'reload' }) // تمكين إعادة التحميل لنفس المسار
    ),
    provideHttpClient(),
    provideAnimations(),
  ]
};

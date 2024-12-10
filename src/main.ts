import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { LoginComponent } from './app/pages/login/login.component';
import { RegisterComponent } from './app/pages/register/register.component';
import { Routes, provideRouter } from '@angular/router';
import { ActivateAccountComponent } from './app/pages/activate-account/activate-account.component';
import { tokenInterceptor } from './app/services/interceptor/Http-token-interceptor.interceptor';
import { MainComponent } from './app/modules/book/pages/main/main.component';
import { BookListComponent } from './app/modules/book/pages/book-list/book-list.component';
import { authGuard } from './app/services/guard/auth.guard';

//bootstrapApplication(AppComponent, appConfig)
 // .catch((err) => console.error(err));
 //bootstrapApplication(AppComponent, {
  //providers: [
   // provideHttpClient(),
  //provideAnimations()
 // ]
//});



const routes: Routes = [
  { path: 'login', component: LoginComponent },

  { path: 'register', component: RegisterComponent },
  { path: 'activate-account', component: ActivateAccountComponent },
  { path: 'books',
    loadChildren: ()=>import('./app/modules/book/book.module').then(m =>m.BookModule),
    canActivate: [authGuard]
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' } // redirection vers login par défaut
];

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([tokenInterceptor])),
    provideAnimations(),
    {
      provide: HTTP_INTERCEPTORS,
      useValue: tokenInterceptor,
      multi: true
  }

  ]
}).catch(err => console.error(err));


import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { PersonaComponent } from './persona/persona.component';
import { SimpatizantesComponent } from './simpatizantes/simpatizantes.component';
import { AuthGuardService } from './service/auth-guard.service';
import { SessionService } from './service/session.service';

export const routes: Routes = [
    {path: '', component: LoginComponent},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'simpatizantes', component: SimpatizantesComponent},
    {path: 'home', component: HomeComponent, canActivate:[AuthGuardService]},
    {path: 'persona/:cedula', component: PersonaComponent},
    { path: '**', redirectTo: '', pathMatch: 'full' }
];

export function checkLoggedIn(sessionService: SessionService) {
    return () => sessionService.isLoggedIn() ? 'home' : true;
}
import { Routes } from '@angular/router';
import { SigninComponent } from './Components/signin/signin.component';
import { RegisterComponent } from './Components/register/register.component';
import { HeaderComponent } from './Components/header/header.component';

export const routes: Routes = [
   { path: '', component: HeaderComponent },
    { path: 'login', component: SigninComponent },
    { path: 'register', component: RegisterComponent },
   // { path: 'cart', component: CartComponent, canActivate: [AuthGuard] },
  ];
  
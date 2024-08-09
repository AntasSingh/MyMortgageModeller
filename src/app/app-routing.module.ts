import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MortgageDetailsComponent } from './mortgage-details/mortgage-details.component';
import { AddMortgageComponent } from './add-mortgage/add-mortgage.component';
import { MortgageComparisonComponent } from './mortgage-comparison/mortgage-comparison.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { authGuard } from './auth.guard';
import { HomePageComponent } from './home-page/home-page.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignUpComponent},
  { path: 'home', component: HomePageComponent,canActivate: [authGuard] },
  { path: 'mortgageDetails', component: MortgageDetailsComponent,canActivate: [authGuard]  },
  { path: 'addMortgage', component: AddMortgageComponent ,canActivate: [authGuard] },
  { path: 'compareMortgages', component: MortgageComparisonComponent,canActivate: [authGuard]  },
  { path: '**', redirectTo: '/login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

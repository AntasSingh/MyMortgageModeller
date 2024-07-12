import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MortgageDetailsComponent } from './mortgage-details/mortgage-details.component';

const routes: Routes = [
  { path: 'mortgageDetails', component: MortgageDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

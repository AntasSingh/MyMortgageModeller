import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MortgageDetailsComponent } from './mortgage-details/mortgage-details.component';
import { AddMortgageComponent } from './add-mortgage/add-mortgage.component';

const routes: Routes = [
  { path: 'mortgageDetails', component: MortgageDetailsComponent },
  { path: 'addMortgage', component: AddMortgageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

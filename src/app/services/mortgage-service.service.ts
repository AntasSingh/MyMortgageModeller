// src/app/services/mortgage-details.service.ts

import { Injectable } from '@angular/core';
import { MortgageDetails } from '../Models/mortgage.model';

@Injectable({
  providedIn: 'root'
})
export class MortgageDetailsService {
  private mortgageDetailsList: MortgageDetails[] = [];

  constructor() {}

  // Add a new mortgage detail to the list
  addMortgageDetails(mortgageDetails: MortgageDetails): void {
    this.mortgageDetailsList.push(mortgageDetails);
    console.log(this.mortgageDetailsList);
  }

  // Retrieve the list of mortgage details
  getMortgageDetails(): MortgageDetails[] {
    console.log(this.mortgageDetailsList);
    return this.mortgageDetailsList;
  }
}

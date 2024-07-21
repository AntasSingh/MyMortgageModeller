import { Injectable } from '@angular/core';
import { Mortgage } from '../Models/mortgage.model';

@Injectable({
  providedIn: 'root'
})
export class AddMortgageDetailsService {
  private currentMortgage: Mortgage | null = null;

  constructor() {}

  setMortgage(mortgage: Mortgage): void {
    this.currentMortgage = mortgage;
  }

  getMortgage(): Mortgage | null {
    return this.currentMortgage;
  }
}

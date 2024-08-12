import { Injectable } from '@angular/core';
import { Mortgage, MortgageDetails } from '../Models/mortgage.model';

@Injectable({
  providedIn: 'root'
})
export class AddMortgageDetailsService {
  private currentMortgage: Mortgage | null = null;
  private currentEditModel: MortgageDetails | undefined;

  constructor() {}

  setMortgage(mortgage: Mortgage): void {
    this.currentMortgage = mortgage;
  }

  getMortgage(): Mortgage | null {
    return this.currentMortgage;
  }

  setEditModel(editModel: MortgageDetails){
    this.currentEditModel= editModel;
  }

  getEditModel(){
    return this.currentEditModel;
  }

  clearDataMortgage() {
    this.currentEditModel = undefined;
    this.currentMortgage = null;
  }
}

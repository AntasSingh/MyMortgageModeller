import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MortgageDetails } from '../Models/mortgage.model';
import { map, Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class MortgageModelService {
  private apiUrl = 'https://om1mz44dn5.execute-api.eu-north-1.amazonaws.com/prod2/update';
  private apiGetUrl = 'https://om1mz44dn5.execute-api.eu-north-1.amazonaws.com/prod2/get';
  private apiDeleteUrl = 'https://om1mz44dn5.execute-api.eu-north-1.amazonaws.com/prod2/delete';
  constructor(private http: HttpClient, private authService: AuthService) {}

  updateMortgageDetails(details: MortgageDetails): Observable<any> {
    // Retrieve the email from cookies using AuthService
    const email = this.authService.getCookie('userEmail');
    details.userEmail = email === null ? undefined : email;
    console.log("here");
    return this.http.put(this.apiUrl, details.toJSON());
  }

  getMortgageDetails(): Observable<MortgageDetails[]> {
    const email = this.authService.getCookie('userEmail');
    console.log("here");
    return this.http.get<any[]>(`${this.apiGetUrl}?user-email=${email}`).pipe(
      map((response: any[]) => response.map((item: any) => this.transformToMortgageDetails(item)))
    );
  }

  deleteModel(modelName: string): Observable<any> {
    const email = this.authService.getCookie('userEmail');

    const requestBody = {
      "model-name": modelName,
      "user-email": email
    };

    return this.http.delete(this.apiDeleteUrl, { body: requestBody });
  }


  private transformToMortgageDetails(item: any): MortgageDetails {
    const newMortgageDetails = new MortgageDetails();
    newMortgageDetails.totalCost = item.totalCost;
    newMortgageDetails.downPayment = item.downPayment;
    newMortgageDetails.interestRate = item.interestRate;
    newMortgageDetails.loanTerm = item.loanTerm;
    newMortgageDetails.preprocessingCost = item.preprocessingCost;
    newMortgageDetails.fixedAmount = item.fixedAmount;
    newMortgageDetails.loanTermYears = item.loanTermYears;
    newMortgageDetails.loanTermMonths = item.loanTermMonths;
    newMortgageDetails.loanAmount = item.loanAmount;
    newMortgageDetails.totalInterestPaid = item.totalInterestPaid;
    newMortgageDetails.monthlyInterestRate = item.monthlyInterestRate;
    newMortgageDetails.offsetOption = item.offsetOption;
    newMortgageDetails.compoundingPeriod = item.compoundingPeriod;
    newMortgageDetails.monthlyPayment = item.monthlyPayment;
    newMortgageDetails.totalPayment = item.totalPayment;
    newMortgageDetails.modelName = item['model-name'];
    newMortgageDetails.bankName = item.bankName;
    newMortgageDetails.monthlyAdditionOffset = item.monthlyAdditionOffset;
    newMortgageDetails.userEmail = item['user-email'];

    return newMortgageDetails;
  }
}

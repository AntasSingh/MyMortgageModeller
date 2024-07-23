// mortgage-calculator.service.ts
import { Injectable } from '@angular/core';
import { MortgageDetails } from '../Models/mortgage.model';

@Injectable({
  providedIn: 'root'
})
export class MortgageCalculatorService {

  constructor() { }

  calculatePayment(mortgage: MortgageDetails): MortgageDetails {
    const totalLoanTermMonths = (mortgage.loanTermYears || 0) * 12 + (mortgage.loanTermMonths || 0);
    mortgage.loanTerm = totalLoanTermMonths;
  
    let principal = mortgage.totalCost - mortgage.downPayment;
    mortgage.loanAmount = principal;
    if (mortgage.offsetOption && mortgage.offsetAmount) {
      principal -= mortgage.offsetAmount;
    }
    const annualInterestRate = mortgage.interestRate / 100;
  
    // Convert annual interest rate to monthly interest rate
    mortgage.monthlyInterestRate = this.convertInterestRate(annualInterestRate, mortgage.compoundingPeriod);
  
    // Calculate monthly payment
    const numberOfPayments = totalLoanTermMonths;
    const x = Math.pow(1 + mortgage.monthlyInterestRate, numberOfPayments);
    let monthlyPayment = (principal * x * mortgage.monthlyInterestRate) / (x - 1);
  
    // Add offset amount to monthly payment
    if (mortgage.offsetOption && mortgage.offsetAmount) {
      const offsetAmountPerMonth = mortgage.offsetAmount / totalLoanTermMonths;
      monthlyPayment += offsetAmountPerMonth;
    }
  
    mortgage.monthlyPayment = parseFloat(monthlyPayment.toFixed(2));
  
    // Calculate total payment
    mortgage.totalInterestPaid = (monthlyPayment * numberOfPayments) - mortgage.loanAmount;
    const totalPayment = (monthlyPayment * numberOfPayments) + mortgage.downPayment + mortgage.preprocessingCost;
    mortgage.totalPayment = parseFloat(totalPayment.toFixed(2));
  
    return mortgage;
  }
  
  convertInterestRate(rate: number, rateType: string): number {
    switch (rateType.toLowerCase()) {
      case 'annually':
        return Math.pow(1 + rate, 1 / 12) - 1;
      case 'monthly':
        return rate / 12;
      case 'daily':
        const dailyRate = rate / 365;
        const annualRate = Math.pow(1 + dailyRate, 365) - 1;
        return Math.pow(1 + annualRate, 1 / 12) - 1;
      default:
        throw new Error(`Unsupported rate type: ${rateType}`);
    }
  }

  calculateAmortization(mortgage: MortgageDetails): any[] {
    let principal = mortgage.totalCost - mortgage.downPayment;
    if (mortgage.offsetOption && mortgage.offsetAmount) {
      principal -= mortgage.offsetAmount;
    }
    const numberOfPayments = mortgage.loanTerm;
    const x = Math.pow(1 + mortgage.monthlyInterestRate, numberOfPayments);
    let monthlyPayment = (principal * x * mortgage.monthlyInterestRate) / (x - 1);
    if (mortgage.offsetOption && mortgage.offsetAmount) {
      monthlyPayment += mortgage.offsetAmount / numberOfPayments;
    }
    const amortizationSchedule = [];
    let remainingAmount = principal;

    for (let month = 1; month <= numberOfPayments; month++) {
      const interestPaid = remainingAmount * mortgage.monthlyInterestRate;
      const principalPaid = monthlyPayment - interestPaid;
      remainingAmount -= principalPaid;
      amortizationSchedule.push({
        month,
        paymentMade: monthlyPayment,
        interestPaid,
        remainingAmount: Math.max(0, remainingAmount)
      });
    }
    console.log(amortizationSchedule[1].remainingAmount)
    return amortizationSchedule;
  }
}

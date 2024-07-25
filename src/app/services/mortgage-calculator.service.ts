// mortgage-calculator.service.ts
import { Injectable } from '@angular/core';
import { AmortizationSchedule, MortgageDetails } from '../Models/mortgage.model';

@Injectable({
  providedIn: 'root'
})
export class MortgageCalculatorService {

  constructor() { }

  calculateAmortization(mortgage: MortgageDetails): any[] {
    let principal = mortgage.totalCost - mortgage.downPayment;
    if (mortgage.offsetOption && mortgage.fixedAmount) {
      return this.calculateOffsetPayments(mortgage);
    }
    const numberOfPayments = mortgage.loanTerm;
    const x = Math.pow(1 + mortgage.monthlyInterestRate, numberOfPayments);
    let monthlyPayment = (principal * x * mortgage.monthlyInterestRate) / (x - 1);
    if (mortgage.offsetOption && mortgage.fixedAmount) {
      monthlyPayment += mortgage.fixedAmount / numberOfPayments;
    }
    const amortizationSchedule: AmortizationSchedule[] = [];
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

  calculateOffsetPayments(mortgage: MortgageDetails) {
    const numberOfPayments = mortgage.loanTerm;
    const x = Math.pow(1 + mortgage.monthlyInterestRate, numberOfPayments);
    let monthlyPayment = (mortgage.loanAmount * x * mortgage.monthlyInterestRate) / (x - 1);
    let remainingBalance = mortgage.loanAmount;
    let monthyIncrementOffset = mortgage.monthlyAdditionOffset;
    // if (this.offsetTypeOption === 'monthly') {
    //   monthyIncrementOffset = this.monthlyAddition;
    // }
    let totalInterestPaidWithOffset = 0;
    let totalPaymentWithOffset = 0;
    let lineLabels = [];
    let lineData = [];
    let offsetStartAmount = mortgage.fixedAmount !== undefined ? mortgage.fixedAmount : 0;
    const amortizationSchedule: AmortizationSchedule[] = [];

    for (let month = 1; month <= numberOfPayments; month++) {
      offsetStartAmount += monthyIncrementOffset;
      const principalWithOffset = remainingBalance - offsetStartAmount;
      let interestPaymentWithOffset = principalWithOffset * mortgage.monthlyInterestRate;
      if (principalWithOffset <= 0) {
        interestPaymentWithOffset = 0;
      }
      const interestPayment = remainingBalance * mortgage.monthlyInterestRate;
      const principalPayment = monthlyPayment - interestPayment;
      const monthlyPaymentWithOffset = principalPayment + interestPaymentWithOffset;
      remainingBalance -= principalPayment;
      amortizationSchedule.push({
        month: month,
        paymentMade: monthlyPaymentWithOffset,
        interestPaid: interestPaymentWithOffset,
        remainingAmount: remainingBalance
      });
      totalInterestPaidWithOffset += interestPaymentWithOffset;
      totalPaymentWithOffset += monthlyPaymentWithOffset;
      lineData.push(Math.max(0, remainingBalance));
      lineLabels.push(`Month ${month}`);
      if (remainingBalance < 0) { remainingBalance = 0; break; };
      
    }
    return amortizationSchedule;
  }
}

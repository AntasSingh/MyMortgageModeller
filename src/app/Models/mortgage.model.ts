export class Mortgage {
  constructor(
    public modelName: string,
    public bankName?: string
  ) { }
}

export interface AmortizationSchedule {
  month: number;
  paymentMade: number;
  interestPaid: number;
  remainingAmount: number;
}

export class MortgageDetails {
  totalCost: number;
  downPayment: number;
  interestRate: number;
  loanTerm: number;
  preprocessingCost: number;
  fixedAmount?: number; // Optional
  loanTermYears: number;
  loanTermMonths: number;
  loanAmount: number;
  totalInterestPaid: number;
  monthlyInterestRate: number;
  offsetOption: boolean; // Boolean
  compoundingPeriod: string;
  monthlyPayment: number;
  totalPayment: number;
  modelName: string; 
  bankName?: string;
  monthlyAdditionOffset: number; 
  userEmail?: string;

  constructor() {
    this.totalCost = 0;
    this.downPayment = 0;
    this.interestRate = 0;
    this.loanTerm = 0;
    this.preprocessingCost = 0;
    this.fixedAmount = undefined;
    this.loanTermYears = 0;
    this.loanTermMonths = 0;
    this.loanAmount = 0;
    this.totalInterestPaid = 0;
    this.monthlyInterestRate = 0;
    this.offsetOption = false;
    this.compoundingPeriod = 'annually';
    this.monthlyPayment = 0;
    this.totalPayment = 0;
    this.modelName = ''; 
    this.bankName = undefined; 
    this.monthlyAdditionOffset =0;
    this.userEmail = undefined;
  }
  toJSON(): any {
    return {
      "model-name": this.modelName,
      "user-email": this.userEmail,
      "totalCost": this.totalCost,
      "downPayment": this.downPayment,
      "interestRate": this.interestRate,
      "loanTerm": this.loanTerm,
      "preprocessingCost": this.preprocessingCost,
      "fixedAmount": this.fixedAmount,
      "loanTermYears": this.loanTermYears,
      "loanTermMonths": this.loanTermMonths,
      "loanAmount": this.loanAmount,
      "totalInterestPaid": this.totalInterestPaid,
      "monthlyInterestRate": this.monthlyInterestRate,
      "offsetOption": this.offsetOption,
      "compoundingPeriod": this.compoundingPeriod,
      "monthlyPayment": this.monthlyPayment,
      "totalPayment": this.totalPayment,
      "monthlyAdditionOffset": this.monthlyAdditionOffset,
      "bankName": this.bankName
    };
  }
}
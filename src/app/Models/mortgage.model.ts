export class Mortgage {
  constructor(
    public modelName: string,
    public bankName?: string
  ) { }
}

export class MortgageDetails {
  totalCost: number;
  downPayment: number;
  interestRate: number;
  loanTerm: number;
  preprocessingCost: number;
  offsetAmount?: number; // Optional
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

  constructor() {
    this.totalCost = 0;
    this.downPayment = 0;
    this.interestRate = 0;
    this.loanTerm = 0;
    this.preprocessingCost = 0;
    this.offsetAmount = undefined;
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
  }
}
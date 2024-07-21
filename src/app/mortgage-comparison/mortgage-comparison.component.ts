import { Component } from '@angular/core';
import { MortgageDetails } from '../Models/mortgage.model';
import { MortgageDetailsService } from '../services/mortgage-service.service';

@Component({
  selector: 'app-mortgage-comparison',
  templateUrl: './mortgage-comparison.component.html',
  styleUrl: './mortgage-comparison.component.scss'
})
export class MortgageComparisonComponent {
  mortgages: MortgageDetails[] = [];
  responsiveOptions: any[] = [];

  // constructor(private mortgageService: MortgageDetailsService) {}

  // ngOnInit(): void {
  //   // Get mortgage details from the service
  //   this.mortgages = this.mortgageService.getMortgageDetails();
  // }
  ngOnInit(): void {
    // Mock data
    this.mortgages = [
      {
        totalCost: 222222,
        downPayment: 22,
        interestRate: 20,
        loanTerm: 264,
        preprocessingCost: 22,
        loanTermYears: 6,
        loanTermMonths: 0,
        loanAmount: 222200,
        totalInterestPaid: 52639.47,
        monthlyInterestRate: 0.0016666666666666668,
        offsetOption: false,
        compoundingPeriod: 'monthly',
        monthlyPayment: 1041.06,
        totalPayment: 274883.47,
        modelName: 'm1',
        bankName: undefined // Optional
      },
      {
        totalCost: 333333,
        downPayment: 32,
        interestRate: 50,
        loanTerm: 396,
        preprocessingCost: 32,
        loanTermYears: 33,
        loanTermMonths: 0,
        loanAmount: 333301,
        totalInterestPaid: 57873.03,
        monthlyInterestRate: 0.0008295381143461622,
        offsetOption: false,
        compoundingPeriod: 'annually',
        monthlyPayment: 987.81,
        totalPayment: 391238.03,
        modelName: 'm2',
        bankName: undefined // Optional
      }
      ,
      {
        totalCost: 222222,
        downPayment: 22,
        interestRate: 20,
        loanTerm: 264,
        preprocessingCost: 22,
        loanTermYears: 6,
        loanTermMonths: 0,
        loanAmount: 222200,
        totalInterestPaid: 52639.47,
        monthlyInterestRate: 0.0016666666666666668,
        offsetOption: false,
        compoundingPeriod: 'monthly',
        monthlyPayment: 1041.06,
        totalPayment: 274883.47,
        modelName: 'm1',
        bankName: undefined // Optional
      },
      {
        totalCost: 222222,
        downPayment: 22,
        interestRate: 20,
        loanTerm: 264,
        preprocessingCost: 22,
        loanTermYears: 6,
        loanTermMonths: 0,
        loanAmount: 222200,
        totalInterestPaid: 52639.47,
        monthlyInterestRate: 0.0016666666666666668,
        offsetOption: false,
        compoundingPeriod: 'monthly',
        monthlyPayment: 1041.06,
        totalPayment: 274883.47,
        modelName: 'm1',
        bankName: undefined // Optional
      },
      {
        totalCost: 222222,
        downPayment: 22,
        interestRate: 20,
        loanTerm: 264,
        preprocessingCost: 22,
        loanTermYears: 6,
        loanTermMonths: 0,
        loanAmount: 222200,
        totalInterestPaid: 52639.47,
        monthlyInterestRate: 0.0016666666666666668,
        offsetOption: false,
        compoundingPeriod: 'monthly',
        monthlyPayment: 1041.06,
        totalPayment: 274883.47,
        modelName: 'm1',
        bankName: undefined // Optional
      }
      ,
      {
        totalCost: 222222,
        downPayment: 22,
        interestRate: 20,
        loanTerm: 264,
        preprocessingCost: 22,
        loanTermYears: 6,
        loanTermMonths: 0,
        loanAmount: 222200,
        totalInterestPaid: 52639.47,
        monthlyInterestRate: 0.0016666666666666668,
        offsetOption: false,
        compoundingPeriod: 'monthly',
        monthlyPayment: 1041.06,
        totalPayment: 274883.47,
        modelName: 'm1',
        bankName: undefined // Optional
      },
      {
        totalCost: 222222,
        downPayment: 22,
        interestRate: 20,
        loanTerm: 264,
        preprocessingCost: 22,
        loanTermYears: 6,
        loanTermMonths: 0,
        loanAmount: 222200,
        totalInterestPaid: 52639.47,
        monthlyInterestRate: 0.0016666666666666668,
        offsetOption: false,
        compoundingPeriod: 'monthly',
        monthlyPayment: 1041.06,
        totalPayment: 274883.47,
        modelName: 'm1',
        bankName: undefined // Optional
      },
      {
        totalCost: 222222,
        downPayment: 22,
        interestRate: 20,
        loanTerm: 264,
        preprocessingCost: 22,
        loanTermYears: 6,
        loanTermMonths: 0,
        loanAmount: 222200,
        totalInterestPaid: 52639.47,
        monthlyInterestRate: 0.0016666666666666668,
        offsetOption: false,
        compoundingPeriod: 'monthly',
        monthlyPayment: 1041.06,
        totalPayment: 274883.47,
        modelName: 'm1',
        bankName: undefined // Optional
      }
    ];

    this.responsiveOptions = [
      {
        breakpoint: '200px',
        numVisible: 3, // Show 2 items for large screens
        numScroll: 1
      },
      {
        breakpoint: '200px',
        numVisible: 1, // Show 1 item for medium screens
        numScroll: 1
      },
      {
        breakpoint: '200px',
        numVisible: 1, // Show 1 item for small screens
        numScroll: 1
      }
    ];
  }
}

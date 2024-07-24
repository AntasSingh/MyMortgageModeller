import { Component } from '@angular/core';
import { ChartConfiguration, ChartOptions, ChartType } from 'chart.js';
import Chart from 'chart.js/auto';
import zoomPlugin from 'chartjs-plugin-zoom';
import { BaseChartDirective } from 'ng2-charts';
import { MortgageDetailsService } from '../services/mortgage-service.service';
import { Mortgage, MortgageDetails } from '../Models/mortgage.model';
import { AddMortgageDetailsService } from '../services/add-mortgage-details.service';

interface AmortizationSchedule {
  month: number;
  paymentMade: number;
  interestPaid: number;
  remainingAmount: number;
}
@Component({
  selector: 'app-mortgage-details',
  templateUrl: './mortgage-details.component.html',
  styleUrl: './mortgage-details.component.scss'
})
export class MortgageDetailsComponent {

  totalCost!: number;
  offsetOption: string = 'no';
  offsetTypeOption: string = 'fixed'; // 'fixed' or 'monthly'
  fixedAmount: number = 0;
  initialAmount: number = 0;
  monthlyAddition: number = 0;
  monthlyDepositOption: string = 'no';
  downPayment!: number;
  interestRate!: number;
  loanTerm!: number;
  preprocessingCost!: number;
  offsetAmount!: number;
  loanTermYears!: number;
  loanTermMonths!: number;
  loanAmount!: number;
  totalInterestPaid!: number;
  monthlyInterestRate!: number;
  compoundingPeriod: string = 'annually';
  compoundingOptions = [
    { label: 'Annually', value: 'annually' },
    { label: 'Monthly', value: 'monthly' },
    { label: 'Daily', value: 'daily' }
  ];

  monthlyPayment!: number;
  totalPayment!: number;
  lineData: any;
  chartOptions: ChartOptions = {};
  amortizationSchedule: AmortizationSchedule[] = [];
  mortgageName!: Mortgage;

  constructor(private mortgageDetailsService: MortgageDetailsService, private mortgageService: AddMortgageDetailsService) {
    this.chartOptions = {
      responsive: true,
      scales: {
        x: {
          title: {
            display: true,
            text: 'Days'
          }
        },
        y: {
          title: {
            display: true,
            text: 'Amount (£)'
          }
        }
      },
      plugins: {
        legend: {
          labels: {
            color: 'black' // Adjust legend label color if needed
          }
        },
        zoom: {
          pan: {
            enabled: true,
            mode: 'x',
          },
          zoom: {
            wheel: {
              enabled: true,
            },
            pinch: {
              enabled: true,
            },
            mode: 'x',
          }
        },
        tooltip: {
          enabled: true,
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          titleColor: 'white',
          bodyColor: 'white',
          callbacks: {
            label: function (tooltipItem: any) {
              return `Amount: £${tooltipItem.raw}`;
            }
          }
        }
      },
      backgroundColor: 'white' // Set background color to white
    };

    Chart.register(zoomPlugin);
  }
  ngOnInit(): void {
    const mortgage = this.mortgageService.getMortgage();
    if (mortgage) {
      this.mortgageName = mortgage;
    } else {
      // Handle the case when no mortgage data is available
      console.error('No mortgage data available');
    }
  }
  calculatePayment() {
    if (!this.totalCost || !this.downPayment || !this.interestRate ||
      (!this.loanTermYears && !this.loanTermMonths)) {
      alert('Please fill in all fields.');
      return;
    }

    // Convert loan term to months
    const totalLoanTermMonths = (this.loanTermYears || 0) * 12 + (this.loanTermMonths || 0);
    this.loanTerm = totalLoanTermMonths;
    const annualInterestRate = this.interestRate / 100;
    this.monthlyInterestRate = this.convertInterestRate(annualInterestRate, this.compoundingPeriod);

    //const principal = this.totalCost - this.downPayment;
    let principal = this.totalCost - this.downPayment;
    this.loanAmount = principal;
    if (this.offsetOption === 'yes' && this.fixedAmount) {
      this.calculateOffsetPayments(principal, totalLoanTermMonths);
      principal -= this.fixedAmount;
    } else {
      console.log("here12345");
      // Calculate monthly payment
      const numberOfPayments = totalLoanTermMonths;
      const x = Math.pow(1 + this.monthlyInterestRate, numberOfPayments);
      let monthlyPayment = (principal * x * this.monthlyInterestRate) / (x - 1);
      this.monthlyPayment = parseFloat(monthlyPayment.toFixed(2));
      // Calculate total payment
      this.totalInterestPaid = (monthlyPayment * numberOfPayments) - this.loanAmount;
      const totalPayment = (monthlyPayment * numberOfPayments) + this.downPayment + this.preprocessingCost;
      this.totalPayment = parseFloat(totalPayment.toFixed(2));

      const newMortgageDetails = new MortgageDetails();
      newMortgageDetails.totalCost = this.totalCost;
      newMortgageDetails.downPayment = this.downPayment;
      newMortgageDetails.interestRate = this.interestRate;
      newMortgageDetails.loanTerm = this.loanTerm;
      newMortgageDetails.preprocessingCost = this.preprocessingCost;
      newMortgageDetails.offsetAmount = this.offsetAmount;
      newMortgageDetails.loanTermYears = this.loanTermYears;
      newMortgageDetails.loanTermMonths = this.loanTermMonths;
      newMortgageDetails.loanAmount = this.loanAmount;
      newMortgageDetails.totalInterestPaid = this.totalInterestPaid;
      newMortgageDetails.monthlyInterestRate = this.monthlyInterestRate;
      newMortgageDetails.offsetOption = this.offsetOption !== 'no';
      newMortgageDetails.compoundingPeriod = this.compoundingPeriod;
      newMortgageDetails.monthlyPayment = this.monthlyPayment;
      newMortgageDetails.totalPayment = this.totalPayment;
      newMortgageDetails.modelName = this.mortgageName.modelName;
      newMortgageDetails.bankName = this.mortgageName.bankName || undefined;

      // Add the new MortgageDetails object to the MortgageDetailsService
      this.mortgageDetailsService.addMortgageDetails(newMortgageDetails);

      // Recalculate amortization schedule with the offset amount
      this.calculateAmortization();
    }
  }

  // Function to convert interest rate based on rate type (annually, monthly, daily)
  convertInterestRate(rate: number, rateType: string): number {
    const annually = 'annually';
    const monthly = 'monthly';
    const daily = 'daily';

    switch (rateType.toLowerCase()) {
      case annually:
        return Math.pow(1 + rate, 1 / 12) - 1;
      case monthly:
        return rate / 12;
      case daily:
        const dailyRate = rate / 365;
        const annualRate = Math.pow(1 + dailyRate, 365) - 1;
        return Math.pow(1 + annualRate, 1 / 12) - 1;

      default:
        throw new Error(`Unsupported rate type: ${rateType}`);
    }
  }


  calculateAmortization() {
    let principal = this.totalCost - this.downPayment;
    if (this.offsetOption === 'yes' && this.offsetAmount) {
      principal -= this.offsetAmount;
    }
    const numberOfPayments = this.loanTerm;
    const dailyInterestRate = this.interestRate / 100 / 365;

    const numberOfDays = this.loanTerm * 30.44;
    let lineLabels = [];
    let lineData = [];

    const dailyPayments = [];
    const dailyLabels = [];

    const x = Math.pow(1 + this.monthlyInterestRate, numberOfPayments);
    let monthlyPayment = (principal * x * this.monthlyInterestRate) / (x - 1);
    if (this.offsetOption === 'yes' && this.offsetAmount) {
      monthlyPayment = monthlyPayment + (this.offsetAmount / numberOfPayments);
    }
    this.amortizationSchedule = [];
    let remainingAmountWithIntrest = principal;
    let remainingAmount = principal;
    if (this.offsetOption === 'yes' && this.offsetAmount) {
      remainingAmount = principal + this.offsetAmount;
    }


    for (let month = 1; month <= numberOfPayments; month++) {
      let interestPaid = remainingAmount * this.monthlyInterestRate;
      if (this.offsetOption === 'yes' && this.offsetAmount) {
        interestPaid = remainingAmountWithIntrest * this.monthlyInterestRate;
      }
      const principalPaid = monthlyPayment - interestPaid;
      remainingAmount -= principalPaid;
      if (this.offsetOption === 'yes' && this.offsetAmount) {
        remainingAmountWithIntrest -= monthlyPayment - interestPaid - (this.offsetAmount / numberOfPayments);
      }
      this.amortizationSchedule.push({
        month,
        paymentMade: monthlyPayment,
        interestPaid,
        remainingAmount: Math.max(0, remainingAmount) // To avoid negative remaining amount
      });
      lineData.push(Math.max(0, remainingAmount));
      lineLabels.push(`Month ${month}`);
    }
    this.lineData = {
      labels: lineLabels,
      datasets: [
        {
          label: 'Remaining Loan Amount',
          data: lineData,
          fill: false,
          borderColor: '#4bc0c0'
        }
      ]
    };

    if (this.compoundingPeriod === 'daily') {
      this.calculateDailyPayments(this.amortizationSchedule,this.loanAmount);
    }
  }
  
  calculateOffsetPayments(principal: number, totalLoanTermMonths: number) {
    const numberOfPayments = totalLoanTermMonths;
    const x = Math.pow(1 + this.monthlyInterestRate, numberOfPayments);
    let monthlyPayment = (principal * x * this.monthlyInterestRate) / (x - 1);
    let remainingBalance = this.loanAmount;
    let monthyIncrementOffset = this.monthlyAddition;
    if (this.offsetTypeOption === 'monthly') {
      monthyIncrementOffset = this.monthlyAddition;
    }
    let totalInterestPaidWithOffset = 0;
    let totalPaymentWithOffset = 0;
    let lineLabels = [];
    let lineData = [];
    this.amortizationSchedule=[];

    for (let month = 1; month <= numberOfPayments; month++) {
      this.fixedAmount += monthyIncrementOffset;
      const principalWithOffset = remainingBalance - this.fixedAmount;
      let interestPaymentWithOffset = principalWithOffset * this.monthlyInterestRate;
      if (principalWithOffset <= 0) {
        interestPaymentWithOffset = 0;
      }
      const interestPayment = remainingBalance * this.monthlyInterestRate;
      const principalPayment = monthlyPayment - interestPayment;
      const monthlyPaymentWithOffset = principalPayment + interestPaymentWithOffset;
      remainingBalance -= principalPayment;
      this.amortizationSchedule.push({
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
    if (this.compoundingPeriod === 'daily'){
      this.calculateDailyPayments(this.amortizationSchedule,this.loanAmount);
    }
    else {
    this.lineData = {
      labels: lineLabels,
      datasets: [
        {
          label: 'Remaining Loan Amount',
          data: lineData,
          fill: false,
          borderColor: '#4bc0c0'
        }
      ]
    };}
    this.monthlyPayment = totalPaymentWithOffset / this.amortizationSchedule.length;
    totalPaymentWithOffset += this.downPayment + this.preprocessingCost;
    this.totalInterestPaid = totalInterestPaidWithOffset;
    this.totalPayment = parseFloat(totalPaymentWithOffset.toFixed(2));

    const newMortgageDetails = new MortgageDetails();
    newMortgageDetails.totalCost = this.totalCost;
    newMortgageDetails.downPayment = this.downPayment;
    newMortgageDetails.interestRate = this.interestRate;
    newMortgageDetails.loanTerm = this.loanTerm;
    newMortgageDetails.preprocessingCost = this.preprocessingCost;
    newMortgageDetails.offsetAmount = this.offsetAmount;
    newMortgageDetails.loanTermYears = this.loanTermYears;
    newMortgageDetails.loanTermMonths = this.loanTermMonths;
    newMortgageDetails.loanAmount = this.loanAmount;
    newMortgageDetails.totalInterestPaid = this.totalInterestPaid;
    newMortgageDetails.monthlyInterestRate = this.monthlyInterestRate;
    newMortgageDetails.offsetOption = this.offsetOption !== 'no';
    newMortgageDetails.compoundingPeriod = this.compoundingPeriod;
    newMortgageDetails.monthlyPayment = this.monthlyPayment;
    newMortgageDetails.totalPayment = this.totalPayment;
    newMortgageDetails.modelName = this.mortgageName.modelName; 
    newMortgageDetails.bankName = this.mortgageName.bankName || undefined;

    this.mortgageDetailsService.addMortgageDetails(newMortgageDetails);
  }

  calculateDailyPayments(schedule: AmortizationSchedule[], totalAmount: number) {
    let dailyPayments: number[] = [];
    let dailyLabels: string[] = [];
    let currentDate = new Date();
  
    for (let i = 0; i < schedule.length; i++) {
      const { month, paymentMade, interestPaid, remainingAmount } = schedule[i];
      
      currentDate.setMonth(month - 1);
      currentDate.setDate(1);
      
      const daysInCurrentMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
      const dailyInterest = interestPaid / daysInCurrentMonth;
  
      for (let day = 1; day <= daysInCurrentMonth; day++) {
        totalAmount += dailyInterest;
        dailyPayments.push(Math.max(0, totalAmount));
        dailyLabels.push(`${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${day}`);
      }
  
      totalAmount -= paymentMade;
    }
  
    this.lineData = {
      labels: dailyLabels,
      datasets: [
        {
          label: 'Remaining Loan Amount',
          data: dailyPayments,
          fill: false,
          borderColor: '#4bc0c0'
        }
      ]
    };

  }
}


// calculateMonthlyOffsetAmortization(principal: number, numberOfPayments: number) {
//   this.amortizationSchedule = [];
//   let remainingAmount = principal;
//   let offsetAmount = this.initialAmount;
//   let totalMonthlyPayment = 0;
//   console.log("hererer");
//   for (let month = numberOfPayments; month >= 1; month--) {
//     if (this.offsetTypeOption === 'fixed' && offsetAmount >= remainingAmount) {
//       this.amortizationSchedule.push({
//         month,
//         paymentMade: 0,
//         interestPaid: 0,
//         remainingAmount: 0
//       });
//       break;
//     }

//     const x = Math.pow(1 + this.monthlyInterestRate, month);
//     const monthlyPayment = ((remainingAmount - offsetAmount) * x * this.monthlyInterestRate) / (x - 1);

//     const interestPaid = remainingAmount * this.monthlyInterestRate;
//     const principalPaid = monthlyPayment - interestPaid;
//     remainingAmount -= principalPaid;

//     if (this.offsetTypeOption === 'monthly') {
//       offsetAmount += this.monthlyAddition;
//     }

//     this.amortizationSchedule.push({
//       month,
//       paymentMade: monthlyPayment,
//       interestPaid,
//       remainingAmount: Math.max(0, remainingAmount) // To avoid negative remaining amount
//     });

//     totalMonthlyPayment += monthlyPayment;

//     if (offsetAmount >= remainingAmount) {
//       console.log(offsetAmount);
//       break;
//     }
//   }
//   this.monthlyPayment = parseFloat((totalMonthlyPayment / numberOfPayments).toFixed(2));
//   this.totalInterestPaid = totalMonthlyPayment - this.loanAmount;
//   const totalPayment = totalMonthlyPayment + this.downPayment;
//   this.totalPayment = parseFloat(totalPayment.toFixed(2));

//   // Create a new MortgageDetails object
//   const newMortgageDetails = new MortgageDetails();
//   newMortgageDetails.totalCost = this.totalCost;
//   newMortgageDetails.downPayment = this.downPayment;
//   newMortgageDetails.interestRate = this.interestRate;
//   newMortgageDetails.loanTerm = this.loanTerm;
//   newMortgageDetails.offsetAmount = this.offsetAmount;
//   newMortgageDetails.loanTermYears = this.loanTermYears;
//   newMortgageDetails.loanTermMonths = this.loanTermMonths;
//   newMortgageDetails.loanAmount = this.loanAmount;
//   newMortgageDetails.totalInterestPaid = this.totalInterestPaid;
//   newMortgageDetails.monthlyInterestRate = this.monthlyInterestRate;
//   newMortgageDetails.offsetOption = this.offsetOption !== 'no';
//   newMortgageDetails.compoundingPeriod = this.compoundingPeriod;
//   newMortgageDetails.monthlyPayment = this.monthlyPayment;
//   newMortgageDetails.totalPayment = this.totalPayment;
//   newMortgageDetails.modelName = this.mortgageName.modelName;
//   newMortgageDetails.bankName = this.mortgageName.bankName || undefined;

//   // Add the new MortgageDetails object to the MortgageDetailsService
//   this.mortgageDetailsService.addMortgageDetails(newMortgageDetails);
//   this.monthlyPayment = parseFloat((totalMonthlyPayment / numberOfPayments).toFixed(2));
// }
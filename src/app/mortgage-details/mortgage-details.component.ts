import { Component } from '@angular/core';
import { ChartConfiguration, ChartOptions, ChartType } from 'chart.js';
import Chart from 'chart.js/auto';
import zoomPlugin from 'chartjs-plugin-zoom';
import { BaseChartDirective } from 'ng2-charts';

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
  offsetOption: string = 'no';
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

  constructor() {
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

  calculatePayment() {
    if (!this.totalCost || !this.downPayment || !this.interestRate ||
        (!this.loanTermYears && !this.loanTermMonths)) {
      alert('Please fill in all fields.');
      return;
    }
  
    // Convert loan term to months
    const totalLoanTermMonths = (this.loanTermYears || 0) * 12 + (this.loanTermMonths || 0);
    this.loanTerm = totalLoanTermMonths;
  
    //const principal = this.totalCost - this.downPayment;
    let principal = this.totalCost - this.downPayment;
    this.loanAmount =principal;
    if (this.offsetOption === 'yes' && this.offsetAmount) {
      principal -= this.offsetAmount;
    }
    const annualInterestRate = this.interestRate / 100;
  
    // Convert annual interest rate to monthly interest rate
    this.monthlyInterestRate = this.convertInterestRate(annualInterestRate, this.compoundingPeriod);
  
    // Calculate monthly payment
    const numberOfPayments = totalLoanTermMonths;
    const x = Math.pow(1 + this.monthlyInterestRate, numberOfPayments);
    let monthlyPayment = (principal * x * this.monthlyInterestRate) / (x - 1);
  
    // Add offset amount to monthly payment
    if (this.offsetOption === 'yes' && this.offsetAmount) {
      const offsetAmountPerMonth = this.offsetAmount / totalLoanTermMonths;
      monthlyPayment += offsetAmountPerMonth;
    }
  
    this.monthlyPayment = parseFloat(monthlyPayment.toFixed(2));
  
    // Calculate total payment
    this.totalInterestPaid = (monthlyPayment * numberOfPayments) - this.loanAmount;
    const totalPayment = (monthlyPayment * numberOfPayments) + this.downPayment + this.preprocessingCost;
    this.totalPayment = parseFloat(totalPayment.toFixed(2));
  
    // Recalculate amortization schedule with the offset amount
    this.calculateAmortization();
  }
  
  // Function to convert interest rate based on rate type (annually, monthly, daily)
  convertInterestRate(rate: number, rateType: string): number {
    const annually = 'annually';
    const monthly = 'monthly';
    const daily = 'daily';
  
    switch (rateType.toLowerCase()) {
      case annually:
        // Convert annual rate to monthly rate
        return Math.pow(1 + rate, 1/12) - 1;
  
      case monthly:
        // If already monthly, return as is
        return rate/12;
  
      case daily:
        // Convert daily rate to monthly rate (assuming 30 days in a month)
        const dailyRate = rate / 365;
        const annualRate = Math.pow(1 + dailyRate, 365) - 1;
        return Math.pow(1 + annualRate, 1/12) - 1;
  
      default:
        throw new Error(`Unsupported rate type: ${rateType}`);
    }
  }
  

  calculateAmortization() {
    let principal = this.totalCost - this.downPayment;
    if (this.offsetOption === 'yes' && this.offsetAmount) {
      principal -= this.offsetAmount;
    }
    //const monthlyInterestRate = this.interestRate / 100 / 12;
    const numberOfPayments = this.loanTerm;
    const dailyInterestRate = this.interestRate / 100 / 365;

    const numberOfDays = this.loanTerm * 30.44;
    let lineLabels = [];
    let lineData = [];

    const dailyPayments = [];
    const dailyLabels = [];
    // let dailyRemainingAmount = principal;

    // Calculate the monthly payment
    const x = Math.pow(1 + this.monthlyInterestRate, numberOfPayments);
    let monthlyPayment = (principal * x * this.monthlyInterestRate) / (x - 1);
    if (this.offsetOption === 'yes' && this.offsetAmount) {
      monthlyPayment = monthlyPayment + (this.offsetAmount / numberOfPayments);
    }


    // for (let day = 1; day <= numberOfDays; day++) {
    //   // Calculate daily interest
    //   const dailyInterestPaid = dailyRemainingAmount * dailyInterestRate;
    //   dailyRemainingAmount += dailyInterestPaid; // Add interest to the remaining amount

    //   // Apply monthly payment at the end of each month
    //   if (day % 30 === 0) { // Assuming 30 days per month
    //     const interestPaidThisMonth = dailyRemainingAmount * this.monthlyInterestRate;
    //     const principalPaidThisMonth = monthlyPayment - interestPaidThisMonth;
    //     dailyRemainingAmount -= principalPaidThisMonth;

    //   }

    //   dailyPayments.push(dailyRemainingAmount);
    //   //dailyLabels.push(day);
    //   dailyLabels.push(`Month ${Math.ceil(day / 30)}`); // Convert days to months
    // }

    // // Assign to lineData for chart
    // this.lineData = {
    //   labels: dailyLabels,
    //   datasets: [
    //     {
    //       label: 'Remaining Loan Amount',
    //       data: dailyPayments,
    //       fill: false,
    //       borderColor: '#4bc0c0'
    //     }
    //   ]
    // };

    // Calculate monthly amortization schedule
    this.amortizationSchedule = [];
    let remainingAmountWithIntrest = principal;
    let remainingAmount = principal;
    if (this.offsetOption === 'yes' && this.offsetAmount) {
      remainingAmount = principal + this.offsetAmount;}
    

    for (let month = 1; month <= numberOfPayments; month++) {
      let interestPaid =  remainingAmount* this.monthlyInterestRate;
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
      lineData.push( Math.max(0, remainingAmount));
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
      let dailyAmountWithIntrest = principal;
      let dailyAmount = principal;
      if (this.offsetOption === 'yes' && this.offsetAmount) {
        dailyAmount = principal + this.offsetAmount;
      }
      console.log(numberOfDays);
      for (let day = 1; day <= numberOfDays; day++) {
        let interestPaid = dailyAmount * this.monthlyInterestRate;
        if (this.offsetOption === 'yes' && this.offsetAmount) {
          interestPaid = dailyAmountWithIntrest * this.monthlyInterestRate;
        }
        //const principalPaid = monthlyPayment - interestPaid;
        dailyAmount += (interestPaid/30);
        // if (this.offsetOption === 'yes' && this.offsetAmount) {
        //   remainingAmountWithIntrest -= monthlyPayment - interestPaid - (this.offsetAmount / numberOfPayments);
        // }
        // let dailyInterestPaid = dailyAmount * (this.interestRate/100/365);
        // if (this.offsetOption === 'yes' && this.offsetAmount) {
        //   dailyInterestPaid = dailyAmountWithIntrest * (this.interestRate/100/365);
        // }
        // dailyAmount += dailyInterestPaid; // Add interest to the remaining amount

        if (day % 30 === 0) { // Assuming 30 days per month
          
          dailyAmount -= monthlyPayment;
          if (this.offsetOption === 'yes' && this.offsetAmount) {
            remainingAmountWithIntrest -= monthlyPayment - interestPaid - (this.offsetAmount / numberOfPayments);
          }
        }
        if (this.loanTerm < Math.ceil(day / 30)){
          break;
        }
        dailyPayments.push(Math.max(0, dailyAmount));
        //dailyLabels.push(day);
        dailyLabels.push(`Month ${Math.ceil(day / 30)}`);
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
}

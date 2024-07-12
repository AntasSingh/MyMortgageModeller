import { Component, Input, SimpleChanges } from '@angular/core';
import { ChartOptions } from 'chart.js';

@Component({
  selector: 'app-mortgage-pie-chart',
  templateUrl: './mortgage-pie-chart.component.html',
  styleUrl: './mortgage-pie-chart.component.scss'
})
export class MortgagePieChartComponent {
  @Input()
  downPayment!: number;
  @Input()
  preprocessingCharges!: number;
  @Input()
  loanAmount!: number;
  @Input()
  interestPaid!: number;

  data: any;
  options: ChartOptions = {};

  // ngOnInit() {
  //   this.data = {
  //     labels: ['Down Payment', 'Preprocessing Charges', 'Loan Amount', 'Interest Paid'],
  //     datasets: [
  //       {
  //         data: [this.downPayment, this.preprocessingCharges, this.loanAmount, this.interestPaid],
  //         backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0']
  //       }
  //     ]
  //   };

  //   this.options = {
  //     responsive: true,
  //     maintainAspectRatio: false
  //   };
  // }


  ngOnChanges(changes: SimpleChanges) {
    if (changes['downPayment'] || changes['preprocessingCharges'] || changes['loanAmount'] || changes['interestPaid']) {
      this.updateChartData();
    }
  }

  private updateChartData() {
    this.data = {
      labels: ['Down Payment', 'Preprocessing Charges', 'Loan Amount', 'Interest Paid'],
      datasets: [
        {
          data: [this.downPayment, this.preprocessingCharges, this.loanAmount, this.interestPaid],
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0']
        }
      ]
    };
  }

  constructor() {
    this.options = {
      responsive: true,
      maintainAspectRatio: false
    };
  }


}

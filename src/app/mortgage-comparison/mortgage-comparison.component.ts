import { Component } from '@angular/core';
import { MortgageDetails } from '../Models/mortgage.model';
import { MortgageDetailsService } from '../services/mortgage-service.service';
import { MortgageCalculatorService } from '../services/mortgage-calculator.service';
import * as Highcharts from 'highcharts';
import { TooltipFormatterContextObject } from 'highcharts';

@Component({
  selector: 'app-mortgage-comparison',
  templateUrl: './mortgage-comparison.component.html',
  styleUrl: './mortgage-comparison.component.scss'
})
export class MortgageComparisonComponent {
  Highcharts: typeof Highcharts = Highcharts; 
  mortgages: MortgageDetails[] = [];
  responsiveOptions: any[] = [];
  chartData: any;
  chartOptions: any;
  chartData2: any;
  chartOptions2: any;
  chartOptions22: Highcharts.Options = {};
  chartOptions23:  Highcharts.Options = {};
  chartOptionsPayment: Highcharts.Options = {};

  constructor(private mortgageService: MortgageDetailsService,private mortgageCalculatorService: MortgageCalculatorService) {}

  ngOnInit(): void {
    this.mortgages = this.mortgageService.getMortgageDetails();
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
    this.updateChartData();
    this.chartOptions = {
      plugins: {
        legend: {
          display: true,
          position: 'top'
        }
      },
      scales: {
        x: {
          stacked: true
        },
        y: {
          stacked: true
        }
      }
    };
    this.populateChartData(); 
    this.chartOptions2 = {
      responsive: true,
      plugins: {
        legend: {
          display: true,
          position: 'top'
        },
      },
      scales: {
        
        x: {
          title: {
            display: true,
            text: 'Months'
          }
        },
        y: {
          title: {
            position: 'left',
            display: false,
            text: 'Remaining Amount2'
          }
        }
      },
      maintainAspectRatio: false,
      layout: {
        padding: {
          left: 20,
          right: 20,
          top: 20,
          bottom: 20
        }
      }
    };
    this.populateInterestChartData();
    this.populatePaymentChartData();
  }
  updateChartData(): void {
    const labels = this.mortgages.map((_, index) => `Loan ${index + 1}`);
    const downPayments = this.mortgages.map(loan => loan.downPayment);
    const preprocessingCharges = this.mortgages.map(loan => loan.preprocessingCost);
    const loanAmounts = this.mortgages.map(loan => loan.loanAmount);
    const interestPaid = this.mortgages.map(loan => loan.totalInterestPaid);

    this.chartData = {
      labels,
      datasets: [
        {
          label: 'Down Payment',
          backgroundColor: '#42A5F5',
          data: downPayments
        },
        {
          label: 'Preprocessing Charges',
          backgroundColor: '#66BB6A',
          data: preprocessingCharges
        },
        {
          label: 'Loan Amount',
          backgroundColor: '#FFA726',
          data: loanAmounts
        },
        {
          label: 'Interest Paid',
          backgroundColor: '#FF6384',
          data: interestPaid
        }
      ]
    };
  }

  populateChartData(): void { // Renamed method
    // const labels = this.mortgages.length > 0 ? 
    //   this.mortgageCalculatorService.calculateAmortization(this.mortgages[0]).map(schedule => `Month ${schedule.month}`) 
    //   : [];
    if (this.mortgages.length === 0) {
      return;
    }

    // Find the mortgage with the longest term
    const longestTermMortgage = this.mortgages.reduce((max, mortgage) => {
      const termInMonths = (mortgage.loanTermYears || 0) * 12 + (mortgage.loanTermMonths || 0);
      return termInMonths > max.term ? { mortgage, term: termInMonths } : max;
    }, { mortgage: null as MortgageDetails | null, term: 0 });

    if (!longestTermMortgage.mortgage) {
      return;
    }
    const amortizationSchedule = this.mortgageCalculatorService.calculateAmortization(longestTermMortgage.mortgage);
    let labels = amortizationSchedule.map(schedule => `Month ${schedule.month}`);
    // const datasets = this.mortgages.map((mortgage, index) => {
    //   const amortizationSchedule = this.mortgageCalculatorService.calculateAmortization(mortgage);
    //   return {
    //     label: `Loan ${index + 1}`,
    //     data: amortizationSchedule.map(schedule => schedule.remainingAmount),
    //     fill: false,
    //     borderColor: this.getRandomColor(),
    //     tension: 0.4
    //   };
    // });

    // // this.chartData2 = {
    // //   labels,
    // //   datasets
    // // };
    // labels = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
    // const dataValues2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    // this.chartData2 = {
    //   labels,
    //   datasets: [
    //     {
    //       label: 'Loan 1',
    //       data: dataValues2,
    //       fill: false,
    //       borderColor: '#8A6E2B',
    //       tension: 0.4
    //     },
    //     {
    //       label: 'Loan 2',
    //       data: dataValues2,
    //       fill: false,
    //       borderColor: '#B35DC1',
    //       tension: 0.4
    //     }
    //   ]
    // };
    const series: Highcharts.SeriesOptionsType[] = this.mortgages.map((mortgage, index) => {
      const schedule = this.mortgageCalculatorService.calculateAmortization(mortgage);
      return {
        name: mortgage.modelName,
        type: 'line',
        data: schedule.map(item => [item.month, Math.floor(item.remainingAmount)]), 
        color: this.getRandomColor(index),
        dataLabels: {
          enabled: false
        }
      } as Highcharts.SeriesLineOptions;
    });

    this.chartOptions22 = {
      title: {
        text: 'Amortization Over Time'
      },
      xAxis: {
        categories: labels,
        title: {
          text: 'Months'
        }
      },
      yAxis: {
        title: {
          text: 'Remaining Amount'
        },
        min: 0
      },
      series: series,
      tooltip: {
        shared: true,
        formatter: function() {
          if (!this.points) {
            return '';
          }
          let tooltip = `<b>${this.x}</b><br/>`;
          this.points.forEach(point => {
            if (point.series && point.series.color) {
              tooltip += `<span style="color:${point.series.color}">\u25CF</span> ${point.series.name}: ${point.y}<br/>`;
            }
          });
          return tooltip;
        }
      },
      responsive: {
        rules: [
          {
            condition: {
              maxWidth: 500
            },
            chartOptions: {
              legend: {
                layout: 'horizontal',
                align: 'center',
                verticalAlign: 'bottom'
              },
              yAxis: {
                labels: {
                  align: 'left'
                }
              },
              xAxis: {
                labels: {
                  align: 'center'
                }
              }
            }
          }
        ]
      }
    };
    
    console.log(series);
  }

  
  // getRandomColor(): string {
  //   const letters = '0123456789ABCDEF';
  //   let color = '#';
  //   for (let i = 0; i < 6; i++) {
  //     color += letters[Math.floor(Math.random() * 16)];
  //   }
  //   return color;
  // }

  private getRandomColor(index: number): string {
    const colors = ['#7cb5ec', '#434348', '#90ed7d', '#f7a35c', '#8085e9', '#f15c80', '#e4d354', '#2b908f', '#f45b5b', '#91e8e1'];
    return colors[index % colors.length];
  }
  
  populateInterestChartData(): void {
    if (this.mortgages.length === 0) {
      return;
    }
  
    // Find the mortgage with the longest term
    const longestTermMortgage = this.mortgages.reduce((max, mortgage) => {
      const termInMonths = (mortgage.loanTermYears || 0) * 12 + (mortgage.loanTermMonths || 0);
      return termInMonths > max.term ? { mortgage, term: termInMonths } : max;
    }, { mortgage: null as MortgageDetails | null, term: 0 });
  
    if (!longestTermMortgage.mortgage) {
      return;
    }
  
    const amortizationSchedule = this.mortgageCalculatorService.calculateAmortization(longestTermMortgage.mortgage);
    let labels = amortizationSchedule.map(schedule => `Month ${schedule.month}`);
  
    const series: Highcharts.SeriesOptionsType[] = this.mortgages.map((mortgage, index) => {
      const schedule = this.mortgageCalculatorService.calculateAmortization(mortgage);
      let cumulativeInterest = 0;
      const data = schedule.map(item => {
        cumulativeInterest += item.interestPaid;
        return [item.month, Math.floor(cumulativeInterest)];
      });
  
      return {
        name: mortgage.modelName,
        type: 'line',
        data: data, // Use [x, y] format for data
        color: this.getRandomColor(index),
        dataLabels: {
          enabled: false // Disable data labels by default
        }
      } as Highcharts.SeriesLineOptions;
    });
  
    this.chartOptions23 = {
      title: {
        text: 'Cumulative Interest Paid Over Time'
      },
      xAxis: {
        categories: labels,
        title: {
          text: 'Months'
        }
      },
      yAxis: {
        title: {
          text: 'Cumulative Interest Paid'
        },
        min: 0
      },
      series: series,
      tooltip: {
        shared: true,
        formatter: function() {
          if (!this.points) {
            return '';
          }
          let tooltip = `<b>${this.x}</b><br/>`;
          this.points.forEach(point => {
            if (point.series && point.series.color) {
              tooltip += `<span style="color:${point.series.color}">\u25CF</span> ${point.series.name}: ${point.y}<br/>`;
            }
          });
          return tooltip;
        }
      },
      responsive: {
        rules: [
          {
            condition: {
              maxWidth: 500
            },
            chartOptions: {
              legend: {
                layout: 'horizontal',
                align: 'center',
                verticalAlign: 'bottom'
              },
              yAxis: {
                labels: {
                  align: 'left'
                }
              },
              xAxis: {
                labels: {
                  align: 'center'
                }
              }
            }
          }
        ]
      }
    };
    
    console.log(series);
  }

  populatePaymentChartData(): void {
    if (this.mortgages.length === 0) {
        return;
    }

    // Find the mortgage with the longest term
    const longestTermMortgage = this.mortgages.reduce((max, mortgage) => {
        const termInMonths = (mortgage.loanTermYears || 0) * 12 + (mortgage.loanTermMonths || 0);
        return termInMonths > max.term ? { mortgage, term: termInMonths } : max;
    }, { mortgage: null as MortgageDetails | null, term: 0 });

    if (!longestTermMortgage.mortgage) {
        return;
    }

    const amortizationSchedule = this.mortgageCalculatorService.calculateAmortization(longestTermMortgage.mortgage);
    let labels = amortizationSchedule.map(schedule => `Month ${schedule.month}`);

    const series: Highcharts.SeriesOptionsType[] = this.mortgages.map((mortgage, index) => {
        const schedule = this.mortgageCalculatorService.calculateAmortization(mortgage);
        const data = schedule.map(item => {
            return [item.month, Math.floor(item.paymentMade)];
        });

        return {
            name: mortgage.modelName,
            type: 'line',
            data: data, // Use [x, y] format for data
            color: this.getRandomColor(index),
            dataLabels: {
                enabled: false // Disable data labels by default
            }
        } as Highcharts.SeriesLineOptions;
    });

    this.chartOptionsPayment = {
        title: {
            text: 'Monthly Payment Made Over Time'
        },
        xAxis: {
            categories: labels,
            title: {
                text: 'Months'
            }
        },
        yAxis: {
            title: {
                text: 'Payment Made'
            },
            min: 0
        },
        series: series,
        tooltip: {
            shared: true,
            formatter: function() {
                if (!this.points) {
                    return '';
                }
                let tooltip = `<b>${this.x}</b><br/>`;
                this.points.forEach(point => {
                    if (point.series && point.series.color) {
                        tooltip += `<span style="color:${point.series.color}">\u25CF</span> ${point.series.name}: ${point.y}<br/>`;
                    }
                });
                return tooltip;
            }
        },
        responsive: {
            rules: [
                {
                    condition: {
                        maxWidth: 500
                    },
                    chartOptions: {
                        legend: {
                            layout: 'horizontal',
                            align: 'center',
                            verticalAlign: 'bottom'
                        },
                        yAxis: {
                            labels: {
                                align: 'left'
                            }
                        },
                        xAxis: {
                            labels: {
                                align: 'center'
                            }
                        }
                    }
                }
            ]
        }
    };

    console.log(series);
}

}
// ngOnInit(): void {
  //   // Mock data
  //   this.mortgages = [
  //     {
  //       totalCost: 222222,
  //       downPayment: 22,
  //       interestRate: 20,
  //       loanTerm: 264,
  //       preprocessingCost: 22,
  //       loanTermYears: 6,
  //       loanTermMonths: 0,
  //       loanAmount: 222200,
  //       totalInterestPaid: 52639.47,
  //       monthlyInterestRate: 0.0016666666666666668,
  //       offsetOption: false,
  //       compoundingPeriod: 'monthly',
  //       monthlyPayment: 1041.06,
  //       totalPayment: 274883.47,
  //       modelName: 'm1',
  //       bankName: undefined // Optional
  //     },
  //     {
  //       totalCost: 333333,
  //       downPayment: 32,
  //       interestRate: 50,
  //       loanTerm: 396,
  //       preprocessingCost: 32,
  //       loanTermYears: 33,
  //       loanTermMonths: 0,
  //       loanAmount: 333301,
  //       totalInterestPaid: 57873.03,
  //       monthlyInterestRate: 0.0008295381143461622,
  //       offsetOption: false,
  //       compoundingPeriod: 'annually',
  //       monthlyPayment: 987.81,
  //       totalPayment: 391238.03,
  //       modelName: 'm2',
  //       bankName: undefined // Optional
  //     }
  //     ,
  //     {
  //       totalCost: 222222,
  //       downPayment: 22,
  //       interestRate: 20,
  //       loanTerm: 264,
  //       preprocessingCost: 22,
  //       loanTermYears: 6,
  //       loanTermMonths: 0,
  //       loanAmount: 222200,
  //       totalInterestPaid: 52639.47,
  //       monthlyInterestRate: 0.0016666666666666668,
  //       offsetOption: false,
  //       compoundingPeriod: 'monthly',
  //       monthlyPayment: 1041.06,
  //       totalPayment: 274883.47,
  //       modelName: 'm1',
  //       bankName: undefined // Optional
  //     },
  //     {
  //       totalCost: 222222,
  //       downPayment: 22,
  //       interestRate: 20,
  //       loanTerm: 264,
  //       preprocessingCost: 22,
  //       loanTermYears: 6,
  //       loanTermMonths: 0,
  //       loanAmount: 222200,
  //       totalInterestPaid: 52639.47,
  //       monthlyInterestRate: 0.0016666666666666668,
  //       offsetOption: false,
  //       compoundingPeriod: 'monthly',
  //       monthlyPayment: 1041.06,
  //       totalPayment: 274883.47,
  //       modelName: 'm1',
  //       bankName: undefined // Optional
  //     },
  //     {
  //       totalCost: 222222,
  //       downPayment: 22,
  //       interestRate: 20,
  //       loanTerm: 264,
  //       preprocessingCost: 22,
  //       loanTermYears: 6,
  //       loanTermMonths: 0,
  //       loanAmount: 222200,
  //       totalInterestPaid: 52639.47,
  //       monthlyInterestRate: 0.0016666666666666668,
  //       offsetOption: false,
  //       compoundingPeriod: 'monthly',
  //       monthlyPayment: 1041.06,
  //       totalPayment: 274883.47,
  //       modelName: 'm1',
  //       bankName: undefined // Optional
  //     }
  //     ,
  //     {
  //       totalCost: 222222,
  //       downPayment: 22,
  //       interestRate: 20,
  //       loanTerm: 264,
  //       preprocessingCost: 22,
  //       loanTermYears: 6,
  //       loanTermMonths: 0,
  //       loanAmount: 222200,
  //       totalInterestPaid: 52639.47,
  //       monthlyInterestRate: 0.0016666666666666668,
  //       offsetOption: false,
  //       compoundingPeriod: 'monthly',
  //       monthlyPayment: 1041.06,
  //       totalPayment: 274883.47,
  //       modelName: 'm1',
  //       bankName: undefined // Optional
  //     },
  //     {
  //       totalCost: 222222,
  //       downPayment: 22,
  //       interestRate: 20,
  //       loanTerm: 264,
  //       preprocessingCost: 22,
  //       loanTermYears: 6,
  //       loanTermMonths: 0,
  //       loanAmount: 222200,
  //       totalInterestPaid: 52639.47,
  //       monthlyInterestRate: 0.0016666666666666668,
  //       offsetOption: false,
  //       compoundingPeriod: 'monthly',
  //       monthlyPayment: 1041.06,
  //       totalPayment: 274883.47,
  //       modelName: 'm1',
  //       bankName: undefined // Optional
  //     },
  //     {
  //       totalCost: 222222,
  //       downPayment: 22,
  //       interestRate: 20,
  //       loanTerm: 264,
  //       preprocessingCost: 22,
  //       loanTermYears: 6,
  //       loanTermMonths: 0,
  //       loanAmount: 222200,
  //       totalInterestPaid: 52639.47,
  //       monthlyInterestRate: 0.0016666666666666668,
  //       offsetOption: false,
  //       compoundingPeriod: 'monthly',
  //       monthlyPayment: 1041.06,
  //       totalPayment: 274883.47,
  //       modelName: 'm1',
  //       bankName: undefined // Optional
  //     }
  //   ];

  //   this.responsiveOptions = [
  //     {
  //       breakpoint: '200px',
  //       numVisible: 3, // Show 2 items for large screens
  //       numScroll: 1
  //     },
  //     {
  //       breakpoint: '200px',
  //       numVisible: 1, // Show 1 item for medium screens
  //       numScroll: 1
  //     },
  //     {
  //       breakpoint: '200px',
  //       numVisible: 1, // Show 1 item for small screens
  //       numScroll: 1
  //     }
  //   ];
  // }
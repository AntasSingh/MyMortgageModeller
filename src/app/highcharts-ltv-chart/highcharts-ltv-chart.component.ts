import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_more from 'highcharts/highcharts-more';
HC_more(Highcharts);

@Component({
  selector: 'app-highcharts-ltv-chart',
  templateUrl: './highcharts-ltv-chart.component.html',
  styleUrls: ['./highcharts-ltv-chart.component.scss']
})
export class HighchartsLTVChartComponent implements OnInit, OnChanges {
  @Input() totalCost!: number;
  @Input() loanAmount!: number;

  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {};

  ngOnInit(): void {
    this.updateChart();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['totalCost'] || changes['loanAmount']) {
      this.updateChart();
    }
  }

  private updateChart() {
    const ltvRatio = (this.loanAmount / this.totalCost) * 100;
    const remainingAmount = this.totalCost - this.loanAmount;

    this.chartOptions = {
      chart: {
        type: 'pie'
      },
      title: {
        text: 'Loan-to-Value Ratio'
      },
      plotOptions: {
        pie: {
          innerSize: '50%',
          depth: 45,
          dataLabels: {
            enabled: true,
            format: '{point.name}: {point.y:.1f}'
          },
          center: ['50%', '50%']
        }
      },
      series: [{
        name: 'Amount',
        data: [
          { name: 'Loan Amount', y: this.loanAmount },
          { name: 'Remaining Amount', y: remainingAmount }
        ],
        type: 'pie'
      }],
      subtitle: {
        text: `${ltvRatio.toFixed(1)}%`,
        verticalAlign: 'middle',
        floating: true,
        align: 'center',
        style: {
          fontSize: '24px', // Adjust the font size to make the ratio bigger
          fontWeight: 'bold', // Make the text bold
          color: '#000000' // Change the color as needed
        }, 
        y: 0
      }
    };
  }
}

import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import * as Highcharts from 'highcharts';

interface AmortizationSchedule {
  month: number;
  paymentMade: number;
  interestPaid: number;
  remainingAmount: number;
}

@Component({
  selector: 'app-highcharts-area-chart',
  templateUrl: './highcharts-area-chart.component.html',
  styleUrls: ['./highcharts-area-chart.component.scss']
})
export class HighchartsAreaChartComponent implements OnInit, OnChanges {
  @Input() amortizationSchedule: AmortizationSchedule[] = [];

  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {};

  ngOnInit(): void {
    this.updateChart();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['amortizationSchedule']) {
      this.updateChart();
    }
  }

  private updateChart() {
    const categories: string[] = [];
    const data1: number[] = [];
    const data2: number[] = [];
    let cumulativeInterest = 0;

    for (const entry of this.amortizationSchedule) {
      categories.push(`Month ${entry.month}`);
      data1.push(entry.remainingAmount);
      cumulativeInterest += entry.interestPaid;
      data2.push(cumulativeInterest);
    }

    this.chartOptions = {
      chart: {
        type: 'area'
      },
      title: {
        text: 'Amortization Schedule Area Chart'
      },
      xAxis: {
        categories: categories,
        tickmarkPlacement: 'on',
        title: {
          text: null // Hide the title by setting text to null
        },
        allowDecimals: false,
        accessibility: {
          rangeDescription: 'Range: 1 to ' + categories.length
        }
      },
      yAxis: {
        title: {
          text: 'Amount'
        }
      },
      tooltip: {
        pointFormat: '{series.name} had stockpiled <b>{point.y:,.0f}</b><br/>' +
          'units in {point.x}'
      },
      plotOptions: {
        area: {
          marker: {
            enabled: false,
            symbol: 'circle',
            radius: 2,
            states: {
              hover: {
                enabled: true
              }
            }
          }
        }
      },
      series: [
        {
          name: 'Remaining Amount',
          data: data1,
          type: 'area'
        },
        {
          name: 'Cumulative Interest Paid',
          data: data2,
          type: 'area'
        }
      ]
    };
  }
}

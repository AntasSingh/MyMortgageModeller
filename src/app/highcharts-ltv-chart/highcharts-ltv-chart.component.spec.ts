import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HighchartsLTVChartComponent } from './highcharts-ltv-chart.component';

describe('HighchartsLtvChartComponent', () => {
  let component: HighchartsLTVChartComponent;
  let fixture: ComponentFixture<HighchartsLTVChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HighchartsLTVChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HighchartsLTVChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HighchartsAreaChartComponent } from './highcharts-area-chart.component';
import { TestSetupModule } from '../test/test-setup.module';

describe('HighchartsAreaChartComponent', () => {
  let component: HighchartsAreaChartComponent;
  let fixture: ComponentFixture<HighchartsAreaChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HighchartsAreaChartComponent],
      imports: [TestSetupModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HighchartsAreaChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

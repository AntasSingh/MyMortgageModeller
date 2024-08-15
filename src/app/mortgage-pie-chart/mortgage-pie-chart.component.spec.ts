import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MortgagePieChartComponent } from './mortgage-pie-chart.component';
import { TestSetupModule } from '../test/test-setup.module';

describe('MortgagePieChartComponent', () => {
  let component: MortgagePieChartComponent;
  let fixture: ComponentFixture<MortgagePieChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MortgagePieChartComponent],
      imports: [TestSetupModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MortgagePieChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

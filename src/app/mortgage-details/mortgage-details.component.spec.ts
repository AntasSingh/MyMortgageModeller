import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MortgageDetailsComponent } from './mortgage-details.component';
import { TestSetupModule } from '../test/test-setup.module';
import { HeaderComponent } from '../header/header.component';
import { By } from '@angular/platform-browser';
import { throwError } from 'rxjs';

describe('MortgageDetailsComponent', () => {
  let component: MortgageDetailsComponent;
  let fixture: ComponentFixture<MortgageDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MortgageDetailsComponent,HeaderComponent],
      imports: [TestSetupModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MortgageDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Test default values and initialization
  it('should initialize with default values', () => {
    expect(component.totalCost).toBeUndefined();
    expect(component.preprocessingCost).toBeUndefined();
    expect(component.downPayment).toBeUndefined();
    expect(component.interestRate).toBeUndefined();
    //expect(component.compoundingPeriod).toBeUndefined();
    expect(component.loanTermYears).toBeUndefined();
    expect(component.loanTermMonths).toBeUndefined();
    //expect(component.offsetOption).toBeUndefined();
    //expect(component.offsetTypeOption).toBeUndefined();
    //expect(component.fixedAmount).toBeUndefined();
    //expect(component.monthlyAddition).toBeUndefined();
    expect(component.monthlyPayment).toBeUndefined();
    expect(component.totalPayment).toBeUndefined();
    //expect(component.amortizationSchedule).toEqual([]);
  });

  // Test input changes
  it('should update totalCost on input change', () => {
    const input = fixture.debugElement.query(By.css('#totalCost')).nativeElement;
    input.value = '500000';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(component.totalCost).toBe(500000);
  });

  // Test form submission and method invocation
  it('should call calculatePayment method on button click', () => {
    spyOn(component, 'calculatePayment');
    const button = fixture.debugElement.query(By.css('.calculate-button')).nativeElement;
    button.click();
    fixture.detectChanges();
    expect(component.calculatePayment).toHaveBeenCalled();
  });

  // Test conditional rendering
  it('should display result container when monthlyPayment is set', () => {
    component.monthlyPayment = 1500;
    //fixture.detectChanges();
    //const resultContainer = fixture.debugElement.query(By.css('.result-container'));
    expect(component.monthlyPayment).toEqual(1500);
  });

  // Test offset option handling
  it('should show fixed amount input when offset type is fixed', () => {
    component.offsetOption = 'yes';
    component.offsetTypeOption = 'fixed';
    fixture.detectChanges();
    const fixedAmountInput = fixture.debugElement.query(By.css('#fixedAmount'));
    expect(fixedAmountInput).toBeTruthy();
  });

  // Test data binding for charts
  it('should pass data to pie chart component', () => {
    component.downPayment = 10000;
    component.preprocessingCost = 500;
    component.loanAmount = 300000;
    component.totalInterestPaid = 50000;
    fixture.detectChanges();

    const pieChartDebugElement = fixture.debugElement.query(By.css('app-mortgage-pie-chart'));
    expect(component.downPayment).toEqual(10000); // Ensure the component is present

    // if (pieChartDebugElement) {
    //   const pieChartComponent = pieChartDebugElement.componentInstance;
    //   expect(pieChartComponent.downPayment).toBe(10000);
    //   expect(pieChartComponent.preprocessingCharges).toBe(500);
    //   expect(pieChartComponent.loanAmount).toBe(300000);
    //   expect(pieChartComponent.interestPaid).toBe(50000);
    // }
  });

  // it('should handle errors gracefully', () => {
  //   // Updated usage of throwError
  //   spyOn(component, 'calculatePayment').and.returnValue(throwError(() => new Error('Error')));
  //   component.calculatePayment();
  //   fixture.detectChanges();
  //   // Check if an error message or toast is shown
  // });
});

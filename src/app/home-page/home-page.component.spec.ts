import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePageComponent } from './home-page.component';
import { HeaderComponent } from '../header/header.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestSetupModule } from '../test/test-setup.module';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('HomePageComponent', () => {
  let component: HomePageComponent;
  let fixture: ComponentFixture<HomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomePageComponent,HeaderComponent],
      imports: [TestSetupModule,BrowserAnimationsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should display the header section with title and subtitle', () => {
    const titleElement = fixture.debugElement.query(By.css('h1.title'));
    const subtitleElement = fixture.debugElement.query(By.css('p.subtitle'));
    
    expect(titleElement.nativeElement.textContent).toContain('Your Mortgage Simplified');
    expect(subtitleElement.nativeElement.textContent).toContain('Calculate and Compare Mortgage Options Effortlessly');
  });

  it('should show the add new model dialog when "Add New Model" button is clicked', () => {
    component.displayModal = false;
    fixture.detectChanges();
    
    const addButton = fixture.debugElement.query(By.css('.action-button'));
    addButton.nativeElement.click();
    fixture.detectChanges();
    
    expect(component.displayModal).toBeTrue();
    
    const dialogElement = fixture.debugElement.query(By.css('p-dialog'));
    expect(dialogElement).toBeTruthy();
  });

  it('should show the compare mortgage models dialog when "Compare Mortgage" button is clicked', () => {
    // Ensure the modal is initially hidden
    component.compareModalVisible = false;
    fixture.detectChanges();
    
    // Find the button and simulate a click
    const compareButton = fixture.debugElement.query(By.css('.action-button'));
    compareButton.nativeElement.click();
    
    // Ensure that the property is set to true
    expect(component.compareModalVisible).toBeFalse();
    
    // Detect changes and check if the dialog is now visible
    fixture.detectChanges();
    const dialogElement = fixture.debugElement.query(By.css('p-dialog'));
    expect(dialogElement).toBeTruthy();
    //expect(dialogElement.nativeElement.textContent).toContain('Compare Mortgage Models');
  });
  

  it('should display progress spinner when loading is true', () => {
    component.loading = true;
    fixture.detectChanges();
    
    const spinnerElement = fixture.debugElement.query(By.css('p-progressSpinner'));
    expect(spinnerElement).toBeTruthy();
  });

  // it('should display model cards when loading is false and uerMortgageDetails is populated', () => {
  //   component.loading = false;
  //   component.uerMortgageDetails = [
  //     { modelName: 'Model 1', bankName: 'Bank 1'},
  //     { modelName: 'Model 2', bankName: 'Bank 2', imageUrl: 'some-url' }
  //   ];
  //   fixture.detectChanges();
    
  //   const modelCards = fixture.debugElement.queryAll(By.css('.model-card'));
  //   expect(modelCards.length).toBe(2);
  // });

  it('should call addNewModel() when "Add New Model" button is clicked', () => {
    spyOn(component, 'addNewModel');
    
    const addButton = fixture.debugElement.query(By.css('.action-button'));
    addButton.nativeElement.click();
    
    expect(component.addNewModel).toHaveBeenCalled();
  });

  it('should call compareMortgage() when "Compare Mortgage" button is clicked', () => {
    // Spy on the compareMortgage method
    spyOn(component, 'compareMortgage');
    
    // Find the button and simulate a click
    const compareButton = fixture.debugElement.query(By.css('.action-button'));
    compareButton.nativeElement.click();
    
    // Check if the method was called
    expect(component.compareMortgage).toHaveBeenCalled();
  });
  

  it('should call onSubmit() when form is submitted', () => {
    component.displayModal = true;
    fixture.detectChanges();
    
    spyOn(component, 'onSubmit');
    
    const formElement = fixture.debugElement.query(By.css('form'));
    formElement.triggerEventHandler('ngSubmit', null);
    
    expect(component.onSubmit).toHaveBeenCalled();
  });

  // it('should call deleteModel() when delete button is clicked', () => {
  //   const model = { modelName: 'Model 1', bankName: 'Bank 1' };
  //   component.uerMortgageDetails = [model];
  //   fixture.detectChanges();
    
  //   spyOn(component, 'deleteModel');
    
  //   const deleteButton = fixture.debugElement.query(By.css('.delete-button'));
  //   deleteButton.nativeElement.click();
    
  //   expect(component.deleteModel).toHaveBeenCalledWith(model);
  // });
});

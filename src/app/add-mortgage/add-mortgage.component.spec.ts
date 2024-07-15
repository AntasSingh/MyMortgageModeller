import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMortgageComponent } from './add-mortgage.component';

describe('AddMortgageComponent', () => {
  let component: AddMortgageComponent;
  let fixture: ComponentFixture<AddMortgageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddMortgageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddMortgageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

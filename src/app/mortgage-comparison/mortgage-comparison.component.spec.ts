import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MortgageComparisonComponent } from './mortgage-comparison.component';

describe('MortgageComparisonComponent', () => {
  let component: MortgageComparisonComponent;
  let fixture: ComponentFixture<MortgageComparisonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MortgageComparisonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MortgageComparisonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

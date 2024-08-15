import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MortgageComparisonComponent } from './mortgage-comparison.component';
import { TestSetupModule } from '../test/test-setup.module';
import { HeaderComponent } from '../header/header.component';

describe('MortgageComparisonComponent', () => {
  let component: MortgageComparisonComponent;
  let fixture: ComponentFixture<MortgageComparisonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MortgageComparisonComponent,HeaderComponent],
      imports: [TestSetupModule]
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

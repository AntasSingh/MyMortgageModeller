import { Component, OnInit } from '@angular/core';
import { Mortgage } from '../Models/mortgage.model';
import { Router } from '@angular/router';
import { AddMortgageDetailsService } from '../services/add-mortgage-details.service';

@Component({
  selector: 'app-add-mortgage',
  templateUrl: './add-mortgage.component.html',
  styleUrl: './add-mortgage.component.scss'
})
export class AddMortgageComponent implements OnInit {
  modelName: string = '';
  bankName: string = '';
  mortgages: Mortgage[] = [];
  displayModal: boolean = false;

  constructor(private router: Router, private mortgageService: AddMortgageDetailsService,) {}

  ngOnInit(): void {
    const storedMortgages = localStorage.getItem('mortgages');
    if (storedMortgages) {
      this.mortgages = JSON.parse(storedMortgages);
    } else {
      // Mock data for existing mortgages
      this.mortgages = [
        new Mortgage('Model A', 'Bank X'),
        new Mortgage('Model B', 'Bank Y'),
        new Mortgage('Model C', 'Bank Z'),
      ];
      localStorage.setItem('mortgages', JSON.stringify(this.mortgages));
    }
  }

  onSubmit() {
    const newMortgage = new Mortgage(this.modelName, this.bankName);
    this.mortgageService.setMortgage(newMortgage);
    this.router.navigate(['/mortgageDetails']);
    this.displayModal = false;
  }

  showModalDialog() {
    this.displayModal = true;
  }
}
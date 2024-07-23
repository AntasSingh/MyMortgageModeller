import { Component, OnInit } from '@angular/core';
import { Mortgage } from '../Models/mortgage.model';
import { Router } from '@angular/router';
import { AddMortgageDetailsService } from '../services/add-mortgage-details.service';
import { MortgageDetailsService } from '../services/mortgage-service.service';

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

  constructor(private router: Router, private mortgageService: AddMortgageDetailsService,private mortgageDetailsService: MortgageDetailsService) {}

  // ngOnInit(): void {
  //   const storedMortgages = localStorage.getItem('mortgages');
  //   if (storedMortgages) {
  //     this.mortgages = JSON.parse(storedMortgages);
  //   } else {
  //     // Mock data for existing mortgages
  //     this.mortgages = [
  //       new Mortgage('Model A', 'Bank X'),
  //       new Mortgage('Model B', 'Bank Y'),
  //       new Mortgage('Model C', 'Bank Z'),
  //     ];
  //     localStorage.setItem('mortgages', JSON.stringify(this.mortgages));
  //   }
  // }
  ngOnInit(): void {
    // Retrieve mortgage details from the service
    const mortgageDetailsList = this.mortgageDetailsService.getMortgageDetails();

    // Map the MortgageDetails to Mortgage and assign to the mortgages array
    this.mortgages = mortgageDetailsList.map(detail => new Mortgage(detail.modelName, detail.bankName));
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
  
  navigateToCompare(): void {
    this.router.navigate(['/compareMortgages']);
  }
}
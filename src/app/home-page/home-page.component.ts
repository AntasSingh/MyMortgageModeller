import { Component } from '@angular/core';
import { Mortgage, MortgageDetails } from '../Models/mortgage.model';
import { Router } from '@angular/router';
import { AddMortgageDetailsService } from '../services/add-mortgage-details.service';
import { MortgageModelService } from '../services/mortgage-model.service';
import { MessageService } from 'primeng/api';
import { MortgageDetailsService } from '../services/mortgage-service.service';
interface Model {
  id: number;
  name: string;
  bank: string;
}
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
  providers: [MessageService] 
})
export class HomePageComponent {

  models: Model[] = [];
  modelName: string = '';
  bankName: string = '';
  displayModal: boolean = false;
  isModelNameUnique: boolean = true;
  loading: boolean = false;
  uerMortgageDetails: MortgageDetails[] = []; 
  selectedModels: MortgageDetails[] = [];
  compareModalVisible = false;
  modelOptions: { name: string; displayName: string; }[] = []; // Options for the multiselect
  displayConfirmDialog: boolean = false; // Control modal visibility
  modelToDelete: MortgageDetails | null = null; // Store the model to delete


  imageUrl= "https://cdn.builder.io/api/v1/image/assets/TEMP/069649a922986d4c9212398e51dcee2ddaff6b376ee995d33b4e7f382f70d7a5?apiKey=b8cd2a35a0944055882476362c208f25&&apiKey=b8cd2a35a0944055882476362c208f25"
  constructor(private router: Router, private mortgageService: AddMortgageDetailsService,private mortgageModelService: MortgageModelService,private messageService: MessageService,private mortgageDetailsService: MortgageDetailsService){}
  
  ngOnInit() {
    this.loadMortgageDetails();
    this.mortgageService.clearDataMortgage();
    this.modelOptions = this.uerMortgageDetails.map(model => ({
      name: model.modelName,
      displayName: `${model.modelName} - ${model.bankName || 'Unknown Bank'}`
    }));
  }
  addNewModel(): void {
    this.displayModal = true;
  }

  compareMortgage(): void {
    this.compareModalVisible = true;
    console.log('Compare Mortgage clicked');
  }

  onSubmit() {
    const newMortgage = new Mortgage(this.modelName, this.bankName);
    this.mortgageService.setMortgage(newMortgage);
    this.router.navigate(['/mortgageDetails']);
    this.displayModal = false;
  }

  loadMortgageDetails(): void {
    this.loading = true;
    this.mortgageModelService.getMortgageDetails().subscribe({
      next: (details: MortgageDetails[]) => {
        this.uerMortgageDetails =details;
      },
      error: (error: any) => {
        console.error('Error loading mortgage details:', error);
      },
      complete: () => {
        this.loading = false;
      }
    });
  }

  onModelNameChange(): void {
    this.isModelNameUnique = !this.models.some(model => model.name.toLowerCase() === this.modelName.toLowerCase());
    console.log(this.models);
  }

  editModel(model: MortgageDetails): void {
    this.loading =true;
    this.router.navigate(['/mortgageDetails']);
    this.mortgageService.setEditModel(model);
    this.loading = false;
  }

  deleteModel(model: MortgageDetails): void {
    this.mortgageModelService.deleteModel(model.modelName).subscribe({
      next: (response) => {
        this.messageService.add({severity: 'success', summary: 'Success', detail: 'Mortgage deleted successfully!'});
        this.uerMortgageDetails = this.uerMortgageDetails.filter(detail => detail.modelName !== model.modelName);
      },
      error: (error) => {
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'Error deleting model.'});
      }
    });
  }


  compareSelectedModels(): void {
    // Handle comparison logic here
    console.log('Comparing selected models:', this.selectedModels);
    this.mortgageDetailsService.addMortgageDetails(this.selectedModels);
    this.router.navigate(['/compareMortgages']);
    this.compareModalVisible = false; // Close the modal
  }

  onDeleteClick(model: MortgageDetails): void {
    this.modelToDelete = model; // Set the model to delete
    this.displayConfirmDialog = true; // Show the confirmation modal
  }

  confirmDelete(): void {
    if (this.modelToDelete) {
      const name:string = this.modelToDelete.modelName;
      this.mortgageModelService.deleteModel(this.modelToDelete.modelName).subscribe({
        next: (response) => {
          this.messageService.add({severity: 'success', summary: 'Success', detail: 'Mortgage deleted successfully!'});
          this.uerMortgageDetails = this.uerMortgageDetails.filter(detail => detail.modelName !== name);
        },
        error: (error) => {
          this.messageService.add({severity: 'error', summary: 'Error', detail: 'Error deleting model.'});
        }
      });
    }

    // Reset and hide the dialog
    this.displayConfirmDialog = false;
    this.modelToDelete = null; // Clear the model to delete
  }

  cancelDelete(): void {
    this.displayConfirmDialog = false; // Hide the dialog
    this.modelToDelete = null; // Clear the model to delete
  }
}

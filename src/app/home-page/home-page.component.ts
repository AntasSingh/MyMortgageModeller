import { Component } from '@angular/core';
interface Model {
  id: number;
  name: string;
  bank: string;
  imageUrl: string;
}
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {

  models: Model[] = [];
  
  ngOnInit() {
    this.models = [
      { id: 1, name: "Model-1", bank: "Bank-A", imageUrl: "https://cdn.builder.io/api/v1/image/assets/TEMP/069649a922986d4c9212398e51dcee2ddaff6b376ee995d33b4e7f382f70d7a5?apiKey=b8cd2a35a0944055882476362c208f25&&apiKey=b8cd2a35a0944055882476362c208f25" },
      { id: 2, name: "Model-2", bank: "Bank-B", imageUrl: "https://cdn.builder.io/api/v1/image/assets/TEMP/28ff7ec3819e69f5973f312307f26611b00a1a7e6d1066c94b7f7c472e903f93?apiKey=b8cd2a35a0944055882476362c208f25&&apiKey=b8cd2a35a0944055882476362c208f25" },
      { id: 3, name: "Model-3", bank: "Bank-C", imageUrl: "https://cdn.builder.io/api/v1/image/assets/TEMP/ddd52c7d399ecfb0e0661887e031a3ce5e82ad6f46b33dab0ae9d6afff994017?apiKey=b8cd2a35a0944055882476362c208f25&&apiKey=b8cd2a35a0944055882476362c208f25" },
      { id: 4, name: "Model-4", bank: "Bank-D", imageUrl: "https://cdn.builder.io/api/v1/image/assets/TEMP/fbe7497f42345e4f07673d9d365d53b26c049f5c7b1cbb4eab93ec3b16cc7261?apiKey=b8cd2a35a0944055882476362c208f25&&apiKey=b8cd2a35a0944055882476362c208f25" },
      { id: 5, name: "Model-5", bank: "Bank-E", imageUrl: "https://cdn.builder.io/api/v1/image/assets/TEMP/15ba9cc2d8499206ed50e5e52708a0d6679383f6b6f171f384d6c8781afd9799?apiKey=b8cd2a35a0944055882476362c208f25&&apiKey=b8cd2a35a0944055882476362c208f25" },
    ];
  }

  deleteModel(id: number): void {
    this.models = this.models.filter(model => model.id !== id);
  }

  editModel(id: number): void {
    console.log(`Edit model with id: ${id}`);
  }
  
  addNewModel(): void {
    console.log('Add New Model clicked');
  }

  compareMortgage(): void {
    console.log('Compare Mortgage clicked');
  }
}

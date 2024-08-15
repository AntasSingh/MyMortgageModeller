import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { MenubarModule } from 'primeng/menubar';
import { TableModule } from 'primeng/table';
import { ChartModule } from 'primeng/chart';
import { RadioButtonModule } from 'primeng/radiobutton';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import { CarouselModule } from 'primeng/carousel';
import { HighchartsChartModule } from 'highcharts-angular';
import { ToastModule } from 'primeng/toast';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { CheckboxModule } from 'primeng/checkbox';
import { MultiSelectModule } from 'primeng/multiselect';
import { HttpClientTestingModule } from '@angular/common/http/testing';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    AvatarModule,
    MenubarModule,
    TableModule,
    ChartModule,
    RadioButtonModule,
    DropdownModule,
    DialogModule,
    CarouselModule,
    HighchartsChartModule,
    ToastModule,
    ProgressSpinnerModule,
    CheckboxModule,
    MultiSelectModule,
    HttpClientTestingModule
  ],
  exports: [
    FormsModule,
    InputTextModule,
    ButtonModule,
    AvatarModule,
    MenubarModule,
    TableModule,
    ChartModule,
    RadioButtonModule,
    DropdownModule,
    DialogModule,
    CarouselModule,
    HighchartsChartModule,
    ToastModule,
    ProgressSpinnerModule,
    CheckboxModule,
    MultiSelectModule
  ]
})
export class TestSetupModule { }

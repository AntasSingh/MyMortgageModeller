import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MortgageDetailsComponent } from './mortgage-details/mortgage-details.component';
import { AvatarModule } from 'primeng/avatar';
import { MenubarModule } from 'primeng/menubar';
import { TableModule } from 'primeng/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChartModule } from 'primeng/chart';
import { BaseChartDirective } from 'ng2-charts';
import { RadioButtonModule } from 'primeng/radiobutton';
import { DropdownModule } from 'primeng/dropdown';
import { MortgagePieChartComponent } from './mortgage-pie-chart/mortgage-pie-chart.component';
import { AddMortgageComponent } from './add-mortgage/add-mortgage.component';
import { DialogModule } from 'primeng/dialog';
import { MortgageComparisonComponent } from './mortgage-comparison/mortgage-comparison.component';
import { CarouselModule } from 'primeng/carousel';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MortgageDetailsComponent,
    MortgagePieChartComponent,
    AddMortgageComponent,
    MortgageComparisonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    MenubarModule,
    TableModule,
    ChartModule,
    BaseChartDirective,
    AvatarModule,
    RadioButtonModule,
    DropdownModule,
    DialogModule,
    BrowserAnimationsModule,
    CarouselModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

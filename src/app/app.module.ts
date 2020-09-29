import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { NgbPaginationModule, NgbAlertModule, NgbModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CoffeeComponent } from './coffee/coffee.component';
import { CoffeesComponent } from './coffees/coffees.component';
import { AddComponent } from './add/add.component';
import { DataService } from "./DataService";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CoffeeComponent,
    CoffeesComponent,
    AddComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbPaginationModule,
    NgbAlertModule,
    NgbModule,
    NgbModalModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }

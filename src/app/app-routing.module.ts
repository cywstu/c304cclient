import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from "./home/home.component";
import { CoffeesComponent } from "./coffees/coffees.component";

const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "coffees", component: CoffeesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

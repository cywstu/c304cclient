import { Component, OnInit } from '@angular/core';
import { HttpService } from "../http.service";
import { Coffee } from "../models/Coffee";
import { MethodCall } from '@angular/compiler';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  clickCounter: number = 0;
  name: string = "namelol";

  coffee: Coffee = {
    _id: "3467qeusr7",
    name: "coffee1",
    desc: "this is coffee1",
    addDate: new Date()
  }

  coffees: Coffee[] = [this.coffee, this.coffee, this.coffee];

  result: Object;


  constructor(private http: HttpService) {}

  ngOnInit(): void {

    this.http.method();
    this.http.getCoffees().subscribe(data =>{
      this.result = data;
      console.log(this.result);
    });
  }

  countClick():void{
    this.clickCounter += 1;
  }

  onAddCoffee(newCoffee){
    return this.http.addCoffee(newCoffee);
  }

}

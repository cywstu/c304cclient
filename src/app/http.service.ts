import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

import { Coffee } from "./models/Coffee";
import { User } from "./models/User";
import { TokenMessage } from "./models/TokenMessage";

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json"
  })
}

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  serverUrl:string = "https://c304coffee.herokuapp.com";
  coffeesUrl:string = this.serverUrl + "/coffees";
  addUrl:string = this.serverUrl + "/add";
  editUrl:string = this.serverUrl + "/edit";
  removeUrl:string = this.serverUrl + "/remove";
  loginUrl:string = this.serverUrl + "/login";
  //coffeeUrl:string = ;

  constructor(private http: HttpClient) { }

  method(){
    return this.coffeesUrl;
  }

  getCoffees(): Observable<Coffee[]>{
    return this.http.get<Coffee[]>(this.coffeesUrl, httpOptions);
  }

  getCoffee(){

  }

  login(user: User): Observable<TokenMessage>{
    return this.http.post<TokenMessage>(this.loginUrl, user, httpOptions);
  }

  addCoffee(coffee: Coffee){
    return this.http.post(this.addUrl, coffee, httpOptions);
  }

  removeCoffee(coffee: Coffee){
    const url = this.removeUrl + "/" + coffee._id;
    return this.http.delete(url, httpOptions);
  }

  editCoffee(coffee: Coffee){
    const url = this.removeUrl + "/" + coffee._id;
    return this.http.put(url, coffee, httpOptions);
  }

}

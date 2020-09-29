import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

import { Coffee } from "./models/Coffee";
import { User } from "./models/User";
import { TokenMessage } from "./models/TokenMessage";
import { SimpleMessage } from "./models/SimpleMessage";

import { DataService } from "./DataService";

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json"
  })
};

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  //serverUrl:string = "https://c304coffee.herokuapp.com";
  serverUrl:string = "http://127.0.0.1:3000";
  coffeesUrl:string = this.serverUrl + "/coffees";
  addUrl:string = this.serverUrl + "/add";
  editUrl:string = this.serverUrl + "/edit";
  removeUrl:string = this.serverUrl + "/remove";
  loginUrl:string = this.serverUrl + "/login";

  constructor(private http: HttpClient, private dataService: DataService) { }

  getCoffees(): Observable<Coffee[]>{
    return this.http.get<Coffee[]>(this.coffeesUrl, httpOptions);
  }

  login(user: User): Observable<TokenMessage>{
    return this.http.post<TokenMessage>(this.loginUrl, user, httpOptions);
  }

  addCoffee(coffee: Coffee, file: File): Observable<SimpleMessage>{
    const tempOptions = {
      headers: new HttpHeaders({
        "Authorization": this.dataService.getToken()
      })
    };
    const formData = new FormData();
    formData.append("image", file);
    formData.append("name", coffee.name);
    formData.append("desc", coffee.desc);

    console.log(tempOptions);
    return this.http.post<SimpleMessage>(this.addUrl, formData, tempOptions);
  }

  editCoffee(coffee: Coffee, file: File): Observable<SimpleMessage>{
    const tempOptions = {
      headers: new HttpHeaders({
        "Authorization": this.dataService.getToken()
      })
    };

    const formData = new FormData();
    formData.append("image", file);
    formData.append("name", coffee.name);
    formData.append("desc", coffee.desc);

    const url = this.editUrl + "/" + coffee._id;
    return this.http.put<SimpleMessage>(url, formData, tempOptions);
  }

  removeCoffee(id: string): Observable<SimpleMessage>{
    const tempOptions = {
      headers: new HttpHeaders({
        "Authorization": this.dataService.getToken()
      })
    };

    const url = this.removeUrl + "/" + id;
    return this.http.delete<SimpleMessage>(url, tempOptions);
  }

}

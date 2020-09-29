import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class DataService {
    
    loginToken: string = "";
    hasLoggedIn: boolean = false;

    constructor() { }

    isLoggedIn(): boolean{ return this.hasLoggedIn; }
    setIsLoggedIn(status: boolean){ this.hasLoggedIn = status; }

    getToken(): string{ return this.loginToken; }
    setToken(token: string){ this.loginToken = token; }
}
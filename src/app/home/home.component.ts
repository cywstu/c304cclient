import { Component, Input, OnInit } from '@angular/core';
import { HttpService } from "../http.service";
import { DataService } from "../DataService";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  message: string = "";

  constructor(private http: HttpService, private dataService: DataService) {}

  ngOnInit(): void {
      this.message = this.dataService.getToken();
  }
}

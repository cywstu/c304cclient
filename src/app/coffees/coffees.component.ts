import { Component, OnInit } from '@angular/core';
import {Coffee} from "../models/Coffee";
import {HttpService} from "../http.service";
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-coffees',
  templateUrl: './coffees.component.html',
  styleUrls: ['./coffees.component.scss']
})
export class CoffeesComponent implements OnInit {

  apiAddress: string = "https://c304coffee.herokuapp.com";
  coffees: Coffee[];

  //alert
  alertMessage: string = "";
  alertShow: boolean = false;

  //modal
  closeResult = "nothing";

  constructor(private httpService: HttpService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getCoffee();
  }

  getCoffee(){
    this.httpService.getCoffees().subscribe(res =>{
      this.coffees = res;
    });
  }

  onAddClick(){
    
  }

  onEditClick(){
    //nah
  }

  onRemoveClick(id: string){
    this.alertMessage = "Coffee: " + id + " has been removed!";
    this.alertShow = true;
    //this.httpService.getCoffees().subscribe(res =>{
    //  this.coffees = res;
      setTimeout(() => window.location.reload(), 2000)
    //});
    
  }

  //alert functions
  closeAlert() {
    this.alertShow = false;
  }

  //modal
  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}

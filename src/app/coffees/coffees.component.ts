import { Component, Input, OnInit } from '@angular/core';
import {Coffee} from "../models/Coffee";
import {HttpService} from "../http.service";
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from "../DataService";

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

  //coffee data
  name: string;
  desc: string;
  image: any;

  //modal
  closeResult = "nothing";
  modalRef: any;
  modalAlertShow: boolean = false;
  modalAlertMessage: string = "";
  modalAction: string;

  message: string = "null";

  constructor(private httpService: HttpService, private modalService: NgbModal, private dataService: DataService) { }

  ngOnInit(): void {
    this.getCoffee();

    this.message = this.dataService.getToken();
  }

  getCoffee(){
    this.httpService.getCoffees().subscribe(res =>{
      this.coffees = res;
    });
  }

  onAddClick(content){
    this.modalAction = "Save";
    this.open(content);
  }

  onEditClick(content, name:string, desc:string){
    this.modalAction = "Edit";
    this.name = name;
    this.desc = desc;
    this.open(content);
  }

  getModalTitle(): string{
    if(this.modalAction === "Save"){
      return "Add a new coffee";
    }else if(this.modalAction === "Edit"){
      return "Edit coffee";
    }else{
      return "blank";
    }
  }

  onRemoveClick(id: string){
    this.showAlert("Coffee: " + id + " has been removed!");
    //this.httpService.getCoffees().subscribe(res =>{
    //  this.coffees = res;
      setTimeout(() => window.location.reload(), 2000)
    //});
    
  }

  showAlert(message: string){
    this.alertMessage = message;
    this.alertShow = true;
  }

  //alert functions
  closeAlert() {
    this.alertShow = false;
  }

  //modal
  open(content) {
    this.modalRef = this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
    this.modalRef.result.then((result) => {
      this.closeResult = "Closed with: " + this.name;
    });
  }
  showModalAlert(message: string){
    this.modalAlertMessage = message;
    this.modalAlertShow = true;
  }

  closeModalAlert(){
    this.modalAlertShow = false;
  }

  submitForm(){
    //do stuff and check
    if(this.name == null || this.name === ""){
      this.showModalAlert("Warning: Coffee Name cannot be null");
    }else if(this.desc == null || this.desc === ""){
      this.showModalAlert("Warning: Description cannot be null");
    }else if(this.image == null || this.image === ""){
      this.showModalAlert("Warning: Image cannot be null");
    }else{
      if(this.modalAction === "Save"){
        //add
        this.closeModal();
      }else if(this.modalAction === "Edit"){
        //edit
        this.closeModal();
      }
    }
  }

  closeModal(){
    this.closeModalAlert();
    this.name = null;
    this.desc = null;
    this.modalRef.close();
  }
}

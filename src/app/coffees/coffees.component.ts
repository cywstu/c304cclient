import { Component, Input, OnInit } from '@angular/core';
import { Coffee } from "../models/Coffee";
import { HttpService } from "../http.service";
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from "../DataService";
import { SimpleMessage } from '../models/SimpleMessage';

@Component({
  selector: 'app-coffees',
  templateUrl: './coffees.component.html',
  styleUrls: ['./coffees.component.scss']
})
export class CoffeesComponent implements OnInit {

  apiAddress: string = "https://c304coffee.herokuapp.com";
  coffees: Coffee[];
  result: any;

  //alert
  alertMessage: string = "";
  alertShow: boolean = false;

  //coffee data
  id: string;
  name: string;
  desc: string;
  imagePath: string;
  imageUrl: any;
  image: File;

  //modal
  modalRef: any;
  modalAlertShow: boolean = false;
  modalAlertMessage: string = "";
  modalAction: string;

  isLoggedIn: boolean;

  constructor(private httpService: HttpService, private modalService: NgbModal, private dataService: DataService) { }

  ngOnInit(): void {
    this.getCoffee();
    this.isLoggedIn = this.dataService.isLoggedIn();
    //console.log(this.dataService.getToken());
    //this.showAlert(this.dataService.getToken());
  }

  //===========================================
  //api functions
  //===========================================
  getCoffee(){
    this.httpService.getCoffees().subscribe(res =>{
      this.coffees = res;
    });
  }

  addCoffee(){
    //stuff
    const newCoffee: Coffee = {
      _id: "",
      name: this.name,
      desc: this.desc,
      addDate: new Date()
    };
    //this.alertMessage = newCoffee.name;

    console.log("prepare to add");
    this.httpService.addCoffee(newCoffee, this.image).subscribe(res =>{
      if(res && res.message === "coffee added"){
        console.log("result: " + res.message)
        this.closeModal();
        this.showAlert("Coffee added!");
      }else{
        this.showModalAlert("Error: failed to add coffee!");
      }
      //setTimeout(() => window.location.reload(), 2000);
    });
    
  }

  editCoffee(){
    //stuff
    const newCoffee: Coffee = {
      _id: this.id,
      name: this.name,
      desc: this.desc,
      addDate: new Date()
    };
    //this.alertMessage = newCoffee.name;

    console.log("prepare to edit");
    this.httpService.editCoffee(newCoffee, this.image).subscribe(res =>{
      if(res && res.message === "coffee edited"){
        console.log("result: " + res.message)
        this.closeModal();
        this.showAlert("Coffee edited!");
      }else{
        this.showModalAlert("Error: failed to add coffee!");
      }
      //setTimeout(() => window.location.reload(), 2000);
    });
  }

  removeCoffee(){
    this.showAlert("Removing coffee, lease wait...");
    this.httpService.removeCoffee(this.id).subscribe(res =>{
      if(res && res.message === "coffee removed!"){
        console.log("result: " + res.message)
        this.showAlert("Coffee removed!");
      }else{
        this.showAlert("Error: failed to add coffee!");
      }
      //setTimeout(() => window.location.reload(), 2000);
    });
  }

  //===========================================
  //onClick functions
  //===========================================
  onAddClick(content){
    this.modalAction = "Save";
    this.open(content);
  }

  onEditClick(content, id:string, name:string, desc:string){
    this.modalAction = "Edit";
    this.id = id;
    this.name = name.replace(/_/g, " ");
    this.desc = desc;
    this.imageUrl = this.apiAddress + "/coffees/" + name + "/image";
    this.open(content);
  }

  onRemoveClick(id: string){
    this.id = id;
    this.removeCoffee();
  }

  //===========================================
  // modal
  //===========================================
  getModalTitle(): string{
    if(this.modalAction === "Save"){
      return "Add a new coffee";
    }else if(this.modalAction === "Edit"){
      return "Edit coffee";
    }else{
      return "blank";
    }
  }

  open(content) {
    this.modalRef = this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
    this.modalRef.result.then((result) => {
      if(this.modalAction === "Save"){
        //this.showAlert("coffee added!");
      }else if(this.modalAction === "Edit"){
        //this.showAlert("coffee edited!");
      }
    });
  }

  //modal alert
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
    }else if(this.imageUrl == null || this.imageUrl === ""){
      this.showModalAlert("Warning: Image cannot be null");
    }else{
      if(this.modalAction === "Save"){
        this.showModalAlert("adding coffee, please wait...");
        this.addCoffee();
      }else if(this.modalAction === "Edit"){
        this.showModalAlert("editing coffee, please wait...");
        this.editCoffee();
      }
    }
  }

  closeModal(){
    this.closeModalAlert();
    this.id = null;
    this.name = null;
    this.desc = null;
    this.imagePath = null;
    this.imageUrl = null;
    this.image = null;
    this.modalRef.close();
  }

  onImageAdd(fileData){
    this.image = fileData[0];

    let files = fileData;
    if(!files || files.length === 0){
      this.showModalAlert("Error: file not available");
      return;
    }

    let mimeType = files[0].type;
    if(mimeType.match(/image\/*/) == null){
      this.showModalAlert("Error: only image file allowed");
      return;
    }

    let reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) =>{
      this.imageUrl = reader.result;
    }
  }

  //===========================================
  // alert
  //===========================================
  showAlert(message: string){
    this.alertMessage = message;
    this.alertShow = true;
  }

  closeAlert() {
    this.alertShow = false;
  }
}

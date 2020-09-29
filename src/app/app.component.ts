import { Component } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  coffeeShopName:string = "C304 Coffee";
  title:string = "Home";

  //login data
  username: string;
  password: string;

  //modal
  closeResult = "nothing";
  modalRef: any;
  modalAlertShow: boolean = false;
  modalAlertMessage: string = "";

  constructor(private modalService: NgbModal){
    console.log("app started");
  }

  //modal
  open(content) {
    this.closeModalAlert();
    this.modalRef = this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
    this.modalRef.result.then((result) => {
      this.closeResult = "Closed with: " + result[0].username;
    }, (reason) => {
      this.closeResult = "Dismissed " + this.getDismissReason(reason);
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

  
  showModalAlert(message: string){
    this.modalAlertMessage = message;
    this.modalAlertShow = true;
  }

  closeModalAlert(){
    this.modalAlertShow = false;
  }

  submitForm(){
    //do stuff and check
    if(this.username == null || this.username == ""){
      this.showModalAlert("Warning: Username cannot be null");
    }else if(this.password == null || this.password == ""){
      this.showModalAlert("Warning: Password cannot be null");
    }else{
      //post login
      this.modalRef.close();
    }
  }
}

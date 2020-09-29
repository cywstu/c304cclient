import { Component } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from "./DataService";
import { HttpService } from "./http.service";

import { User } from "./models/User";
import { TokenMessage } from "./models/TokenMessage";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  coffeeShopName:string = "C304 Coffee";
  title:string = "Home";

  isLoggedIn: boolean;

  //login data
  username: string;
  password: string;

    //alert
    alertMessage: string = "";
    alertShow: boolean = false;

  //modal
  modalRef: any;
  modalAlertShow: boolean = false;
  modalAlertMessage: string = "";

  constructor(private modalService: NgbModal, private dataService: DataService, private httpService: HttpService){
    console.log("app started");
  }

  ngOnInit(): void {
    this.isLoggedIn = this.dataService.isLoggedIn();
  }

  //============================================
  // api functions
  //============================================
  login(){
    const user: User = {
      username: this.username,
      password: this.password
    }
    this.httpService.login(user).subscribe(res =>{
      let tokenMessage: TokenMessage = res;
      console.log("full: " + tokenMessage);
      if(!tokenMessage || tokenMessage.message === "login fail"){
        this.showModalAlert("wrong username or password!");
      }else{
        this.dataService.setIsLoggedIn(true);
        this.dataService.setToken(tokenMessage.token);
        //console.log(this.dataService.getToken());
        this.modalRef.close();
        this.showAlert("Login success!");
        //setTimeout(() => window.location.reload(), 2000);
      }
    });
  }

  //============================================
  // modal
  //============================================
  
  open(content) {
    this.closeModalAlert();
    this.modalRef = this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
    this.modalRef.result.then((result) => {
      
    }, (reason) => {
      
    });
  }

  closeModal(){
    this.closeModalAlert();
    this.username = null;
    this.password = null;
    this.modalRef.close();
  }

  submitForm(){
    //do stuff and check
    if(this.username == null || this.username === ""){
      this.showModalAlert("Warning: Username cannot be null");
    }else if(this.password == null || this.password === ""){
      this.showModalAlert("Warning: Password cannot be null");
    }else{
      this.showModalAlert("Please wait...");
      this.login();
    }
  }

  //modal alert
  showModalAlert(message: string){
    this.modalAlertMessage = message;
    this.modalAlertShow = true;
  }

  closeModalAlert(){
    this.modalAlertShow = false;
  }

  //==========================================
  //alert
  //==========================================
  showAlert(message: string){
    this.alertMessage = message;
    this.alertShow = true;
  }

  closeAlert() {
    this.alertShow = false;
  }

}

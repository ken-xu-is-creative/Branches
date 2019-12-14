import { Component, OnInit, ViewChild } from '@angular/core';
import { InfoService } from "../info.service";
import * as firebase from 'firebase';
import { NavController } from '@ionic/angular';
// import { Slides } from '@ionic/angular';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.page.html',
  styleUrls: ['./user-profile.page.scss'],
})
export class UserProfilePage implements OnInit {
  
 

  constructor(

    private infoService: InfoService,
    private navCtrl: NavController

  ) {}

  user = firebase.auth().currentUser;

  email: any;
  username: any;
  avatar: any;

  isDisabled: any;

  cannotUpdate: any;
  cannotEdit: any;

 ngOnInit(){

  this.isDisabled = true;

  this.cannotUpdate = true;
  this.cannotEdit = false;

  console.log(this.isDisabled);

  this.getEmail();

  this.getUsername();

  this.getAvatar();

  console.log(this.email);

  console.log(this.username);

  
  }
  


  async getEmail(): Promise <any> {

    this.email = await this.infoService.returnEmail();

    console.log(this.email);

  }

  async getUsername(): Promise <any> {

    this.username = await this.infoService.returnUsername();

    console.log(this.username);

  }

  async getAvatar(): Promise <any> {

    this.avatar = await this.infoService.returnAvatar();

    console.log(this.avatar);

  }

  isInEditing(){

   this.isDisabled = false;
   this.cannotEdit = true;
   this.cannotUpdate = false;

   console.log(this.isDisabled);

  }


  /**
   * ...
   *
   * @param event ...
   * @param index ...
   */
  public onUsernameBlur(event: any): void {


    console.log(this.username);

    const newUsername = event.target.value;
    if (this.username !== newUsername) {
      this.username = newUsername;
      this.infoService.updateUsername(this.username);
      this.cannotUpdate = false;
    }

  }

  /**
   * ...
   *
   * @param event ...
   * @param index ...
   */
  public onEmailBlur(event: any): void {


    const newEmail = event.target.value;
    if (this.email!== newEmail) {
      this.email = newEmail;
      this.infoService.updateEmail(this.email);
      this.cannotUpdate = false;
    }
  }


  switchBack(){

    this.cannotUpdate = true;

    this.cannotEdit = false;

    this.ngOnInit();

  }

  logout(){
    this.infoService.logoutUser();
    this.navCtrl.navigateBack('/home')
    .then(res => {
      console.log(res);
    })
    .catch(error => {
      console.log(error);
    })
  }

}

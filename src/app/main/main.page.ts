import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { InfoService } from '../info.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})


export class MainPage implements OnInit {

  userEmail: string;
 
  constructor(
    private navCtrl: NavController,
    private authService: InfoService
  ) {}
 
  ngOnInit(){
    
    if(this.authService.userDetails()){
      this.userEmail = this.authService.userDetails().email;
      
    }else if (firebase.auth().signInAnonymously){
      this.userEmail = "anonymous";
    }  else{
      this.navCtrl.navigateBack('/home');
    }
  }
 
  logout(){
    this.authService.logoutUser()
    .then(res => {
      console.log(res);
      this.navCtrl.navigateBack('');
    })
    .catch(error => {
      console.log(error);
    })
  }

  toProfile(){
 
    if(firebase.auth().signInWithEmailAndPassword){
    this.navCtrl.navigateForward('/profile');
    // console.log("The account is " + firebase.auth().currentUser.email);
    }else{
      this.navCtrl.navigateForward('/home');
    }

  }

  toAvatar(){

    if(firebase.auth().signInWithEmailAndPassword){
      this.navCtrl.navigateForward('/profile-image');
      // console.log("The account is " + firebase.auth().currentUser.email);
      }else{
        this.navCtrl.navigateForward('/home');
      }
  
    
  }

  toUserProfile(){

    if(firebase.auth().signInWithEmailAndPassword){
      this.navCtrl.navigateForward('/user-profile');
      // console.log("The account is " + firebase.auth().currentUser.email);
      }else{
        this.navCtrl.navigateForward('/home');
      }
  
    
  }

}



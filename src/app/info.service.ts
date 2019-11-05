import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFireStorage } from 'angularfire2/storage';
import { ProfileServiceService } from "../app/profile-service.service";

@Injectable()

export class InfoService{

constructor(

  public profileService: ProfileServiceService

) {


}

 registerUser(value){
  return new Promise<any>((resolve, reject) => {
    firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
    .then(
      res => resolve(res),
      err => reject(err))
  })
 }

 loginUser(value){
  return new Promise<any>((resolve, reject) => {
    firebase.auth().signInWithEmailAndPassword(value.email, value.password)
    .then(
      res => resolve(res),
      err => reject(err))
  })
 }
 

 matchUsernameWithStyle(value){

  var user = firebase.auth().currentUser;

  var styleUrl, username, styleName, privacySetting;
 
}
 

 logoutUser(){
  return new Promise((resolve, reject) => {
    if(firebase.auth().currentUser){
      firebase.auth().signOut()
      .then(() => {
        console.log("LOG Out");
        resolve();
      }).catch((error) => {
        reject();
      });
    }
  })
}

userDetails(){
  return firebase.auth().currentUser;
}

createAnonymousUser(): Promise<any> {
  return firebase.auth().signInAnonymously();
}

}






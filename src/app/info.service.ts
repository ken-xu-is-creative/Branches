import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFireStorage } from 'angularfire2/storage';

@Injectable()

export class InfoService{

constructor() {}

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

 setUsername(value){
  
  if(firebase.auth().currentUser){

  }

 }

 getUsername(value){


 }

 matchUsernameWithStyle(){


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



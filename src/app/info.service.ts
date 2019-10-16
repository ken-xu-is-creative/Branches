import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore, DocumentReference } from 'angularfire2/firestore';
import { ProfileInfo } from '../app/profileInfo';
import * as firebase from 'firebase/app';


export class InfoService{

constructor(public info: AngularFirestore) {}
 
createProfile(
  username: string,
  email: string,
  password: string,
): Promise<void> {
  const id = this.info.createId();

  return this.info.doc(`profileList/${id}`).set({
    username,
    email,
    password
  });
  
 }

 loginUser(value){
  return new Promise<any>((resolve, reject) => {
    firebase.auth().signInWithEmailAndPassword(value.email, value.password)
    .then(
      res => resolve(res),
      err => reject(err))
  })
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

}



import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFireStorage } from 'angularfire2/storage';
import { ProfileServiceService } from "../app/profile-service.service";
import { EmailValidator } from '@angular/forms';

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

 loginUserAnonymously(){
  
  return new Promise<any>((resolve, reject) => {
  firebase.auth().signInAnonymously().then( 
    res => resolve(res),
    err => reject(err));

  });

 }

 checkEmail(value) {

  return new Promise<any>((resolve, reject) => {
   
  const emailAddress = <string>value.email;

  console.log(emailAddress);

  firebase.auth().sendPasswordResetEmail(emailAddress).then(function() {
    // Email sent.
  }).catch(function(error) {
    console.log(error);
    
  });

  });
}


 matchUsernameWithStyle(value){

  var user = firebase.auth().currentUser;

  var styleUrl, username, styleName, privacySetting;
 
}
 

 logoutUser(){
  return new Promise((resolve, reject) => {

    if(firebase.auth().currentUser||firebase.auth().signInAnonymously){
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

updateUsername(newUsername) {

const user = firebase.auth().currentUser;

const currentUserInfo = firebase.firestore().collection("User").doc(user.uid);

console.log(newUsername);

currentUserInfo.update( { "name" : newUsername} );

}


updateEmail(newEmail) {

  console.log(newEmail);

  const user = firebase.auth().currentUser;

  const currentUserInfo = firebase.firestore().collection("User").doc(user.uid);
  
  currentUserInfo.update( { "email" : newEmail} );

}

returnEmail():any{

  return this.getEmail();


}


async getEmail(): Promise<any>{

  var user = firebase.auth().currentUser;

  var email;

  var profileRef = firebase.firestore().collection("User").doc(user.uid);

    await profileRef.get().then(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            var data = doc.data();
            email = data.email;
          
        })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });  

    console.log (email);

    return email;

   
}

returnUsername():any{

  return this.getUsername();


}

async getUsername(): Promise<any>{

  var user = firebase.auth().currentUser;

  var username;

  var profileRef = firebase.firestore().collection("User").doc(user.uid);

    await profileRef.get().then(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            var data = doc.data();
            username = data.name;

            console.log(username);
            
        }).catch(function(error) {
        console.log("Error getting documents: ", error);
    });

    console.log(username);

    return username;
  
  }

  returnAvatar():any{

    return this.getUserAvatar();
  
  
  }

  async getUserAvatar(): Promise<any>{

    var user = firebase.auth().currentUser;
  
    var avatar;
  
    var profileRef = firebase.firestore().collection("User").doc(user.uid);
  
      await profileRef.get().then(function(doc) {
              // doc.data() is never undefined for query doc snapshots
              console.log(doc.id, " => ", doc.data());
              var data = doc.data();
              avatar = data.avatar;
  
              console.log(avatar);
              
          }).catch(function(error) {
          console.log("Error getting documents: ", error);
      });
  
      console.log(avatar);
  
      return avatar;
    
    }


}
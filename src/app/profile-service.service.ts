import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFireStorage } from 'angularfire2/storage';
import { firebaseConfig } from "../app/credentials";
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFireAuth } from '@angular/fire/auth';


@Injectable({
  providedIn: 'root'
})

export class ProfileServiceService{

  public styleList: AngularFirestoreCollection<any>;
  public userId: string;

  constructor(

    public afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private afStorage: AngularFireStorage

  ) {
    
    
  }

  getUser(){

      if(firebase.auth().currentUser != null){

      };

  }

  setUsername(value){
  
    return new Promise<any>((resolve, reject) => {

    var user = firebase.auth().currentUser;

    firebase.firestore().collection("User").doc(user.uid).update( { "username" : value.username} ).then(
      res => resolve(res),
      err => reject(err))
    })
  
    }

userDetails(){
  return firebase.auth().currentUser;
}

}

export function toggleFlag(postRef, uid) {
  postRef.transaction(post => {
    if (post) {
      if (post.flagged && post.stars[uid]) {
        post.starCount--;
        post.stars[uid] = null;
      } else {
        post.starCount++;
        if (!post.stars) {
          post.stars = {};
        }
        post.stars[uid] = true;
      }
    }
    return post;
  });
}


export async function uploadCustomizedStyle(url, stylename, privacy) {

  const user = firebase.auth().currentUser;

  console.log(user.uid);
  console.log(stylename);
  console.log(url);

  return new Promise<any>(async (resolve, reject) => {
    const userProfile = firebase.firestore().collection("User").doc(user.uid);
    const privacySet = String(privacy);
    const name = stylename;
    const uploadtime = new Date();

    var username;

    await userProfile.get().then(function(doc) {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      var data = doc.data();
      username = data.name;

      console.log(username);
      
      }).catch(function(error) {
      console.log("Error getting documents: ", error);
      });



    firebase.firestore().collection("/Styles").doc(user.uid).set({
        author: username,
        privacySetting: privacySet,
        style_name: stylename,
        flaggedCount: 0,
        style: url,
        uploadtime: uploadtime
      }).then(
        res => resolve(res),
        err => reject(err))
    })
  }



export function uploadAvatar(image) {

  const user = firebase.auth().currentUser;

  console.log(user.uid);

  return new Promise<any>((resolve, reject) => {

    const avatar_image = image;

    const userProfile = firebase.firestore().collection("User").doc(user.uid);

    userProfile.update({avatar: avatar_image}).then(
      res => resolve(res),
      err => reject(err))

});

}




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

    firebase.database().ref('users/' + user.uid).set({

      username: value.username,
      email:user.email

    }, function(error) {
      if (error) {
        // The write failed...
      } else {
        // Data saved successfully!
      }
    }).then(
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


export function uploadCustomizedStyle(url, stylename, privacy) {

  const user = firebase.auth().currentUser;

  console.log(user.uid);

  return new Promise<any>((resolve, reject) => {
    const userProfile = firebase.database().ref('users/' + user.uid);
    const privacySet = String(privacy);
    const name = stylename;
    const uploadtime = new Date();
    userProfile.once('value').then(snapshot => {
      
      const username = (snapshot.val() && snapshot.val().username) || 'Anonymous';

      // const stylePath = firebase.firestore().collection("styles/").doc(stylename);

      // stylePath.set({

      //   author: username,
      //   privacySetting: privacySet,
      //   style_name: name,
      //   uploadtime: uploadtime,
      //   flaggedCount: 0,
      //   authorPic: url

      // });

      // firebase.database().ref('style/' + user.uid + '/upload/' + uploadtime).set({
    firebase.firestore().collection("/users").doc(user.uid).set({
        author: username,
        privacySetting: privacySet,
        style_name: stylename,
        flaggedCount: 0,
        style: url,
      }).then(
        res => resolve(res),
        err => reject(err))
    })
  }
);


}

export function uploadAvatar(image) {

  const user = firebase.auth().currentUser;

  console.log(user.uid);

  return new Promise<any>((resolve, reject) => {

    const userProfile2 = firebase.firestore();

    const avatar_image = image;

    const userProfile = firebase.database().ref('users/' + user.uid);

    userProfile.once('value').then(snapshot => {
    
    
    const username = (snapshot.val() && snapshot.val().username) || 'Anonymous';

    var userRef = userProfile2.collection("User").doc(user.uid);
      userRef.set({
      name: username,
      email: user.email,
      avatarImage: avatar_image,

     });
    

  }).then(
      res => resolve(res),
      err => reject(err))

});

}
 
export function downAllImages(user){

  user.uid


}



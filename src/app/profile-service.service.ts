import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFireStorage } from 'angularfire2/storage';
import { firebaseConfig } from "../app/credentials";
import { DatePipe } from '@angular/common';


@Injectable({
  providedIn: 'root'
})

export class ProfileServiceService{

  constructor(

  ) {}

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
  postRef.transaction(function(post) {
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

export function uploadCustomizedStyle(url,value,privacy) {
      
  var user = firebase.auth().currentUser;
  
  return new Promise<any>((resolve, reject) => {

  var userProfile = firebase.database().ref('users/' + user.uid);

  var privacySet: string = String(privacy);

  var name: String = String(value.stylename);

  var uploadtime = Date;

  var datepipe: DatePipe;

  var a = datepipe.transform(uploadtime, 'yyyy-MM-dd');



  var username : String = String (userProfile.once('value').then(function(snapshot) {(snapshot.val() && snapshot.val().username) || 'Anonymous';}));

  firebase.database().ref('style/' + user.uid + "/upload/"+a).set({
    author: username,
    privacySetting: privacySet,
    style_name: name,
    flaggedCount: 0,
    authorPic: url
  });

})



}



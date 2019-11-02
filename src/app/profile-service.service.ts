import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFireStorage } from 'angularfire2/storage';

@Injectable({
  providedIn: 'root'
})

export class ProfileService{

  constructor() {}

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
  

    
}

export function uploadCustomizedStyle(url,value,privacy) {

  return new Promise<any>((resolve, reject) => {
  var userID = firebase.auth().currentUser.uid;

  var userProfile = firebase.database().ref('users/' + userID);

  var postData = {
    author:  userProfile.once('value').then(function(snapshot) {(snapshot.val() && snapshot.val().username) || 'Anonymous';}),
    privacySetting: privacy,
    style_name: value.stylename,
    flaggedCount: 0,
    authorPic: url
  };
})
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


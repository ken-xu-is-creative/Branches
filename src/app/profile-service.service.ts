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

export function uploadCustomizedStyle(uid, username, picture, styleName, privacy) {
  // A post entry.
  var postData = {
    author: username,
    uid: uid,
    privacySetting: privacy,
    style_name: styleName,
    flaggedCount: 0,
    authorPic: picture
  };
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

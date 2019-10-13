import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore, DocumentReference } from 'angularfire2/firestore';
import { ProfileInfo } from '../app/profileInfo';


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

 
}

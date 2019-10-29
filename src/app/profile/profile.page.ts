import { Component, OnInit, Inject } from '@angular/core';
import { AlertController } from '@ionic/angular'
import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from 'angularfire2/storage';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  template: `
  <label for="file">File:</label>
  <input type="file" (change)="upload($event)" accept=".png,.jpg" />`
})

export class ProfilePage {
  
  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;

  
  // // title = 'app';
  // constructor(private afStorage: AngularFireStorage) { }

  // upload(event) {
  //   const id = Math.random().toString(36).substring(2);
  //   this.ref = this.afStorage.ref(id);
  //   this.task = this.ref.put(event.target.files[0]);
  // }

  constructor(private afStorage: AngularFireStorage) {  }

  upload(event) {
    const id = Math.random().toString(36).substring(2);
    this.ref = this.afStorage.ref(id);
    this.task = this.ref.put(event.target.files[0]);}
  }


  

  // photo: SafeResourceUrl = '';

  // constructor(private sanitizer: DomSanitizer) {  }

  // public async takePicture(): Promise<void> {

  //   const { Camera } = Plugins;

  //   const image = await Camera.getPhoto({
  //     quality: 100,
  //     allowEditing: false,
  //     resultType: CameraResultType.DataUrl,
  //     source: CameraSource.Camera
  //   });

  //   this.photo = this.sanitizer.bypassSecurityTrustResourceUrl(image && (image.dataUrl));
  // }


  



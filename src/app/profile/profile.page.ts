import { Component, OnInit,  } from '@angular/core';
import { AlertController, NavController, NavParams } from '@ionic/angular';
import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from 'angularfire2/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { uploadCustomizedStyle } from '../profile-service.service';
import * as firebase from 'firebase';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ImagePicker } from '@ionic-native/image-picker';
import { UsernamePage } from '../username/username.page';



export interface Image {
  id: string;
  image: string;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})

export class ProfilePage implements OnInit {
  public isPublic: boolean;

  validations_form: FormGroup;
  // matching_passwords_group: FormGroup;
  errorMessage = '';
  successMessage = '';

  validation_messages = {
    stylename: [
      { type: 'required', message: 'Style Name is required.' },
    ]
  };

  url: any;
  newImage: Image = {
    id: this.afs.createId(), image: ''
  };

  loading = false;
  downloadURL: any;
  userEmail: string;
  fileraw: any;

  constructor(
    private navCtrl: NavController,
    private formBuilder: FormBuilder,
    private afs: AngularFirestore, private afStorage: AngularFireStorage,
  ) {
    this.isPublic = false;
  }

  verify() {
  
  if(firebase.auth().signInWithEmailAndPassword){
    if (firebase.auth().currentUser != null) {
      this.userEmail = firebase.auth().currentUser.email;
      console.log(firebase.auth().currentUser.email);
      console.log(firebase.auth().currentUser.uid);
    } else {
      console.log('No Account');
      this.navCtrl.navigateBack('/main');
    }
  } else if (firebase.auth().signInAnonymously){

    

  } else {

    console.log('No Account');
    this.navCtrl.navigateBack('/main');

  }

  }

  ngOnInit() {
    this.verify();

    this.validations_form = this.formBuilder.group({
      // username: new FormControl('', Validators.compose([
      //   Validators.required
      // ])),

      stylename: new FormControl('', Validators.compose([
        Validators.required,
      ])),

      privacy: this.isPublic,

    });
  }

privacyStatus() {
  console.log("Toggled: "+ this.isPublic); 
}
  
combineInfo(value){

     return value;

}



  findImage(event) {

    const reader = new FileReader;
    this.loading = false;
    if (event.target.files && event.target.files[0]) {
      reader.readAsDataURL(event.target.files[0]);
      // For Preview Of Image
      reader.onload = (e: any) => { // called once readAsDataURL is completed
        this.url = e.target.result;

        // For Uploading Image To Firebase
        this.fileraw = event.target.files[0];
        console.log(this.fileraw);

      }
    }
  }

  uploadImage(){


    console.log("s")
    
    const user = firebase.auth().currentUser;

    const filePath = '/Style/' + user.uid + '/Image' + (Math.floor(1000 + Math.random() * 9000) + 1);
    const result = this.SaveImageRef(filePath, this.fileraw);
    const ref = result.ref;
    result.task.then(a => {
      ref.getDownloadURL().subscribe(url => {
            console.log(url);
            this.newImage.image = url;
            this.loading = false;
            uploadCustomizedStyle(url, this.combineInfo(this.validations_form.value).stylename, this.isPublic).then(res => {
              console.log(res);
        
            }, err => {
              console.log(err); 
            })
          });
        });
      
  }


  SaveImageRef(filePath, file) {
    return {
      task: this.afStorage.upload(filePath, file),
      ref: this.afStorage.ref(filePath)
    };
  }



  isClicked(event){

    if (event){

      return true;

    } else {

      return false;

    }
    
  }

  GoMainPage(){

    this.navCtrl.navigateBack('/main');

  }




}

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
    styleUrl: [
      { type: 'required', message: 'Email is required.' },
    ],
    stylename: [
      { type: 'required', message: 'Password is required.' },
    ]
  };

  url: any;
  newImage: Image = {
    id: this.afs.createId(), image: ''
  };

  loading = false;
  downloadURL: any;
  userEmail: string;

  constructor(
    private navCtrl: NavController,
    private formBuilder: FormBuilder,
    private afs: AngularFirestore, private afStorage: AngularFireStorage,
  ) {
    this.isPublic = false;
  }

  verify() {
    if (firebase.auth().currentUser != null) {
      this.userEmail = firebase.auth().currentUser.email;
      console.log(firebase.auth().currentUser.email);
      console.log(firebase.auth().currentUser.uid);
    } else {
      console.log('No Account');
      this.navCtrl.navigateBack('/main');
    }

    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
       console.log('the user is signned in');
      } else {
        console.log('No Account');
        this.navCtrl.navigateBack('/main');
      }
    });
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


  uploadImage(event) {
    const user = firebase.auth().currentUser;
    console.log(user.email);

    this.loading = false;
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]);
      // For Preview Of Image
      reader.onload = (e: any) => { // called once readAsDataURL is completed
        this.url = e.target.result;

        // For Uploading Image To Firebase
        const fileraw = event.target.files[0];
        console.log(fileraw);

        const filePath = '/Style/' + user.uid + '/Image' + (Math.floor(1000 + Math.random() * 9000) + 1);
        const result = this.SaveImageRef(filePath, fileraw);
        const ref = result.ref;
        result.task.then(a => {
          ref.getDownloadURL().subscribe(url => {
            console.log(url);
            this.newImage.image = url;
            this.loading = false;

            uploadCustomizedStyle(url, this.combineInfo(this.validations_form.value).stylename, this.isPublic);
          });
        });
      };
    }
  }


  SaveImageRef(filePath, file) {
    return {
      task: this.afStorage.upload(filePath, file),
      ref: this.afStorage.ref(filePath)
    };
  }

  GoMainPage(){

    this.navCtrl.navigateBack('/main');

  }



  // this.profileService.uploadCustomizedStyle(ref.getDownloadURL(),this.combineInfo(this.validations_form.value),this.isPublic,this.newImage);
  
  
  // tryUploadImage(value,event){

  // var ref, task, task, downloadURL

  // const randomId = Math.random().toString(36).substring(2);
  // ref = this.afStorage.ref(randomId);
  // task = ref.put(event.target.files[0]);
  // downloadURL = task.downloadURL();

  //   uploadCustomizedStyle(downloadURL,value)
  //    .then(res => {
  //      console.log(res);
  //      this.errorMessage = "";
  //      this.successMessage = "Your image has been created.";
  //      this.navCtrl.navigateForward('/username');

  //    }, err => {
  //      console.log(err);
  //      this.errorMessage = err.message;
  //      this.successMessage = "";
  //    })
  // }

  // goMainPage(){
  //   this.navCtrl.navigateForward("/username");
  // }

}

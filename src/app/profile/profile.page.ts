import { Component, OnInit, Inject } from '@angular/core';
import { AlertController, NavController, NavParams } from '@ionic/angular'
import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from 'angularfire2/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { ProfileService, uploadCustomizedStyle} from '../profile-service.service';
import * as firebase from 'firebase';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ImagePicker } from '@ionic-native/image-picker';


export interface Image {
  id: string;
  image: string;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  
})

export class ProfilePage {
  
  public isPublic: boolean;
  
  validations_form: FormGroup;
  // matching_passwords_group: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';
 
  validation_messages = {
   
    'styleUrl': [
     { type: 'required', message: 'Email is required.' },
    ],

    'stylename': [
     { type: 'required', message: 'Password is required.' },
    ]

 };
  

 url: any;
 newImage: Image = {
  id: this.afs.createId(), image: ''
 }
 loading: boolean = false;downloadURL: any;
;
 
  constructor(
    private navCtrl: NavController,
    // private profileService: ProfileService,
    private formBuilder: FormBuilder,
    private afs: AngularFirestore, private afStorage: AngularFireStorage,

  ) {
    this.isPublic = false;
  }

  privacyStatus() {
    console.log("Toggled: "+ this.isPublic); 
  }
 
  
  ngOnInit(){

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
  
  combineInfo(value){

     return value;

  }

  uploadImage(event) {
    
    this.loading = true;
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
    }

    this.setImageInfo(reader,event,this.combineInfo(this.validations_form.value));
  }

  setImageInfo(reader,event,value){

    var user = firebase.auth().currentUser;

    reader.readAsDataURL(event.target.files[0]);
      // For Preview Of Image
      reader.onload = (e:any) => { // called once readAsDataURL is completed
        this.url = e.target.result;
      
        // For Uploading Image To Firebase
        const fileraw = event.target.files[0];
        console.log(fileraw)
        const filePath = '/Image/' + this.newImage.id + '/' + 'Image'  + value.stylename;
        const result = this.SaveImageRef(filePath, fileraw);
        const ref = result.ref; 

        result.task.then(a => {
          ref.getDownloadURL().subscribe(a => {
            console.log(a);
            console
            
            this.newImage.image = a;
            this.loading = false;
          });

          this.afs.collection('Image').doc(this.newImage.id).set(this.newImage);
        });

        this.downloadURL = ref.getDownloadURL();

        uploadCustomizedStyle(this.downloadURL,value,this.isPublic);

      }, err => {
        console.log(err);
        this.errorMessage = err.message;
        this.successMessage = "";
      }

      
    
  }


  SaveImageRef(filePath, file) {

    return {
      task: this.afStorage.upload(filePath, file)
      , ref: this.afStorage.ref(filePath)
    };
  }
    

  
  
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


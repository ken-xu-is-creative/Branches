import { Component, OnInit } from '@angular/core';
import { uploadAvatar} from '../profile-service.service';
import * as firebase from 'firebase';
import { NavController } from '@ionic/angular';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireStorage } from 'angularfire2/storage';

export interface Image {
  id: string;
  image: string;
}

@Component({
  selector: 'app-profile-image',
  templateUrl: './profile-image.page.html',
  styleUrls: ['./profile-image.page.scss'],
})

export class ProfileImagePage implements OnInit {

  constructor(
    private navCtrl: NavController,
    private afs: AngularFirestore, private afStorage: AngularFireStorage,
  ) { 
  }

  loading = false;
  downloadURL: any;
  userEmail: string;

  url: any;

  fileraw: any;

  avatarImage: Image = {
    id: this.afs.createId(), image: ''
  };

  ngOnInit() {
    
    if(firebase.auth().signInWithEmailAndPassword){
      if (firebase.auth().currentUser != null) {
        this.userEmail = firebase.auth().currentUser.email;
        console.log(firebase.auth().currentUser.email);
        console.log(firebase.auth().currentUser.uid);
        this.makeAvatarDefault();
      } else {
        console.log('No Account');
        this.navCtrl.navigateBack('/main');
      }
    } else if (firebase.auth().signInAnonymously){
  
      this.makeAvatarDefault();
  
    } else {
  
      console.log('No Account');
      this.navCtrl.navigateBack('/main');
  
    }

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
            this.avatarImage.image = url;
            this.loading = false;
            uploadAvatar(url).then(res => {
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

  GoMainPage(){

    uploadAvatar(this.url);
    this.navCtrl.navigateBack('/main');

  }

  makeAvatarDefault(){

    this.url = "../../assets/images/default_avatar.png";

  }


}

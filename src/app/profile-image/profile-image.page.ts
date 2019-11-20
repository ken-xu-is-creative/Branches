import { Component, OnInit } from '@angular/core';
import { uploadAvatar} from '../profile-service.service';
import * as firebase from 'firebase';
import { NavController } from '@ionic/angular';
import { AngularFirestore } from 'angularfire2/firestore';

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
    private afs: AngularFirestore) { 
  }

  loading = false;
  downloadURL: any;
  userEmail: string;

  url: any;
  avatarImage: Image = {
    id: this.afs.createId(), image: ''
  };

  ngOnInit() {
  }

  uploadImage(event) {
    const user = firebase.auth().currentUser;
    console.log(user.email);

    const filePath = '/Style/' + user.uid + '/Image' + (Math.floor(1000 + Math.random() * 9000) + 1);
    
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

        uploadAvatar(fileraw);

    }
  }
}


  

  GoMainPage(){

    this.navCtrl.navigateBack('/main');

  }

}

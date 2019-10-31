import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../profile-service.service';
import { NavController } from '@ionic/angular';
import * as firebase from 'firebase';
import {FormGroup,FormBuilder, Validators, FormControl} from '@angular/forms';

@Component({
  selector: 'app-username',
  templateUrl: './username.page.html',
  styleUrls: ['./username.page.scss'],
})


export class UsernamePage implements OnInit {

  validations_form: FormGroup;

  errorMessage: string = '';
  successMessage: string = '';

  validation_messages = {
  'username': [
    { type: 'required', message: 'Username is required.' },
    { type: 'maxlength', message: 'Password must be less that 20 characters' }
  ]
  }

  constructor(
    private navCtrl: NavController,
    private profileService: ProfileService,
    private formBuilder: FormBuilder
    ) { }

  ngOnInit() {

     this.validations_form = this.formBuilder.group({

      username: new FormControl('', Validators.compose([
        Validators.required
      ]))
     
    });

  }

  confirmUserLogin(){

    firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
       
    } else {
       this.navCtrl.navigateBack();
    }
    });
  }
    
  trySetUsername(value){

    this.profileService.setUsername(value)
    .then(res => {
      console.log(res);
      this.errorMessage = "";
      this.successMessage = "Your account has been created.";
      this.navCtrl.navigateForward('/main');

    }, err => {
      console.log(err);
      this.errorMessage = err.message;
      this.successMessage = "";
    })

    
  }

  }



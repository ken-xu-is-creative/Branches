import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { LoadingController, AlertController } from '@ionic/angular';
import { InfoService } from '../../app/info.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-password-recovery',
  templateUrl: './password-recovery.page.html',
  styleUrls: ['./password-recovery.page.scss'],
})
export class PasswordRecoveryPage implements OnInit {

  validations_form: FormGroup;
  // matching_passwords_group: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';
 
  validation_messages = {
   
    'email': [
     { type: 'required', message: 'Email is required.' },
     { type: 'pattern', message: 'Enter a valid email, like abc@abc.com' }
    ]

  }

  constructor(
    private navCtrl: NavController,
    private authService: InfoService,
    private formBuilder: FormBuilder,
   
  ) {}

 
  ngOnInit(){

      this.validations_form = this.formBuilder.group({

      // username: new FormControl('', Validators.compose([
      //   Validators.required
      // ])),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ]))
    });
  
  }


  askForEmail(value){
    console.log(value);
    this.authService.checkEmail(value)
     .then(res => {
       console.log(res);
       this.errorMessage = "";
       this.successMessage = "Your account has been created.";

     }, err => {
       console.log(err);
       this.errorMessage = err.message;
       this.successMessage = "";
     })
  }

  goHomePage(){
    this.navCtrl.navigateForward("/home");
  }

}



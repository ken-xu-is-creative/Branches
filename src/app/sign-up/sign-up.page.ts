import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { LoadingController, AlertController } from '@ionic/angular';
import { InfoService } from '../../app/info.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})



export class SignUpPage implements OnInit {
  
  validations_form: FormGroup;
  // matching_passwords_group: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';
 
  validation_messages = {
   
    'email': [
     { type: 'required', message: 'Email is required.' },
     { type: 'pattern', message: 'Enter a valid email, like abc@abc.com' }
    ],

    'password': [
     { type: 'required', message: 'Password is required.' },
     { type: 'minlength', message: 'Password must be at least 5 characters long.' },
     { type: 'maxlength', message: 'Password must be less that 20 characters' }
    ]

 };

 
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
      ])),

      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.maxLength(20),
        Validators.required,
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$') //this is for the letters (both uppercase and lowercase) and numbers validation
      ]))
    });
  
  }


  tryRegister(value){
    this.authService.registerUser(value)
     .then(res => {
       console.log(res);
       this.errorMessage = "";
       this.successMessage = "Your account has been created.";
       wait(3000);
       this.navCtrl.navigateForward('/username');

     }, err => {
       console.log(err);
       this.errorMessage = err.message;
       this.successMessage = "";
     })
  }

  goMainPage(){
    this.navCtrl.navigateForward("/username");
  }

}

function wait(ms){
  var start = new Date().getTime();
  var end = start;
  while(end < start + ms) {
    end = new Date().getTime();
 }
}





 
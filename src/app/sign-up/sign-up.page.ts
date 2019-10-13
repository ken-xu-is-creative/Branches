import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoadingController, AlertController } from '@ionic/angular';
import { InfoService } from '../../app/info.service';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {
  userDoc: any;
  
  public createInfoForm: FormGroup;
  router: any;
  constructor(
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public InfoService: InfoService,
    formBuilder: FormBuilder
  ) {
    this.createInfoForm = formBuilder.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  async createProfile() {

    const loading = await this.loadingCtrl.create();

    const username = this.createInfoForm.value.albumName;
    const email = this.createInfoForm.value.artistName;
    const password = this.createInfoForm.value.songDescription;
  
    this.InfoService
    .createProfile(username, email, password )
    .then(
      () => {
        loading.dismiss().then(() => {
          this.router.navigateByUrl('');
        });
      },
      error => {
        console.error(error);
      }
    );


    return await loading.present();

   }

  ngOnInit() {
  }


  
}

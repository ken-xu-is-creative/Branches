import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {
  userDoc: any;

  constructor(private fireStore: AngularFirestore) {
    this.userDoc = fireStore.doc<any>('userProfile/we45tfgy8ij');
  }

  ngOnInit() {
  }

}

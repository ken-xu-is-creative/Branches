import { Component, OnInit, ViewChild } from '@angular/core';
import * as firebase from 'firebase';
// import { Slides } from '@ionic/angular';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.page.html',
  styleUrls: ['./user-profile.page.scss'],
})
export class UserProfilePage implements OnInit {

  ngOnInit(){

  }


  // @ViewChild('slideWithNav') slideWithNav: Slides;
  // @ViewChild('slideWithNav2') slideWithNav2: Slides;
  // @ViewChild('slideWithNav3') slideWithNav3: Slides;
 
  sliderOne: any;
  sliderTwo: any;
  sliderThree: any;

  // getLocation(){

  //   var user = firebase.auth().currentUser;

  //   var imageID = 

  //   // return firebase.storage().ref("Style/"+user.uid+ "/image");

  // }
 
 
  //Configuration for each Slider
  slideOptsOne = {
    initialSlide: 0,
    slidesPerView: 1,
    autoplay:true
  };
  slideOptsTwo = {
    initialSlide: 1,
    slidesPerView: 2,
    loop: true,
    centeredSlides: true
  };
  slideOptsThree = {
    initialSlide: 0,
    slidesPerView: 3
  };
 
  constructor(
  ) {
    
    //Item object for Nature
    this.sliderOne =
      {
        isBeginningSlide: true,
        isEndSlide: false,
        slidesItems: [
          {
            id: 1,
            image: '../../assets/images/1.jpg'
          },
          {
            id: 2,
            image: '../../assets/images/2.jpg'
          },
          {
            id: 3,
            image: '../../assets/images/3.jpg'
          },
          {
            id: 4,
            image: '../../assets/images/4.jpg'
          },
          {
            id: 5,
            image: '../../assets/images/5.jpg'
          }
        ]
      };
    //Item object for Food
    this.sliderTwo =
      {
        isBeginningSlide: true,
        isEndSlide: false,
        slidesItems: [
          {
            id: 6,
            image: '../../assets/images/6.jpg'
          },
          {
            id: 7,
            image: '../../assets/images/7.jpg'
          },
          {
            id: 8,
            image: '../../assets/images/8.jpg'
          },
          {
            id: 9,
            image: '../../assets/images/9.jpg'
          },
          {
            id: 10,
            image: '../../assets/images/10.jpg'
          }
        ]
      };
    //Item object for Fashion
    this.sliderThree =
      {
        isBeginningSlide: true,
        isEndSlide: false,
        slidesItems: [
          {
            id: 11,
            image: '../../assets/images/11.jpg'
          },
          {
            id: 12,
            image: '../../assets/images/12.jpg'
          },
          {
            id: 13,
            image: '../../assets/images/13.jpg'
          },
          {
            id: 14,
            image: '../../assets/images/14.jpg'
          },
          {
            id: 15,
            image: '../../assets/images/15.jpg'
          }
        ]
      };
  }
 
  //Move to Next slide
  slideNext(object, slideView) {
    slideView.slideNext(500).then(() => {
      this.checkIfNavDisabled(object, slideView);
    });
  }
 
  //Move to previous slide
  slidePrev(object, slideView) {
    slideView.slidePrev(500).then(() => {
      this.checkIfNavDisabled(object, slideView);
    });;
  }
 
  //Method called when slide is changed by drag or navigation
  SlideDidChange(object, slideView) {
    this.checkIfNavDisabled(object, slideView);
  }
 
  //Call methods to check if slide is first or last to enable disbale navigation  
  checkIfNavDisabled(object, slideView) {
    this.checkisBeginning(object, slideView);
    this.checkisEnd(object, slideView);
  }
 
  checkisBeginning(object, slideView) {
    slideView.isBeginning().then((istrue) => {
      object.isBeginningSlide = istrue;
    });
  }
  checkisEnd(object, slideView) {
    slideView.isEnd().then((istrue) => {
      object.isEndSlide = istrue;
    });
  }

  getImageURL(){

    const user = firebase.auth().currentUser;

    const userId = user.uid;
   
    firebase.database().ref('/style/' + userId + "/upload").once('value').then(function(snapshot) {

      const imageURL = (snapshot.val() && snapshot.val().url||"null");

      return imageURL;

    })
      // ...
     
    
    // var user = firebase.auth().currentUser.
      // var style = firebase.database().ref("/style/"+ user).child( user + "/upload"),addEventListener(new ValueEventListener() {
      //   @Override
      //   public void onDataChange(DataSnapshot dataSnapshot) {
      //       tvWoowCount.setText(""+dataSnapshot.getChildrenCount());
      // var storageSize = 
       
    }

    getImageName(){

      const user = firebase.auth().currentUser;
  
      const userId = user.uid;
     
      firebase.database().ref('/style/' + userId + "/upload").once('value').then(function(snapshot) {
  
        const imageURL = (snapshot.val() && snapshot.val().name||"null");
  
        return imageURL;
  
      })

      
    }


  styles = [

    {
      name: this.getImageName(),
      imgUrl: this.getImageURL()
    
    },

    {
      name: this.getImageName(),
      imgUrl: this.getImageURL()
    
    },

    {
      name: "a",
      imgUrl: this.getImageURL()
    
    }
    
  ]

}

import { Component } from '@angular/core';

import { NavController, AlertController } from '@ionic/angular';
import { Platform } from '@ionic/angular';
import { DomSanitizer,SafeResourceUrl } from '@angular/platform-browser';
import{Plugins, CameraResultType, CameraSource} from '@capacitor/core';
import { FirebaseService } from '../firebase.service';
import {Book} from '../book.model';
import * as firebase from'firebase';
import {snapshotToArray} from '../../environments/environment';
declare var flipbook: any;
@Component({
  selector: 'page-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  nama: string;
  image: SafeResourceUrl;
  fName:string;
  data=[];
  ref =firebase.database().ref('data/');
  constructor(
    public navCtrl: NavController,
    public platform: Platform,
    private domSanitizer:DomSanitizer,
    public firebaseService: FirebaseService,
    private alertCtrl : AlertController,
  ) {
    this.ref.on('value',resp =>{
      this.data = snapshotToArray(resp)
    });
  }
  ionViewDidLoad() {
   
  }
  one(){
    //  this.nativeAudio.preloadSimple('one', 'assets/sound/one.mp3');
     new Audio('assets/sound/one.mp3').play();
   }
  
   two(){
    //  this.nativeAudio.preloadSimple('one', 'assets/sound/one.mp3');
     new Audio('assets/sound/two.m4a').play();
   }
  
   three(){
    //  this.nativeAudio.preloadSimple('one', 'assets/sound/one.mp3');
     new Audio('assets/sound/three.m4a').play();
   }
  
   four(){
    //  this.nativeAudio.preloadSimple('one', 'assets/sound/one.mp3');
     new Audio('assets/sound/four.m4a').play();
   }
  
   five(){
    //  this.nativeAudio.preloadSimple('one', 'assets/sound/one.mp3');
     new Audio('assets/sound/five.m4a').play();
   }
  
   six(){
    //  this.nativeAudio.preloadSimple('one', 'assets/sound/one.mp3');
     new Audio('assets/sound/six.m4a').play();
   }
   
   seven(){
    //  this.nativeAudio.preloadSimple('one', 'assets/sound/one.mp3');
     new Audio('assets/sound/seven.m4a').play();
   }
  
   eight(){
    //  this.nativeAudio.preloadSimple('one', 'assets/sound/one.mp3');
     new Audio('assets/sound/eight.m4a').play();
   }
  
   nine(){
    //  this.nativeAudio.preloadSimple('one', 'assets/sound/one.mp3');
     new Audio('assets/sound/nine.m4a').play();
   }
  
   ten(){
    //  this.nativeAudio.preloadSimple('one', 'assets/sound/one.mp3');
     new Audio('assets/sound/ten.m4a').play();
   }
 
  async takePhoto(){
    const result= await Plugins.Camera.getPhoto({
      quality:100,
      allowEditing: false,
      source:CameraSource.Camera,
      resultType:CameraResultType.DataUrl
    });
    this.image = this.domSanitizer.bypassSecurityTrustResourceUrl(
      result && (result.dataUrl),
      );
      this.alertName();
 }
 
 async alertName(){
  let alert = this.alertCtrl.create({
    header:'Insert Your Name',
    inputs:[{
      name:'nama',
      type:'text',
      placeholder:'Name'
    }],
    buttons:[
      {
        text:'Cancel',
        role:'cancel',
        cssClass:'secondary',
      },
      {
        text:'Submit Name',
        handler:(data)=> {
          const book : Book ={
            id:'firebase_auto-generate',
            username:data.nama,
            point:0
          }
          this.nama=book.username;
          this.firebaseService.addUser(book).subscribe(
            (data1)=>{console.log(data1);
              this.firebaseService.getName().subscribe(
                (data) => {
                  this.fName = data['username'];
                  console.log(this.fName)
                }
                
              )
              this.presentAlert();
            }
          )
        }
      }
    ]
  });
  (await alert).present();
 
}
  async presentAlert() {
  let alert = this.alertCtrl.create({
    header:'Welcome to DIGIBOOK',
    message:this.nama,
    cssClass: 'foo',
    buttons: ['Dismiss']
  });
  (await alert).present();
}
refresh(){
  window.location.reload()
}

submitNama() {
  const book:Book={
    id:'firebase_auto-generate',
    username: this.nama,
    point:0
  }
  // this.storage.set('userStorage', this.nama);
  this.firebaseService.addUser(book).subscribe(
    (data)=> {
      console.log(data);

      // console.log(this.storage.get('userStorage'));
  });
}

}

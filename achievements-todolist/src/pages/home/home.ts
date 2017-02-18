import { Component } from '@angular/core';

import {
  NavController,
  AlertController,
  ActionSheetController
} from 'ionic-angular';

import { AngularFire, FirebaseListObservable } from 'angularfire2';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  achievements: FirebaseListObservable<any>;
  constructor(public navCtrl: NavController, public alertCtrl: AlertController,
    af: AngularFire, public actionSheetCtrl: ActionSheetController) {
    this.achievements = af.database.list('/achievements');
  }
  addAchievement() {
    let prompt = this.alertCtrl.create({
      title: 'Add Achievement',
      message: "Enter the Achievement Information",
      inputs: [
        {
          name: 'title',
          placeholder: 'Title of achievement'
        },
        {
          name: 'game',
          placeholder: 'Name of the Game'
        },
        {
          name: 'description',
          placeholder: 'Description of achievement'
        },
        {
          name: 'points',
          placeholder: 'Total achievement points'
        },
        {
          name: 'difficulty',
          placeholder: 'Difficulty rating'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            this.achievements.push({
              title: data.title,
              game: data.game,
              description: data.description,
              points: data.points,
              difficulty: data.difficulty,
              done: false
            });
          }
        }
      ]
    });
    prompt.present();
  }


  removeAchievement(achievementId: string) {
    this.achievements.remove(achievementId);
  }

  updateAchievement(achievementId, achievementTitle, achievementGame,achievementDescription,achievementPoints,achievementDificulty) {
    let prompt = this.alertCtrl.create({
      title: 'Achievement Information',
      message: "Update the information for this achievement",
      inputs: [
        {
          name: 'title',
          placeholder: 'Title',
          value: achievementTitle
        },
        {
          name: 'game',
          placeholder: 'Name of the Game',
          value: achievementGame
        },
        {
          name: 'description',
          placeholder: 'Description of achievement',
          value: achievementDescription
        },
        {
          name: 'points',
          placeholder: 'Total achievement points',
          value: achievementPoints
        },
        {
          name: 'difficulty',
          placeholder: 'Difficulty rating',
          value: achievementDificulty
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            this.achievements.update(achievementId, {
              title: data.title,
              game: data.game,
              description: data.description,
              points: data.points,
              difficulty: data.difficulty
            });
          }
        }
      ]
    });
    prompt.present();
  }

detailedAchievement(achievementId, achievementTitle, achievementGame,achievementDescription,achievementPoints,achievementDificulty){
let prompt = this.alertCtrl.create({
      title: 'Achievement: <br>' + achievementTitle,
      subTitle: 'Game: ' + achievementGame,
      message: 'Description: ' + achievementDescription + '<br>' +
      'Points: ' + achievementPoints + '<br>' +
      'Difficulty: ' + achievementDificulty + '<br>',

      buttons: [
        {
          text: 'Okay',
          handler: data => {
            console.log('Okay clicked');
          }
        }
      ]
    });
    prompt.present();
  }

  switchComplete(achievementId, achievementCompletion){
    if(achievementCompletion == true){
      this.achievements.update(achievementId, {
        done: false
      });
    }
    if(achievementCompletion == false){
      this.achievements.update(achievementId, {
        done: true
      });
    }
  }
}
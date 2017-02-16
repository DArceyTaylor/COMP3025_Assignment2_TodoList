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
              difficulty: data.difficulty
            });
          }
        }
      ]
    });
    prompt.present();
  }
  showOptions(achievementId, achievementTitle) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'What do you want to do?',
      buttons: [
        {
          text: 'Delete Achievement',
          role: 'destructive',
          handler: () => {
            this.removeAchievement(achievementId);
          }
        }, {
          text: 'Update title',
          handler: () => {
            this.updateAchievement(achievementId, achievementTitle);
          }
        }, {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  removeAchievement(achievementId: string) {
    this.achievements.remove(achievementId);
  }

  updateAchievement(achievementId, achievementTitle) {
    let prompt = this.alertCtrl.create({
      title: 'Achievement Name',
      message: "Update the name for this achievement",
      inputs: [
        {
          name: 'title',
          placeholder: 'Title',
          value: achievementTitle
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
              title: data.title
            });
          }
        }
      ]
    });
    prompt.present();
  }
}

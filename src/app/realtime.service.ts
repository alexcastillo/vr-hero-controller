import { Injectable } from '@angular/core';

import * as firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyAeef6ppzfZI3kLGiUkXPrE2sBGeyochnY',
  authDomain: 'vr-hero-app.firebaseapp.com',
  databaseURL: 'https://vr-hero-app.firebaseio.com',
  projectId: 'vr-hero-app',
  messagingSenderId: '729035450276'
};

export interface INoteEvent {
  stringId: number;
  note: number;
  match?: boolean;
}

@Injectable()
export class RealtimeService {

  private songRef: firebase.database.Reference;

  constructor() {
    firebase.initializeApp(config);
    this.songRef = firebase.database().ref('/song');
  }

  addEvent(e: INoteEvent) {
    this.songRef.push(e);
  }
}
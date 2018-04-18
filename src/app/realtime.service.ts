import { Injectable } from "@angular/core";
import * as firebase from "firebase";

import { IPose } from "./myo.service";

const EVENT_TIMEOUT = 4000;

const config = {
  apiKey: "AIzaSyAeef6ppzfZI3kLGiUkXPrE2sBGeyochnY",
  authDomain: "vr-hero-app.firebaseapp.com",
  databaseURL: "https://vr-hero-app.firebaseio.com",
  projectId: "vr-hero-app",
  messagingSenderId: "729035450276"
};

@Injectable()
export class RealtimeService {
  private gestureRef: firebase.database.Reference;

  constructor() {
    firebase.initializeApp(config);
    this.gestureRef = firebase.database().ref("/gesture");
  }

  addEvent(e: IPose) {
    const ref = this.gestureRef.push(e);
    ref.onDisconnect().remove();
    setTimeout(() => ref.remove(), EVENT_TIMEOUT);
  }
}

import { Injectable } from "@angular/core";
import * as firebase from "firebase";

import { IControllerEvent } from "./myo.service";

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
  private actionRef: firebase.database.Reference;

  constructor() {
    firebase.initializeApp(config);
    this.actionRef = firebase.database().ref("/action");
  }

  addEvent(e) {
    const ref = this.actionRef.push(e);
    ref.onDisconnect().remove();
    setTimeout(() => ref.remove(), EVENT_TIMEOUT);
  }
}

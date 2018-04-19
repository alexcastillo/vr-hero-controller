import { Injectable } from "@angular/core";
import { fromEvent } from "rxjs/observable/fromEvent";
import * as Myo from "myo";

export interface IControllerEvent {
  name: string;
}

@Injectable()
export class MyoService {
  myo = Myo;

  poses = [
    "double_tap",
    "fingers_spread",
    "fist",
    "wave_in",
    "wave_out",
  ];

  constructor() {
    this.myo.on("connected", function() {
      this.vibrate();
      this.streamEMG();
    });
    this.myo.onError = error => console.error(error);
    this.myo.connect("org.vrhero.myo");
  }

  on(event) {
    return fromEvent(this.myo, event);
  }
}

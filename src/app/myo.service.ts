import { Injectable } from "@angular/core";
import { fromEvent } from "rxjs/observable/fromEvent";
import { tap } from "rxjs/operators";
import * as Myo from "myo";

export interface IPose {
  pose: string;
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
    this.myo.onError = error => console.log(error);
    this.myo.connect("org.vrhero.myo");
  }

  on(event) {
    return fromEvent(this.myo, event).pipe(
      tap(console.log)
    );
  }

  getPoseImage (pose) {
    if (!this.poses.includes(pose)) {
      return `./assets/poses/none.svg`;
    }
    return `./assets/poses/${pose}.svg`;
  }
}

import { Component } from "@angular/core";
import { randomColor } from "randomcolor";
import { RealtimeService } from "./realtime.service";
import { MyoService } from "./myo.service";
import { of } from "rxjs/observable/of";
import { empty } from "rxjs/observable/empty";
import { map, flatMap, throttleTime, tap } from "rxjs/operators";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  constructor(
    private realtime: RealtimeService,
    private myoService: MyoService
  ) {}

  pose$ = this.myoService.on("pose").pipe(
    throttleTime(200)
  );

  poseIcon$ = this.pose$.pipe(
    map((pose: any) => {
      if (this.myoService.poses.includes(pose)) {
        return `./assets/poses/${pose}.svg`;
      }
      return `./assets/poses/none.svg`;
    })
  );

  actions$ = this.pose$.pipe(
    flatMap(pose => {
      switch (pose) {
        case "wave_in":
        case "wave_out":
          return of({
            type: "color",
            payload: randomColor()
          });
        case "fingers_spread":
          return of({
            type: "blast"
          });
        default:
          return empty();
      }
    }),
    tap(event => this.realtime.addEvent(event)),
    tap(event => console.log(event)),
  ).subscribe();
}

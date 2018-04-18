import { Component } from "@angular/core";
import { titleCase } from "change-case";
import { RealtimeService } from "./realtime.service";
import { MyoService } from "./myo.service";
import { map, tap } from "rxjs/operators";

import { IControllerEvent } from "./myo.service";

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
    tap(pose => {
      this.realtime.addEvent({
        pose
      });
    })
  );

  poseTitle$ = this.pose$.pipe(
    map(pose => titleCase(pose))
  );
}

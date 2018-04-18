import { MyoService } from "./myo.service";
import { RealtimeService } from "./realtime.service";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";

import { AppComponent } from "./app.component";
import { NavigationComponent } from "./navigation/navigation.component";

const routes: Routes = [{ path: "", pathMatch: "full", redirectTo: "myo" }];

@NgModule({
  declarations: [AppComponent, NavigationComponent],
  imports: [BrowserModule, FormsModule, RouterModule.forRoot(routes)],
  providers: [MyoService, RealtimeService],
  bootstrap: [AppComponent]
})
export class AppModule {}

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {PreviewRoutingModule} from "./preview/preview-routing.module";
import {IntroductionComponent} from "./preview/introduction/introduction.component";

@NgModule({
  declarations: [
    AppComponent,
      IntroductionComponent
  ],
  imports: [
    BrowserModule,
      PreviewRoutingModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}

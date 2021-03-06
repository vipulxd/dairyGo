import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {SpinnerDottedModule} from "spinners-angular/spinner-dotted";
import {HttpClientModule} from '@angular/common/http';
import {MatButtonModule} from "@angular/material/button";
import { NavbarComponent } from './shell/navbar/navbar.component';
import {MatIconModule} from "@angular/material/icon";
import { AgmCoreModule } from '@agm/core';
import { ConversationsComponent } from './shell/conversations/conversations.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import { ChatViewComponent } from './shell/conversations/chat-view/chat-view.component';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ConversationsComponent,
    ChatViewComponent,
  ],
    imports: [
        SpinnerDottedModule,
        BrowserModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyDIbr4Jz-08WdE1GyCJ6m-QmfD2QP83vkk'
        }),
        MatButtonModule,
        MatIconModule,
        HttpClientModule,
        AppRoutingModule,
        MatProgressSpinnerModule

    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}

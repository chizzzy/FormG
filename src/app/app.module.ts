import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {WelcomePageComponent} from './welcome-page/welcome-page.component';
import {AppRoutingModule} from './app-routing.module';
import {FormsPageComponent} from './forms-page/forms-page.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomePageComponent,
    FormsPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}

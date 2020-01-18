import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { DefaultPluralizer } from "@ngrx/data";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { HttpUrlGenerator } from "ngrx-data";
import { environment } from "../environments/environment";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AppHttpUrlGenerator } from "./core/app-http-url-generator";
import { AppStoreModule } from "./store/app-store.module";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    AppStoreModule,
    BrowserAnimationsModule
  ],
  providers: [
    DefaultPluralizer,
    { provide: HttpUrlGenerator, useClass: AppHttpUrlGenerator }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

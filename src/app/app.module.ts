import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContentComponent } from './content/content.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AutenticationInterceptor } from './interceptor/authentication.interceptor';
import { ContentModule } from './content/content.module';

@NgModule({
  declarations: [AppComponent, ContentComponent],
  imports: [BrowserModule, AppRoutingModule, ContentModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AutenticationInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

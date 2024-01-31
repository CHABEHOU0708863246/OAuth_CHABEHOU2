import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IPublicClientApplication, PublicClientApplication, LogLevel } from "@azure/msal-browser";
import { MsalModule, MSAL_INSTANCE, MsalService } from '@azure/msal-angular';
import { HomeComponent } from './core/components/home/home.component';

export function MSALInstanceFactory(): IPublicClientApplication {
  return new PublicClientApplication({
    auth: {
      clientId: 'fadd60ca-e47e-4724-8857-8f2fe39c57d1',
      redirectUri: 'http://localhost:4200',
    },
    cache: {
      cacheLocation: 'localStorage',
    },
    system: {
      loggerOptions: {
        loggerCallback(logLevel, message, containsPii) {
          console.log(message);
        },
        logLevel: LogLevel.Verbose,
        piiLoggingEnabled: false,
      },
    },
  });
}

@NgModule({
  declarations: [AppComponent, HomeComponent],
  imports: [BrowserModule, AppRoutingModule, MsalModule],
  providers: [
    {
      provide: MSAL_INSTANCE,
      useFactory: MSALInstanceFactory,
    },
    MsalService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

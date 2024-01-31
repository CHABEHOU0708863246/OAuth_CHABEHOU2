import { Component, OnInit } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { AuthenticationResult } from "@azure/msal-browser";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'OAuthAndAzure';

  constructor(private msalService : MsalService){}
  ngOnInit(): void {
    this.msalService.handleRedirectObservable().subscribe({
      next: (result: AuthenticationResult) => {
        if (result && result.account) {
          this.msalService.instance.setActiveAccount(result.account);
        }
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  isloggedIn() : boolean {
    return this.msalService.instance.getActiveAccount() != null;
  }

  login(){
    this.msalService.loginPopup().subscribe( (response: AuthenticationResult) => {
      this.msalService.instance.setActiveAccount(response.account)
    })
  }

  logout(){
    this.msalService.logout();
  }
}

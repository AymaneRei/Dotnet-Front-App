import { Component } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
})
export class ContentComponent {
  constructor(private authenticationService: AuthenticationService) {}

  logout(): void {
    this.authenticationService.logOut();
  }

  getUserRole(): string | null {
    return this.authenticationService.getUserRole();
  }
}

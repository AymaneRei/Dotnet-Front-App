import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import { User } from '../core/models/user.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit, OnDestroy {
  errorMessage!: string;
  sub!: Subscription;

  users!: User[];

  constructor(private authenticationService: AuthenticationService) {}

  ngOnInit() {
    this.sub = this.authenticationService.getUsers().subscribe({
      next: (data) => {
        this.users = data;
      },
      error: (err) => (this.errorMessage = err),
    });
  }

  deleteUser(username: string): void {
    if (confirm('Voulez-vous vraiment supprimer cet utilisateur?')) {
      this.sub = this.authenticationService.deleteUser(username).subscribe({
        next: (data) => {
          location.reload();
        },
        error: (err) => (this.errorMessage = err),
      });
    }
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}

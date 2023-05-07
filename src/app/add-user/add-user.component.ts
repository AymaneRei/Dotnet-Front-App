import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UserRequest } from '../core/models/userRequest.model';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
})
export class AddUserComponent implements OnInit, OnDestroy {
  errorMessage: boolean = false;
  successMessage: boolean = false;
  sub!: Subscription;

  userForm!: FormGroup;
  user = new UserRequest();

  constructor(
    private authenticationService: AuthenticationService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.userForm = this.buildGroub();
    this.subscribeToChanges();
  }

  save(): void {
    this.sub = this.authenticationService.register(this.user).subscribe({
      next: (data) => {
        this.errorMessage = false;
        this.successMessage = true;
        console.log('User successfully created !');
      },
      error: (err) => (this.errorMessage = true),
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  buildGroub(): FormGroup {
    return this.fb.group({
      username: [
        '',
        [Validators.email, Validators.required, Validators.min(1)],
      ],
      password: ['', [Validators.required, Validators.min(1)]],
    });
  }

  subscribeToChanges(): void {
    this.userForm.valueChanges.subscribe((value) => {
      this.user.username = value.username;
      this.user.password = value.password;
    });
  }
}

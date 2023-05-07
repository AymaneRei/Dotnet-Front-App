import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UserUpdate } from '../core/models/userUpdate.model';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.scss'],
})
export class UpdatePasswordComponent implements OnInit, OnDestroy {
  errorMessage: boolean = false;
  successMessage: boolean = false;
  sub!: Subscription;

  userForm!: FormGroup;
  user = new UserUpdate();

  constructor(
    private authenticationService: AuthenticationService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.userForm = this.buildGroub();
    this.subscribeToChanges();
  }

  save(): void {
    this.user.username = this.authenticationService.getUsername() ?? '';
    this.sub = this.authenticationService
      .getUser(this.user.username)
      .subscribe({
        next: (data) => {
          this.user.id = data.id;
          this.sub = this.authenticationService
            .updateUser(this.user)
            .subscribe({
              next: (data) => {
                this.errorMessage = false;
                this.successMessage = true;
                console.log('User successfully updated !');
              },
              error: (err) => (this.errorMessage = true),
            });
        },
        error: (err) => (this.errorMessage = true),
      });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  buildGroub(): FormGroup {
    return this.fb.group(
      {
        password: ['', [Validators.required, Validators.min(3)]],
        confirm: ['', [Validators.required, Validators.min(3)]],
      },
      { validator: this.checkPasswords }
    );
  }

  subscribeToChanges(): void {
    this.userForm.valueChanges.subscribe((value) => {
      this.user.password = value.password;
    });
  }

  checkPasswords(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirm = group.get('confirm')?.value;

    return password === confirm ? null : { notSame: true };
  }
}

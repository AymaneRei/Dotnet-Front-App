import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Login } from 'src/app/core/models/login.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  errorMessage!: string;
  sub!: Subscription;

  loginForm!: FormGroup;
  login = new Login();

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.loginForm = this.buildGroub();
    this.subscribeToChanges();
  }

  save(): void {
    this.sub = this.authenticationService.login(this.login).subscribe({
      next: () => {
        console.log('LoggedIn');
        this.router.navigate(['/pokemons']);
      },
      error: (err) => (this.errorMessage = err),
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  buildGroub(): FormGroup {
    return this.fb.group({
      email: [
        '',
        [Validators.email, Validators.required, Validators.minLength(3)],
      ],
      password: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  subscribeToChanges(): void {
    this.loginForm.valueChanges.subscribe((value) => {
      this.login.username = value.email;
      this.login.password = value.password;
    });
  }
}

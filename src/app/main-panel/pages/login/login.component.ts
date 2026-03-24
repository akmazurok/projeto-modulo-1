import { Component, inject } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Login } from '../transfers/models/login.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';


@Component({
  selector: 'app-login',
  imports: [CommonModule, MatFormFieldModule, MatInputModule, MatSelectModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private authService = inject(AuthService);
  loginForm!: FormGroup;
  erroMessage = '';

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
    });
  }

  onSubmit() {
    const payload: Login = this.loginForm.getRawValue();
    if (!this.authService.login(payload)) {
      this.erroMessage = 'Login ou senha incorretos';
    }
  }
}

import { Component, inject, signal } from '@angular/core';
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
import { ConfirmDialogService } from '../../../shared/services/confirm-dialog.service';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-login',
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatCardModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private authService = inject(AuthService);
  private readonly dialogService = inject(ConfirmDialogService);
  loginForm!: FormGroup;
  errorMessage = signal<string>('');

  ngOnInit(): void {
    this.buildForm();
    this.loginForm.valueChanges.subscribe(() => {
      this.errorMessage.set('');
    });
  }

  buildForm(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) return;
    const payload: Login = this.loginForm.getRawValue();

    if (!this.authService.login(payload)) {
      this.errorMessage.set('Usuário ou senha inválidos');
    } else {
      this.errorMessage.set('');
    }
  }
}

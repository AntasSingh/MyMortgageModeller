import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent {
  firstName: string = '';
  username: string = ''; // Email
  password: string = '';
  reEnterPassword: string = '';
  passwordError: string = '';
  emailError: string = ''; // New property for email validation
  loading: boolean =true;
  errorMesage: string = '';
  errorStatus: boolean = false;

  constructor(private authService: AuthService, private router: Router) { }

  // Simple email validation function
  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  onSubmit(): void {
    this.loading =true;
    // Check if the passwords match
    if (this.password !== this.reEnterPassword) {
      this.passwordError = 'Passwords do not match';
      return;
    } else {
      this.passwordError = '';
    }

    // Validate email address
    if (!this.isValidEmail(this.username)) {
      this.emailError = 'Invalid email address';
      return;
    } else {
      this.emailError = '';
    }

    // Register user if validation passes
    const registrationData = {
      name: this.firstName,
      email: this.username,
      password: this.password
    };

    this.authService.register(registrationData).subscribe(
      
      responseMessage => {
        console.log('Registration successful:', responseMessage);
        this.router.navigate(['/login']);
        // Handle success (e.g., navigate to login page or show a success message)
        this.loading = false;
      },
      error => {
        console.error('Registration failed:', error);
        // Handle error (e.g., show an error message)
        this.loading =true;
        this.emailError = error.message;
      }
    );
  }

  onLoginClick(): void {
    this.router.navigate(['/login']);
  }
}

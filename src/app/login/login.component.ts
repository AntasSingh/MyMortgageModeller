// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrl: './login.component.scss'
// })
// export class LoginComponent {

// }
import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  message: string = ''; // To display success or error messages
  showError: boolean = false;

  constructor(private authService: AuthService, private router: Router) { } // Inject AuthService

  onSubmit() {
    this.authService.login(this.username, this.password).subscribe(
      responseMessage => {
        this.message = responseMessage;
        this.showError = false;
        this.router.navigate(['/home']);
      },
      error => {
        this.showError = true;
        this.message = error.message; // Handle error message
        
      }
    );
  }
}



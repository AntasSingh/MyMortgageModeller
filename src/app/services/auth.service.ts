import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://om1mz44dn5.execute-api.eu-north-1.amazonaws.com/prod2/login';
  private registerUrl = 'https://om1mz44dn5.execute-api.eu-north-1.amazonaws.com/prod2/register';

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<string> {
    const body = { email, password };
    return this.http.post<{ message: string }>(this.apiUrl, body).pipe(
      map(response => {
        this.setCookie('userEmail', email, 12); // Set cookie for 12 hours
        this.setCookie('isLoggedIn', 'true', 12); // Set cookie for 12 hours
        return response.message;
      }), // Extract message from successful response
      catchError((error: HttpErrorResponse) => {
        // Extract message from error response body if available
        let errorMessage = 'An unknown error occurred!';
        if (error.error && error.error.message) {
          errorMessage = error.error.message; // Use the message from the backend response body
        }
        return throwError(() => new Error(errorMessage)); // Use the current throwError signature
      })
    );
  }

  logout(): void {
    this.deleteCookie('userEmail');
    this.deleteCookie('isLoggedIn');
  }


  register(data: { name: string, email: string, password: string }): Observable<string> {
    return this.http.post<{ message: string }>(this.registerUrl, data).pipe(
      map(response => response.message),
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'An unknown error occurred!';
        if (error.error && error.error.message) {
          errorMessage = error.error.message;
        }
        return throwError(() => new Error(errorMessage));
      })
    );
  }

  private setCookie(name: string, value: string, hours: number): void {
    const d = new Date();
    d.setTime(d.getTime() + (hours * 60 * 60 * 1000));
    const expires = `expires=${d.toUTCString()}`;
    document.cookie = `${name}=${value}; ${expires}; path=/`;
  }

  getCookie(name: string): string | null {
    const nameEQ = `${name}=`;
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }

  deleteCookie(name: string): void {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
  }
}

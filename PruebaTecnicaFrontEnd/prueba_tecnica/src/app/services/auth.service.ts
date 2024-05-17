import { Injectable } from '@angular/core';
import { Observable, catchError, map, tap ,of} from 'rxjs';
import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { login } from '../Models/loginMode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  private url: string = 'https://localhost:7278/api/';
  private token :string | null = null;
  //loguearse

  log(login: login): Observable<string> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });


    console.log(login);
    return this.http
      .post<{ token: string }>(`${this.url}Autenticacion/Validar`, login)
      .pipe(tap(response => this.token = response.token),
    catchError(this.handleError<any>('login'))); 
  }

  getToken(): string | null {
    return this.token;
  }
  
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}

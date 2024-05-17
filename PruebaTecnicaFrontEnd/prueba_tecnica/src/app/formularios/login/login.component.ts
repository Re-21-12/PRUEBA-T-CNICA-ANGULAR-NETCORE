import { Component, OnInit } from '@angular/core';
import { login } from '../../Models/loginMode';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export default class LoginComponent implements OnInit {
  constructor(private api: AuthService, private router:Router) {}  
  login: login = {
    correo: '',
    clave: '',
  };
  ngOnInit(): void {
    console.log("entro")
    this.login.correo = '';
    this.login.clave = '';
  }
  onSubmit() {
    this.api.log(this.login).subscribe((response: any) => {
      console.log(`Respuesta del servidor: ${response}`);
      this.login.correo = '';
      this.login.clave = '';
      this.router.navigate(['/formularios/opciones'])
    }),
      (error: any) => {
        console.error(`Error: ${error}`);
      };
  }
}

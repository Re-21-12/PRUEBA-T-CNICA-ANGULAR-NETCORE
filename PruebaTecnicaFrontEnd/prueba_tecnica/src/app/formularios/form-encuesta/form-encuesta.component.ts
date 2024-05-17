import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Encuesta } from '../../Models/EncuestaModel';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-form-encuesta',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './form-encuesta.component.html',
  styleUrl: './form-encuesta.component.css',
})
export default class FormEncuestaComponent implements OnInit {
  constructor(private api: ApiService,  private router:Router) {}
  encuesta: Encuesta = {
    nombreEncuesta: '',
    descripcionEncuesta: '',
    campoEnFormularios: [],
    linkFormulario: '',
  };
  ngOnInit(): void {
    this.encuesta.nombreEncuesta = '';
    this.encuesta.descripcionEncuesta = '';
    this.encuesta.campoEnFormularios = [];
    this.encuesta.linkFormulario = '';
  }
  onSubmit() {
    this.api.crearEncuesta(this.encuesta).subscribe((response: any) => {
      console.log(`Respuesta del servidor: ${response}`);
      this.encuesta.nombreEncuesta = '';
      this.encuesta.descripcionEncuesta = '';
      this.encuesta.campoEnFormularios = [];
      this.encuesta.linkFormulario = '';
      this.router.navigate(['/formularios/opciones'])
    }),
      (error: any) => {
        console.error(`Error: ${error}`);
      };
  }
}

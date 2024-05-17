import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { Campo } from '../../Models/CampoModel';
import { Encuesta } from '../../Models/EncuestaModel';
@Component({
  selector: 'app-form-campo',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './form-campo.component.html',
  styleUrl: './form-campo.component.css',
})
export default class FormCampoComponent {
  constructor(private api: ApiService, private router: Router) {}
  Encuestas: Encuesta[] = [];

  campo: Campo = {
    nombreCampo: '',
    tituloCampo: '',
    esrequerido: '',
    tipoCampo: '',
    linkFormulario: '',
    campoEnFormularios: [],
  };
  ngOnInit(): void {
    this.campo.nombreCampo = '';
    this.campo.tipoCampo = '';
    this.campo.esrequerido = '';
    this.campo.linkFormulario = '';
    this.campo.campoEnFormularios = [];
    this.obtenerEncuestas();
  }
  obtenerEncuestas() {
    this.api.obtenerEncuestas().subscribe(
      (data: Encuesta[]) => {
        this.Encuestas = data;
        console.log(this.Encuestas);
      },
      (error: any) => {
        console.error('Error al obtener las materias:', error); // Maneja los errores en caso de que ocurran
      }
    );
  }

  onSubmit() {
    this.api.crearCampo(this.campo).subscribe((response: any) => {
      console.log(this.campo)
      console.log(`Respuesta del servidor: ${response}`);
      this.campo.nombreCampo = '';
      this.campo.tipoCampo = '';
      this.campo.esrequerido = '';
      this.campo.linkFormulario = '';
      this.campo.campoEnFormularios = [];
      this.router.navigate(['/formularios/opciones'])

    }),
      (error: any) => {
        console.error(`Error: ${error}`);
      };
  }
}

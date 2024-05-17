import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Campo } from '../../Models/CampoModel';
import { Encuesta } from '../../Models/EncuestaModel';
import { CampoEnFormularios } from '../../Models/CampoEnFormularioModel';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-llenar-encuesta',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
  templateUrl: './llenar-encuesta.component.html',
  styleUrls: ['./llenar-encuesta.component.css']
})
export default class LlenarEncuestaComponent implements OnInit {
  Campos: Campo[] = [];
  Respuestas: CampoEnFormularios[] = [];
  linkFormulario: string | undefined;
  Encuesta: Encuesta = {
    nombreEncuesta: '',
    descripcionEncuesta: '',
    campoEnFormularios: [],
    linkFormulario: '',
  };
  constructor(
    private api: ApiService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.linkFormulario = this.verificarParams();
    this.obtenerEncuesta();
    this.obtenerCampos();
  }

  obtenerCampos() {
    this.api.obtenerCampos().subscribe(
      (data: Campo[]) => {
        this.Campos = data.filter(campo => campo.linkFormulario === this.linkFormulario);
        // Inicializar respuestas
        this.Respuestas = this.Campos.map(campo => ({
          linkFormulario: this.linkFormulario!,
          idCampo: campo.id!,
          valor: '',
          idCampoNavigation: campo,
          linkFormularioNavigation: this.Encuesta // Puedes ajustarlo según sea necesario
        }));
        console.log(this.Respuestas)
      },
      error => {
        console.error('Error al obtener los campos:', error);
      }
    );
  }

  obtenerEncuesta() {
    this.api.obtenerEncuesta(this.verificarParams()!).subscribe(
      (data: Encuesta) => {
        this.Encuesta = data;
        console.log(this.Encuesta);
      },
      (error: any) => {
        console.error('Error al obtener las materias:', error); // Maneja los errores en caso de que ocurran
      }
    );
  }

  verificarParams(): string | undefined {
    let linkFormulario: string | undefined;
    this.activatedRoute.params.subscribe(params => {
      linkFormulario = params['linkFormulario'];
    });
    return linkFormulario;
  }

  onInputChange(event: any, campo: Campo) {
    const respuesta = this.Respuestas.find(r => r.idCampo === campo.id);
    if (respuesta) {
      respuesta.valor = event.target.value;
    }
  }

  onSubmit() {
      this.api.crearCampoEnEncuestas(this.Respuestas, this.linkFormulario!).subscribe(
        response => {
          console.log(this.Respuestas)
          console.log(`Respuesta del servidor: ${response}`);
          this.router.navigate(['/']);
        },
        error => {
          console.error(`Error: ${error}`);
        }
      );
    }
}

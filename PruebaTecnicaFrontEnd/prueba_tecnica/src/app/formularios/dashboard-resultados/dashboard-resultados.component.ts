import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CampoEnFormularios } from '../../Models/CampoEnFormularioModel';
import { ApiService } from '../../services/api.service';
import { Campo } from '../../Models/CampoModel';
import { Encuesta } from '../../Models/EncuestaModel';

@Component({
  selector: 'app-dashboard-resultados',
  standalone: true,
  imports: [],
  templateUrl: './dashboard-resultados.component.html',
  styleUrl: './dashboard-resultados.component.css'
})
export default class DashboardResultadosComponent implements OnInit{
  Respuestas: CampoEnFormularios[] = [];
  Campos: Campo[] = [];
  Encuesta: Encuesta = {
    nombreEncuesta: '',
    descripcionEncuesta: '',
    campoEnFormularios: [],
    linkFormulario: '',
  };
  ngOnInit(): void {
      this.obtenerRespuestas();
      this.obtenerCampos();
      this.obtenerEncuesta();
  }
  constructor(private api: ApiService, private activatedRoute: ActivatedRoute){}

  obtenerRespuestas() {
    this.api.obtenerRespuestas().subscribe(
      (data: CampoEnFormularios[]) => {
        this.Respuestas = data.filter((respuesta) => respuesta.linkFormulario == this.verificarParams())
        console.log(this.Respuestas)
      },
      (error: any) => {
        console.error('Error al obtener las respuestas:', error); // Maneja los errores en caso de que ocurran
      }
    );
  }
  obtenerCampos() {
    this.api.obtenerCampos().subscribe(
      (data: Campo[]) => {
        this.Campos = data.filter((campo) => campo.linkFormulario == this.verificarParams())
        console.log(this.Campos)
      },
      (error: any) => {
        console.error('Error al obtener los campos:', error); // Maneja los errores en caso de que ocurran
      }
    );
  }

obtenerEncuesta(){
  this.api.obtenerEncuesta(this.verificarParams()!).subscribe((data:Encuesta)=>{
    this.Encuesta = data
  },
  (error: any) => {
    console.error('Error al obtener la encuesta', error); // Maneja los errores en caso de que ocurran
  }
)
}
  
  verificarParams(): string | undefined {
    let linkFormulario: string | undefined;
    this.activatedRoute.params.subscribe((params) => {
      linkFormulario = params['linkFormulario'];
    });
    return linkFormulario;
  }
}

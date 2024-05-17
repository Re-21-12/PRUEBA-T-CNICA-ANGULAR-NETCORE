import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router,ActivatedRoute } from '@angular/router';
import { Encuesta } from '../../Models/EncuestaModel';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-formedit-encuesta',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
  templateUrl: './formedit-encuesta.component.html',
  styleUrl: './formedit-encuesta.component.css'
})
export default class FormeditEncuestaComponent implements OnInit{
  constructor(private api: ApiService,  private router:Router, private activatedRoute: ActivatedRoute) {}
  linkFormulario: string = '';

  encuesta: Encuesta = {
    nombreEncuesta: '',
    descripcionEncuesta: '',
    campoEnFormularios: [],
    linkFormulario: '',
  };
  ngOnInit(): void {
    this.verificarParams();
    if (typeof this.verificarParams()) {
      // Hacer algo si verificarParams() devuelve un número
      this.obtenerEncuesta();
      // Hacer algo si verificarParams() no devuelve un número
    }
  }
  obtenerEncuesta(){
     this.activatedRoute.params.subscribe((params) => {
      this.linkFormulario = params['linkFormulario']
    });
      console.log(this.linkFormulario);
      this.api.obtenerEncuesta(this.linkFormulario).subscribe((data) => {
        this.encuesta = data;
        console.log(this.encuesta);
      });
  }

  verificarParams(): string | undefined {
    let linkFormulario: string | undefined;
    this.activatedRoute.params.subscribe((params) => {
      linkFormulario = params['linkFormulario'];
    });
    return linkFormulario;
  }

  onUpdate() {
    
    this.api.editarEncuesta(this.linkFormulario!, this.encuesta).subscribe((response) => {
      console.log(`Respuesta del servidor: ${response}`);
      this.encuesta.nombreEncuesta = '';
      this.encuesta.descripcionEncuesta = '';
      this.encuesta.campoEnFormularios = [];
      this.encuesta.linkFormulario = '';
      this.router.navigate(['/formularios/opciones']);
    }),
      (error: any) => {
        console.error(`Error: ${error}`);
      };
  }

}

import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Campo } from '../../Models/CampoModel';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list-campo',
  standalone: true,
  imports: [],
  templateUrl: './list-campo.component.html',
  styleUrl: './list-campo.component.css',
})
export default class ListCampoComponent implements OnInit {
 Campos: Campo[] = [];

  ngOnInit(): void {
    this.obtenerCampos();

  }
  constructor(private api: ApiService, private activatedRoute: ActivatedRoute) {}
  obtenerCampos() {
    this.api.obtenerCampos().subscribe(
      (data: Campo[]) => {
        this.Campos = data.filter((campo) => campo.linkFormulario == this.verificarParams())
        console.log(this.Campos)
      },
      (error: any) => {
        console.error('Error al obtener las materias:', error); // Maneja los errores en caso de que ocurran
      }
    );
  }


  verificarParams(): string | undefined {
    let linkFormulario: string | undefined;
    this.activatedRoute.params.subscribe((params) => {
      linkFormulario = params['linkFormulario'];
    });
    return linkFormulario;
  }
}

import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Encuesta } from '../../Models/EncuestaModel';
import { ApiService } from '../../services/api.service';
import { Campo } from '../../Models/CampoModel';
import { CampoEnFormularios } from '../../Models/CampoEnFormularioModel';
@Component({
  selector: 'app-opciones',
  standalone: true,
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './opciones.component.html',
  styleUrl: './opciones.component.css'
})
export default class OpcionesComponent implements OnInit{

  Encuestas: Encuesta[] = [];
  constructor(private api: ApiService) {}
ngOnInit(): void {
    this.obtenerEncuestas();
}
  obtenerEncuestas() {
    this.api.obtenerEncuestas().subscribe(
      (data: Encuesta[]) => {
        this.Encuestas = data
        console.log(this.Encuestas)
      },
      (error: any) => {
        console.error('Error al obtener las materias:', error); // Maneja los errores en caso de que ocurran
      }
    );
  }

eliminarCampos(linkFormulario?: string){
  if (linkFormulario != undefined )
this.api.eliminarCampos(linkFormulario).subscribe((data:Campo[]) =>{
  console.log(data);
})
}
eliminarCamposEnEncuestas(linkFormulario?: string){
  if (linkFormulario != undefined )
this.api.eliminarCamposEnEncuestas(linkFormulario).subscribe((data:CampoEnFormularios[]) =>{
  console.log(data);
})
}


  onDelete(linkFormulario?: string) {
    const confirmacion = confirm(
      `¿Estás seguro de que deseas eliminar esta actividad?`
    );
    if (linkFormulario != undefined && confirmacion)
      this.eliminarCamposEnEncuestas(linkFormulario)
      this.eliminarCampos(linkFormulario)
      this.api.eliminarEncuesta(linkFormulario!).subscribe(
        (data: Encuesta) => {
          console.log(data);
          this.obtenerEncuestas();
        },
        (error: any) => {
          console.error('Error al obtener las encuestas:', error); // Maneja los errores en caso de que ocurran
        }
      );
  }

}

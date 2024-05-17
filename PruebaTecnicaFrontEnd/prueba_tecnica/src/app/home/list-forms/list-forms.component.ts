import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Encuesta } from '../../Models/EncuestaModel';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-list-forms',
  standalone: true,
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './list-forms.component.html',
  styleUrl: './list-forms.component.css'
})
export default class ListFormsComponent implements OnInit{

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
}

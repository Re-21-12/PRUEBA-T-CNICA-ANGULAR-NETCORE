import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Encuesta } from '../Models/EncuestaModel';
import { Campo } from '../Models/CampoModel';
import { CampoEnFormularios } from '../Models/CampoEnFormularioModel';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}
  private url: string = 'https://localhost:7278/api/';
  //loguearse

  obtenerEncuestas(): Observable<Encuesta[]> {
    return this.http.get<Encuesta[]>(`${this.url}Formularios`);
  }
  obtenerCampos(): Observable<Campo[]> {
    return this.http.get<Campo[]>(`${this.url}Campoes`);
  }
  obtenerRespuestas(): Observable<CampoEnFormularios[]> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get<CampoEnFormularios[]>(`${this.url}CampoEnFormularios`, {headers});
  }
  obtenerEncuesta(linkFormulario: string): Observable<Encuesta> {
    return this.http.get<Encuesta>(`${this.url}Formularios/${linkFormulario}`);
  }
  obtenerCampo(id: number): Observable<Campo> {
    return this.http.get<Campo>(`${this.url}Campoes/${id}`);
  }
  crearEncuesta(encuesta: Encuesta): Observable<Encuesta> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Encuesta>(`${this.url}Formularios`, encuesta, {
      headers,
    });
  }
  crearCampo(campo: Campo): Observable<Campo> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Campo>(`${this.url}Campoes`, campo, {
      headers,
    });
  }
  crearCampoEnEncuesta(campoEnEncuesta: CampoEnFormularios){
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Campo>(`${this.url}CampoEnFormularios`, campoEnEncuesta, {
      headers,
    });
  }
  crearCampoEnEncuestas(respuestas: CampoEnFormularios[], linkFormulario: string): Observable<any> {
    const url = `${this.url}CampoEnFormularios/llenar/${linkFormulario}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(url, respuestas, { headers , responseType:'text'});
  }


  eliminarEncuesta(linkFormulario: string): Observable<Encuesta> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.delete<Encuesta>(
      `${this.url}Formularios/${linkFormulario}`,
      { headers }
    );
  }
  eliminarCampos(linkFormulario: string): Observable<Campo[]> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.delete<Campo[]>(
      `${this.url}Campoes/deleteCampoes/${linkFormulario}`,
      { headers }
    );
  }

  eliminarCamposEnEncuestas(linkFormulario: string): Observable<CampoEnFormularios[]> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.delete<CampoEnFormularios[]>(
      `${this.url}CampoEnFormularios/deleteCampoEnFormularios/${linkFormulario}`,
      { headers }
    );
  }

  editarEncuesta(
    linkFormulario: string,
    encuesta: Encuesta
  ): Observable<Encuesta> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.put<Encuesta>(
      `${this.url}Formularios/${linkFormulario}`,
      encuesta,
      { headers }
    );
  }
}

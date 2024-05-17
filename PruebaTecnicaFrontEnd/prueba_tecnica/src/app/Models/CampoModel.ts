import { CampoEnFormularios } from "./CampoEnFormularioModel";

export interface Campo {
    id?:number;
    nombreCampo: string;
    tituloCampo: string;
    esrequerido: string;
    tipoCampo: string;
    linkFormulario: string;
    campoEnFormularios: CampoEnFormularios[];

  }
  /* {
    "id": 0,
    "nombreCampo": "string",
    "tituloCampo": "string",
    "esrequerido": "string",
    "tipoCampo": "string",
    "linkFormulario": "string",
    "campoEnFormularios": [ */
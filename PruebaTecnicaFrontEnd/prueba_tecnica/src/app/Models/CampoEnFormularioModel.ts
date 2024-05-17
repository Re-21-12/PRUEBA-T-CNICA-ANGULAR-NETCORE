import { Encuesta } from "./EncuestaModel";
import { Campo } from "./CampoModel";

export interface CampoEnFormularios {
    id?: number;
    linkFormulario: string;
    idCampo: number;
    valor?: string;
    idCampoNavigation:Campo;
    linkFormularioNavigation: Encuesta;
  }
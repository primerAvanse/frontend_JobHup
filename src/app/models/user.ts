import { S } from "@fullcalendar/core/internal-common";

export class Usuario {
 idPersona: number;
        nombre: string;
        apellidoPatern: string;
        apellidoMaterno: string;
        fechaNacimiento: Date;
        sexo: string;
        telefono: string;
        correo: string;
        direccion: string;
        estado: boolean;
        dni: string
}
export class UserSession {
  idUsuario: number;
  idPersona: number;
  estado: boolean;
  esEmpelado: boolean;
  esEmpelador: boolean;

  persona: Usuario;

  nombreUsua:string;
  fechaRegistro: Date;
  clave: string
}

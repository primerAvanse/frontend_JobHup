import { Injectable } from '@angular/core';
import { SaveUsuario } from '../models/Usuario/usuario';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';
import { config } from './../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class UserioServiceService {

  constructor(private base: BaseService) { }

  registrarUsua(usuario: SaveUsuario ): Observable<Boolean> {
    return this.base.ExecuteHttpPost<Boolean>(config.registrarUsua + 'registro', {
      nombreUsua: usuario.Nombre,
      claveUsua: usuario.ClaveUsua,
      sexo: usuario.Sexo,
      telefono: usuario.Telefono,
      dni: usuario.Dni,
      fechaNacimiento: usuario.FechaNacimiento,
      direccion: usuario.Direccion,
      apellidoMaterno: usuario.ApellidoMaterno,
      correo: usuario.Correo,
      nombre: usuario.Nombre,
      apellidoPaterno: usuario.ApellidoPaterno
    })
  }
}

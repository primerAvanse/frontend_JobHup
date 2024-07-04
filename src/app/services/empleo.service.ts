import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Observable } from 'rxjs';
import { SaveUsuario } from '../models/Usuario/usuario';
import { config } from 'src/environments/environment';
import { EmpleoResponse } from '../models/Empleo/EmpleoDto';

@Injectable({
  providedIn: 'root'
})
export class EmpleoService {

  constructor(private base: BaseService) { }

  ListarEmpleos(idCategoria:Number, idCiudad: Number ): Observable<EmpleoResponse[]> {
    return this.base.ExecuteHttpPost<EmpleoResponse[]>(config.empleoService + 'buscar', {
      idCiudad: idCategoria,
      idCategoria: idCiudad
    })
  }

}

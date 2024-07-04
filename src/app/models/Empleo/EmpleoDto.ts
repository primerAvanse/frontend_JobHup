
export class EmpleoResponse {
    idCategoria: Number;
    idCiudad: Number;
    Nombre: string;
    Descripcion: string;
    ExperienciaRequerida: string;
    CarrerasAfines: string;
    ModoEmpleo: string;
    Direccion: string;
    TipoHorarion: string;
    categoria: Categoria;
    ciudad: Ciudad;
     }
  
  export class Categoria {
    idCategoria: Number;
    estado: Boolean;
    descripcion: String;
  }
  
  export class Ciudad {
     idCiudad: Number;
    nombre: String;
   
  }
  
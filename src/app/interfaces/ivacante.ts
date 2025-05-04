import { Icategoria } from "./icategoria";
import { Iempresa } from "./iempresa";

export interface Ivacante {
    idVacante: string;
    nombre: string;
    descripcion: string;
    fecha: string; 
    salario: number;
    detalles: string;
    estado: boolean;
    destacado?: boolean;  
    imagen: string;
    idCategoria: number;
    idEmpresa: number;

}

export interface IUsuario {
    email: string;
    password: string;
    [key: string]: any; // Por si el backend devuelve más cosas
}

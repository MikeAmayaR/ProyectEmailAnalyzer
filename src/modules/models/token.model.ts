export interface PayloadToken {
  email: string;
  sub: number;
  name: string;
  lastName: string;
  role: number;
  status: number;
} //ejemplo de un modelo de jwt si se quiere iniciar sesion antes de poder recibir la url del mail

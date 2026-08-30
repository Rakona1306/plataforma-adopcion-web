export interface ValidateDniResponse {
  success: boolean;
  data: {
    dni: string;
    nombres: string;
    apellidoPaterno: string;
    apellidoMaterno: string;
    nombreCompleto: string;
  };
}

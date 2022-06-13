export interface UserData {
  userId?: string | undefined;
  name: string;
  Email: string;
  cep: string;
  password: string;
  fone: string;
  cpf: string;
  picture: string | Blob;
  cv: string | Blob;
  description: string;
  birthdate: string;
}

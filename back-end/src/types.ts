export interface User {
  id: number;
  userName: string;
  email: string;
  password: string;
  created_at: Date;
  about: string;
}

export interface JWT {
  id: number;
  userName: string;
}

export interface User {
  id: number;
  email: string;
  password: string;
  status?: string;
}

export interface Createuser {
  username: string;
  email: string;
  password: string;
  status?: string;
  entered_at?: Date;
  updated_at?: Date;
}
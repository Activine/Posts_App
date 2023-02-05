export interface User {
  email: string;
  password: string;
  showPassword: boolean;
  acceptTerms?: boolean;
  returnSecureToken: boolean;
}

export interface FbAuthResponse {
  idToken: string;
  expiresIn: string;
}


export interface Post {
  id?: string,
  title: string,
  author: string,
  text: string,
  date: Date
}

export interface FBCreateResponse {
  name: string
}

export type AlertType = 'success' | 'warning' | 'danger'

export interface Alert {
  type: AlertType;
  text: string;
}

export interface BackendHero {
  _id: string;
  id: string;
  name: string;
}
export interface Hero {
  _id?: string;
  number: string;
  name: string;
}

export interface User {
  _id: string;
  email: string,
  permissions: Array<string>,
  isVerified: boolean,
  name: {
    firstName: string,
    lastName: string,
    showName: boolean,
  }
}
export interface Hero {
  number: number;
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
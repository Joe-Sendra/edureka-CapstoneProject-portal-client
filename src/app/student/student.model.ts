export class Leave {
  requestID: string;
  requestDate: Date;
  status: string; // TODO approved, pending, rejected
  startDate: Date;
  endDate: Date;
}

export class Student {
  email: string; // TODO can this be used as the id?
  registrationNumber: string;
  isRegistered?: boolean;
  isLockedOut?: boolean;
  resetPassword?: boolean;
  name?: {
    first: string;
    last: string;
  };
  address?: {
    street: string;
    city: string;
    state: string;
    zipcode: string;
  };
  phone?: {
    home: string;
    work: string;
    mobile: string;
  };
  leave?: [Leave];
  class?: [{}]; // TODO define class (for both student and faculty)
}

export class LeaveRequest {
  requestID: string;
  requestDate: Date;
  status: string; // TODO approved, pending, rejected
  startDate: Date;
  endDate: Date;
}

export class Student {
  _id?: string;
  email: string;
  password?: string;
  role: string;
  isLockedOut?: boolean;
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
  leave?: [LeaveRequest];
  class?: [{}]; // TODO define class (for both student and faculty)
}

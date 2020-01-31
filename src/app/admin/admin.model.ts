// TODO add password
export class Admin {
  email: string;
  name: {
    first: string;
    last: string;
  };
  office: {
    building: string;
    number: string;
  };
  class?: [{
    id: string;
    semester: string; // TODO consider replacing this with an object
    name: string;
    students?: [string]; // TODO replace with Student[] once student model is created
  }];
}

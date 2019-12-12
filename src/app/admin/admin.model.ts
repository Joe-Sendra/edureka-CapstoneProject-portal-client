export class Admin {
  email: string; // TODO determine if this will be the unique id
  name: {
    first: string;
    last: string;
  };
  office: {
    building: string;
    number: string;
  };
  class: [{
    id: string;
    semester: string; // TODO consider replacing this with an object
    name: string;
    students: [string]; // TODO replace with Student[] once student model is created
  }];
}

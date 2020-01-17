export class GatePass {
  created: Date;
  _id: string;
  student: string;
}

export class TimeTable {
  gatePass: GatePass[];
  _id: string;
  examDate: string;
  examTime: string;
}

// TODO determine if class? and faculty? are needed
export class Exam {
  _id: string;
  name: string;
  location: string;
  timeTable: TimeTable[];
  class?: {};
  faculty?: {};
}

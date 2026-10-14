interface Person {
  name: string;
}

export class Student implements Person {
  constructor(public name: string, private marks: number) {}

  isPassed(): boolean {
    return this.marks >= 40;
  }
}

export const asha = new Student('Asha', 72);

export class Event {
  //constructor with no  parameters
  //the use of ! is to tell the compiler that the variable will be initialized later
  id!: bigint;
  //id1?:bigint;//? means that the variable is optional(id1 can be null)
  name!: string;
  description!: string;
  theme!: string;
  date!: Date;
  budget!: number;
  nbPlaces!: number;
}

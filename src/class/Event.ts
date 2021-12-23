interface EventArgs {
  id: string;
  time: string;
  name: string;
  description: string;
}

class Event {
  id: string;
  time: string;
  name: string;
  description: string;

  constructor(args: EventArgs) {
    this.id = args.id;
    this.time = args.time;
    this.name = args.name;
    this.description = args.description;
  }

  static parse(values: string) {
    return values
      .split("\n")
      .map(
        line => line.split(';')
      )
      .map(
        ([id, time, name, description]) =>
          new Event({ id, time, name, description })
      );
  }
}

export { Event };

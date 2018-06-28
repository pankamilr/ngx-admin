export class Destination {
    constructor(
        public id: number,
        public user_id: number,
        public name: string,
        public surname: string,
        public phone: number,
        public created_by: number,
    ) {}
}

export class Location {
  constructor(public latitude: number = 53.9, public longitude: number = 27.5667) {
  }
}
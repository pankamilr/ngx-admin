export class Direction {
    constructor(
        public id: number,
        public client_id: string,
        public country: string,
        public country_code: string,
        public city: string,
        public postcode: string,
        public address_1: string,
        public address_2: string,
    ) {}
}
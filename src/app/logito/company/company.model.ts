export class Company {
    constructor(
        public id: number,
        public name: string,
        public nip: number,
        public email: string,
        public phone: number,
        public created_by: number,
        public country: string,
        public country_code: string,
        public city: string,
        public postcode: string,
        public address_1: string,
        public address_2: string
    ) {}
}
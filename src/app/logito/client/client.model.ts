export class Client {
    constructor(
        public id: number,
        public name: string,
        public surname: string,
        public email: string,
        public phone: number,
        public created_by: number,
        public type: number,
        public is_private: boolean,
        public directions: any,
        public company: any,
    ) {}
}
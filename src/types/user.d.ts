declare interface Document extends Record<string, any> {
    id: string;
}

declare interface User extends Document {
    email: string;
    name: string;
}
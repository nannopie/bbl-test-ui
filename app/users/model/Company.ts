import { User } from "./User";

export interface Company {
    id: number;
    name: string;
    catchPhrase: string;
    bs: string;
    user?: User[];
}
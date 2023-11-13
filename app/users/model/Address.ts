import { Geo } from "./Geo";
import { User } from "./User";

export interface Address {
    id: number;
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo?: Geo;
    geoId: number;
    user?: User[];
}
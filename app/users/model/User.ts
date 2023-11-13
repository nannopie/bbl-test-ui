import { Address } from "./Address";
import { Company } from "./Company";

export interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    address?: Address;
    addressId: number;
    phone: string;
    website: string;
    company?: Company;
    companyId: number
}
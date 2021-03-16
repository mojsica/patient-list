import { Address } from './address';

export interface Patient{
    id?: number;
    registeredDate?: string;
    firstName?: string;
    lastName?: string;
    dateBirth?: Date;
    vat?: string;
    doctor?: number;
    addresses?: Address[];
}

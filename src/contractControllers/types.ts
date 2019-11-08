import { ResponseContractData } from './../contractData/ResponseContractData';
export interface WavesAddressData extends ResponseContractData {
    type: string;
    key: string;
    value: string; // May be stringified JSON
}
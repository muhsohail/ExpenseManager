import { Province } from './Province';
import { City } from './City';

export class EditMillViewModel {
    Id: number;
    Name: string;
    Product: string;
    ManagerName: string;
    ManagerCell: number;
    CityId: number;
    ProvinceId: number;
    FabricId: number;
    province: Province;
    city: City;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}
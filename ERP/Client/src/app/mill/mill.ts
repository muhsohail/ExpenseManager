//import { Province } from './mill';

export class mill {
    Id: number;
    Name: string;
    Product: string;
    ManagerName: string;
    ManagerCell: number;
    CityId: number;
    ProvinceId: number;
    FabricId: number;
   // province: Province;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}
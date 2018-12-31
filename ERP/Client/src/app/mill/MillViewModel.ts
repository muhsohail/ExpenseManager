export class MillViewModel {
    Id: number;
    Name: string;
    Product: string;
    ManagerName: string;
    ManagerCell: number;
    CityId: number;
    CityName: string;
    ProvinceId: number;
    ProvinceName: string;
    FabricId: number;
    FabricName: string;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}
export class City {
    constructor(id: number, name: string, isHidden: boolean) {
        this.id = id;
        this.name = name;
        this.isHidden = isHidden;
    }

    id: number;
    name: string;
    isHidden: boolean;
}
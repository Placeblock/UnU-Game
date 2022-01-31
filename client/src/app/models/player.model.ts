export class Player {
    private readonly uuid: string;
    private name: string;

    constructor(uuid: string, name: string) {
        this.uuid = uuid;
        this.name = name;
    }

    getName(): string {
        return this.name;
    }

    setName(name: string) {
        this.name = name;
    }

    getUUID(): string {
        return this.uuid;
    }

}

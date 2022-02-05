
export abstract class UnUCard {
    protected readonly uuid: string;
    protected abstract readonly weight: number;

    constructor(uuid: string) {
        this.uuid = uuid;
    }

    abstract asJson(): {};

    public getUUID(): string {
        return this.uuid;
    }

    public getWeight(): number {
        return this.weight;
    }

    public test(test: string) {

    }
}

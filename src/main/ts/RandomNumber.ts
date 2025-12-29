export const RNGenum = {
    FP: "FloatingPoint" as string,
    INT: "Integer" as string,
    ZERO: "Zero" as string
} as const;

export type TypeRNG = (typeof RNGenum)[keyof typeof RNGenum];

export class RandomNumber {
    private _value!: number | undefined;
    constructor(t: TypeRNG, scale?: number) {
        switch (t) {
            case RNGenum.FP:
                this.rngValue = (Math.random());
                break;
            case RNGenum.INT:
                this.rngValue =
                    ( scale === undefined)
                    ? (Math.round(Math.random()))
                    : Math.ceil(Math.random() * scale );
                break;
            case RNGenum.ZERO:
                this.rngValue = 0;
                break;
            default:
                this.rngValue = undefined;
                break;
        }
    }

    public set rngValue(v: number|undefined) {
        this._value = v;
    }

    public get rngValue(): number|undefined {
        return this._value;
    }

    /**
     * checkNumberType
     */
    public checkNumberType(): string {
        if (typeof this._value !== "number" || Number.isNaN(this._value)) {
            return "undefined";
        }
        return Number.isInteger(this._value) ? "integer" : "float";
    }
}

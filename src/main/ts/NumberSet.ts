import {generateNormalNumbers} from "./generateNormalNumbers.ts";
export const DistributionEnum = {
    NORMAL: "Normal" as string,
    RAND: "Random" as string
} as const;

export type Distribution = (typeof DistributionEnum)[keyof typeof DistributionEnum];

export class IntegerSet extends Array {
    private _numbers: number[] = [];
    /**
     * Getter
     */
    public get numbers(): number[] {
        return this._numbers;
    }
    /**
     * Setter
     */
    public set numbers(value: number[]) {
        this._numbers = value;
    }

    constructor(total: number, distribution: Distribution, mean?: number, stdDev?: number) {

        super();
        const ArrayList: number[] = [];
        if (distribution === DistributionEnum.NORMAL) {
            for (let item = 0; item < total; item++) {
                if (mean !== undefined && stdDev !== undefined) {
                    ArrayList.push(Math.ceil(generateNormalNumbers(mean, stdDev)));
                } else {
                    ArrayList.push(Math.ceil(generateNormalNumbers(0, 1)));
                }

            }
        } else if (distribution  === DistributionEnum.RAND) {
            for (let item = 0; item < total; item++) {
                ArrayList.push((mean === undefined) ? Math.random() : Math.ceil(2 * mean * Math.random()));

            }
        } else {
            throw new Error("Invalid Parameters");

        }
        this.numbers = ArrayList;
    }
}

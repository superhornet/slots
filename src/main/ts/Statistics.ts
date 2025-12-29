interface IStatisticsType {
    count: number;
    sum: number;
    mean: number;
    median: number | undefined;
    mode: number[] | null;
    min: number;
    max: number;
    variance: number;
    sigma: number;
}
export class Statistics {
    private _analysis: IStatisticsType = {
        count: 0,
        max: 0,
        mean: 0.5,
        median: 0,
        min: 0,
        mode: null,
        sigma: 1,
        sum: 0,
        variance: 1
    };
    private _values: number[] = [];

    constructor(input: number[]) {
        this.values = input;
        this.analysis = this.analyze();
    }
    private analyze(): IStatisticsType {
        const stats: IStatisticsType = {
            count: 0,
            max: 0,
            mean: 0,
            median: 0,
            min: 0,
            mode: null,
            sigma: 0,
            sum: 0,
            variance: 0,
        };
        // validate input
        if (!Array.isArray(this.values) || this.values.length === 0) {
            throw new Error("Cannot analyze empty data");
        }
        if (!this.values.every(
                (element) => typeof element === "number"
                    && !Number.isNaN(element)
                    && Number.isFinite(element))) {
            throw new Error("Input data must contain only valid, finite, numbers");
        }

        stats.count = this.values.length;
        stats.sum = this.values.reduce((acc, val) => acc + val, 0);
        stats.mean = stats.sum / stats.count;

        // median calculation
        const sortedInput: number[] = [...this.values].sort((a, b) => a - b);
        const sortedCount = sortedInput.length;
        const mid = Math.floor(sortedCount / 2);
        const evenValue = sortedInput[mid - 1];
        const oddValue = sortedInput[mid];
        if (sortedCount % 2 !== 0 && sortedInput.length >= sortedCount) {
            stats.median = oddValue;
        } else {
            stats.median = (evenValue && oddValue) ? (evenValue + oddValue) / 2 : undefined;
        }
        // Mode calculation
        const frequencyMap = new Map<number, number>();

        let maxFrequency = 0;
        sortedInput.forEach((entry) => {
            const frequency = (frequencyMap.get(entry) || 0) + 1;
            frequencyMap.set(entry, frequency);
            if (frequency > maxFrequency) { maxFrequency = frequency; }
        });
        stats.mode = (maxFrequency > 1)
            ? Array.from(frequencyMap.entries())
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                .filter(([_, frequency]) => (frequency === maxFrequency))
                .map(([entry]) => entry)
            : null;
        stats.min = sortedInput[0] || 0;
        stats.max = sortedInput[sortedInput.length - 1] || 0;

        // stats.variance = this.values.reduce((acc, val) =>
        //     acc + Math.pow(val - stats.mean, 2), 0) / stats.count;
        // };
        stats.variance = this.values.reduce((acc, val) =>
            acc + Math.pow(val - stats.mean, 2)
        , 0) / stats.count;
        stats.sigma = Math.sqrt(stats.variance);
        return stats;
    }

    public get analysis() {
        return this._analysis;
    }
    public set analysis(value) {
        this._analysis = value;
    }
    public get values(): number[] {
        return this._values;
    }
    public set values(value) {
        this._values = value;
    }
}

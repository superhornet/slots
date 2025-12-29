import { DistributionEnum, IntegerSet as NumberSet } from "../NumberSet.ts";
import { RandomNumber, RNGenum } from "../RandomNumber.ts";
interface ITile {
    baseValue: number,
    chance: number,
    icon: string,
    name: string,
    value: number,
}
interface IIcon {
    icons: Array<ITile>
}
type IProbTable = {
    index: number,
    icon: string,
    min: number,
    max: number
}
export class SlotMachine {
    private _wheels: number
    private _lastRoll!: Array<Array<string>>;
    private _lastEntry!: string;
    private _dangerProbability!: number;
    private _icons: IIcon = {
        icons: [{
            baseValue: 2,
            chance: .194,
            icon: "🍒",
            name: "cherry",
            value: 1,
        },
        {
            baseValue: 2,
            chance: .194,
            icon: "🍋",
            name: "lemon",
            value: 2,
        },
        {
            baseValue: 3,
            chance: .149,
            icon: "🍀",
            name: "clover",
            value: 3,
        },
        {
            baseValue: 3,
            chance: .149,
            icon: "🔔",
            name: "bell",
            value: 4,
        },
        {
            baseValue: 5,
            chance: .119,
            icon: "💎",
            name: "diamond",
            value: 5,
        },
        {
            baseValue: 5,
            chance: .119,
            icon: "🏆",
            name: "trophy",
            value: 6,
        },
        {
            baseValue: 7,
            chance: .075,
            value: 7,
            name: "seven",
            icon: "🎰"
        },
        {
            baseValue: 0,
            chance: .005,
            value: 8,
            name: "six",
            icon: "🧨"
        },
        {
            baseValue: 10,
            chance: .000, //converts with white phone
            value: 9,
            name: "nine",
            icon: "💡",
        }]
    };
    private _probTable!: Array<IProbTable>;
    constructor(wheels: number = 5) {
        this._wheels = wheels;
        this.lastEntry = "";
        const dangerChance = this.icons.icons.at(7)?.chance;
        this.dangerProbability = (dangerChance as number) * 3;
        this.calcProbTable();
    }
    /**
     * calcProbTable
    */
    public calcProbTable() {
        const icons = this.icons.icons;

        const probTable: Array<IProbTable> = [];
        let accumulator = 0;
        icons.forEach(i => {
            probTable.push({
                index: i.value,
                icon: i.icon,
                min: accumulator,
                max: (accumulator += i.chance)
            });
        });
        this.probTable = probTable;
    }
    /**
     * floatToTile
    */
    public floatToTile(val: number): string | undefined {
        const probs: Array<IProbTable> = this.probTable;

        const filtered = probs.filter((e) => {
            return (val <= e.max) && (val > e.min)
        });

        return (filtered[0]?.icon)
    }
    /**
     * floatToIndex
    */
    public floatToIndex(val: number): number | undefined {
        const probs: Array<IProbTable> = this.probTable;

        const filtered = probs.filter((e) => {
            return (val <= e.max) && (val > e.min)
        });

        return (filtered[0]?.index)
    }
    /**
     * inDanger
    */
    public inDanger(): boolean {
        const dangerDecimal: number = new RandomNumber(RNGenum.FP).rngValue as number;
        return (dangerDecimal < this.dangerProbability) ? true : false;
    }
    /**
     * howLucky
    */
    public howLucky(): number {
        const luck: number = new RandomNumber(RNGenum.INT, 15).rngValue as number;
        return luck;
    }
    /**
     * spin
    */
    public spin() {
        const wheel_size = 3;
        const wheels_per_machine = this._wheels;
        const slotMachine: Array<Array<ITile>> = [];

        for (let wheel_i = 0; wheel_i < wheels_per_machine; wheel_i++) {

            const wheel: Array<ITile> = [];
            while (wheel.length < wheel_size) {
                const floatSet = new NumberSet(wheel_size, DistributionEnum.RAND).numbers;
                floatSet.forEach(element => {
                    if (!Number.isInteger(element) && Number.isFinite(element))
                        wheel.push(this.icons.icons[this.floatToIndex(element) as number - 1] as ITile)
                });
            }
            slotMachine.push(wheel as Array<ITile>);

        }
        console.log(`Lucky: ${this.howLucky()}`);
        console.log(`${slotMachine.at(4)?.at(0)?.icon} ${slotMachine.at(3)?.at(0)?.icon} ${slotMachine.at(2)?.at(0)?.icon} ${slotMachine.at(1)?.at(0)?.icon} ${slotMachine.at(0)?.at(0)?.icon}`)
        if (this.inDanger()) {
            console.log(`${slotMachine.at(4)?.at(1)?.icon} 🧨 🧨 🧨 ${slotMachine.at(0)?.at(1)?.icon}`)
        } else {
            console.log(`${slotMachine.at(4)?.at(1)?.icon} ${slotMachine.at(3)?.at(1)?.icon} ${slotMachine.at(2)?.at(1)?.icon} ${slotMachine.at(1)?.at(1)?.icon} ${slotMachine.at(0)?.at(1)?.icon}`)
        }
        console.log(`${slotMachine.at(4)?.at(2)?.icon} ${slotMachine.at(3)?.at(2)?.icon} ${slotMachine.at(2)?.at(2)?.icon} ${slotMachine.at(1)?.at(2)?.icon} ${slotMachine.at(0)?.at(2)?.icon}`)
        console.log('Again!!!');

    }
    /**
     * showValues
    */
    public showValues() {
        const icons = this.icons.icons;
        let buffer: string = '';
        icons.forEach(icon => {
            if (icon.value <= 7) {
                buffer += `${icon.icon} ${icon.baseValue}🪙  `;
                if (icon.value % 3 === 0) { buffer += '\n'; }
            }
        });
        console.log(buffer);
    }
    /**
     * showChance
    */
    public showChance() {
        const icons = this.icons.icons;
        let accumulator = 0;
        //console.log(`🧨 (${accumulator}, ${this.dangerProbability})`);
        //accumulator+=this.dangerProbability;
        icons.forEach(icon => {
            console.log(`${icon.icon} (${accumulator}, ${accumulator += icon.chance})`);
        });
    }
    /**
     * processInput
    */
    public processInput() {
        switch (this.lastEntry) {
            case "1":
                this.spin();
                break;
            case "2":
                this.showValues();
                break;
            case "3":
                this.showChance();
                break;
            case "4":
                process.exit();
            // eslint-disable-next-line no-fallthrough
            case "5":
                {
                    const n = new RandomNumber(RNGenum.FP).rngValue as number;
                    console.log(`${n} ${this.floatToTile(n)}`);
                }
                break;
            default:
                break;
        }
    }
    public get icons(): IIcon {
        return this._icons;
    }
    public set icons(value: IIcon) {
        this._icons = value;
    }
    public get lastEntry(): string {
        return this._lastEntry;
    }
    public set lastEntry(value: string) {
        this._lastEntry = value;
    }
    public get getLastRoll(): Array<Array<string>> {
        return this._lastRoll;
    }
    public set saveLastRoll(value: Array<Array<string>>) {
        this._lastRoll = value;
    }
    public get dangerProbability(): number {
        return this._dangerProbability;
    }
    public set dangerProbability(value: number) {
        this._dangerProbability = value;
    }
    public get probTable(): Array<IProbTable> {
        return this._probTable;
    }
    public set probTable(value: Array<IProbTable>) {
        this._probTable = value;
    }
}

import { DistributionEnum, IntegerSet } from "../IntegerSet.ts";

interface ITile {
    baseValue: number
    chance: number
    icon: string,
    name: string,
    value: number,
}
interface IIcon {
    icons: Array<ITile>
}
export class SlotMachine {
    private _wheels: number
    private _lastRoll!: Array<Array<string>>;
    public get getLastRoll(): Array<Array<string>> {
        return this._lastRoll;
    }
    public set saveLastRoll(value: Array<Array<string>>) {
        this._lastRoll = value;
    }
    private _lastEntry!: string;
    private _icons: IIcon = {
        icons: [{
            baseValue: 1,
            chance: .075, // 2*((100% - 1.5%)/7)
            icon: "🍒",
            name: "cherry",
            value: 1,
        },
        {
            baseValue: 1,
            chance: .075, // 2*((100% - 1.5%)/7)
            icon: "🍋",
            name: "lemon",
            value: 2,
        },
        {
            baseValue: 3,
            chance: .075, // 3*((100% - 1.5%)/7)
            icon: "🍀",
            name: "clover",
            value: 3,
        },
        {
            baseValue: 4,
            chance: .075, // 3*((100% - 1.5%)/7)
            icon: "🔔",
            name: "bell",
            value: 4,
        },
        {
            baseValue: 5,
            chance: .075, // 3*((100% - 1.5%)/7)
            icon: "💎",
            name: "diamond",
            value: 5,
        },
        {
            baseValue: 5,
            chance: .075, // 3*((100% - 1.5%)/7)
            value: 6,
            name: "trophy",
            icon: "🏆"
        },
        {
            baseValue: 7,
            chance: .1407, // ((100% - 1.5%)/7)
            value: 7,
            name: "seven",
            icon: "🎰"
        },
        {
            baseValue: 0,
            chance: .005, // 1.5% chance for triple 6
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
    constructor(wheels:number = 5) {
        this._wheels = wheels;
        this.lastEntry = "";
    }
    /**
     * roll
     */
    public roll() {
        const wheel_size = 12;
        const wheels_per_machine = this._wheels;
        const slotMachine: Array<Array<ITile|undefined>> = [];

        for (let wheel_i = 0; wheel_i < wheels_per_machine; wheel_i++) {

            const  wheel: Array<ITile|undefined> = [];
            while (wheel.length < wheel_size) {
                const intSet = new IntegerSet(wheel_size, DistributionEnum.RAND, 3.5).numbers;
                intSet.forEach(element => {
                    if(Number.isInteger(element) && Number.isFinite(element))
                    wheel.push(this.icons.icons[element-1])
                });
            }
            slotMachine.push(wheel);

        }
        console.log(`${slotMachine.at(4)?.at(0)?.icon} ${slotMachine.at(3)?.at(0)?.icon} ${slotMachine.at(2)?.at(0)?.icon} ${slotMachine.at(1)?.at(0)?.icon} ${slotMachine.at(0)?.at(0)?.icon}`)
        console.log(`${slotMachine.at(4)?.at(1)?.icon} ${slotMachine.at(3)?.at(1)?.icon} ${slotMachine.at(2)?.at(1)?.icon} ${slotMachine.at(1)?.at(1)?.icon} ${slotMachine.at(0)?.at(1)?.icon}`)
        console.log(`${slotMachine.at(4)?.at(2)?.icon} ${slotMachine.at(3)?.at(2)?.icon} ${slotMachine.at(2)?.at(2)?.icon} ${slotMachine.at(1)?.at(2)?.icon} ${slotMachine.at(0)?.at(2)?.icon}`)
    }
    /**
     * processInput
    */
    public processInput() {
        switch (this.lastEntry) {
            case "1":
                this.roll();
                break;
            case "2":
                break;
            case "3":
                break;
            case "4":
                process.exit();
            // eslint-disable-next-line no-fallthrough
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
}

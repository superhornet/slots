import { DistributionEnum, IntegerSet } from "../IntegerSet.ts";
import { RandomNumber, RNGenum } from "../RandomNumber.ts";
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
    constructor(wheels: number = 5) {
        this._wheels = wheels;
        this.lastEntry = "";
        const dangerChance = this.icons.icons.at(7)?.chance;
        this.dangerProbability = (dangerChance as number) * 3;
    }
    /**
     * inDanger
    */
    public inDanger(): boolean {
        const dangerDecimal: number = new RandomNumber(RNGenum.FP).rngValue as number;
        return ( dangerDecimal < this.dangerProbability)?true:false;
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
                const intSet = new IntegerSet(wheel_size, DistributionEnum.RAND, 3.5).numbers;
                intSet.forEach(element => {
                    if (Number.isInteger(element) && Number.isFinite(element))
                        wheel.push(this.icons.icons[element - 1] as ITile)
                });
            }
            slotMachine.push(wheel as Array<ITile>);

        }
        console.log(`Lucky: ${this.howLucky()}`);
        console.log(`${slotMachine.at(4)?.at(0)?.icon} ${slotMachine.at(3)?.at(0)?.icon} ${slotMachine.at(2)?.at(0)?.icon} ${slotMachine.at(1)?.at(0)?.icon} ${slotMachine.at(0)?.at(0)?.icon}`)
        if(this.inDanger()){
        console.log(`${slotMachine.at(4)?.at(1)?.icon} 🧨 🧨 🧨 ${slotMachine.at(0)?.at(1)?.icon}`)
        }else{
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
                if(icon.value % 3 === 0){ buffer += '\n';}
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
            console.log(`${icon.icon} (${accumulator}, ${accumulator+=icon.chance})`);
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
}

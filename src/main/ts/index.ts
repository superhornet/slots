import { MenuDisplay } from "./Menu/MenuDisplay.ts";
import readlinePromises from "node:readline/promises";
import { SlotMachine } from "./Menu/SlotMachine.ts";
console.log("Let's go Gambling");

console.info("🍒🍋🍀🔔💎🏆🎰🧨💡");
const rl = readlinePromises.createInterface({
    input: process.stdin,
    output: process.stdout
});
MenuDisplay.Display()
const slotMachine = new SlotMachine();
rl.on('line',(line)=>{
    slotMachine.lastEntry = line;

    slotMachine.processInput();
})

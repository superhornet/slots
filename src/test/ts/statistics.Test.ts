import { describe, it, test } from "node:test";
import assert from "node:assert";
import { Statistics } from "../../main/ts/Statistics.ts";
describe("Statistics exception handling", () => {
    it("is empty", () => {
        const statSet: Array<number> = []
        test("And throws an error", () => {
            assert.throws(() => {
                new Statistics(statSet);
            }, Error)
        })
    })
    it("Has an invalid element", () => {
        const statSet: Array<number|string> = [12, 4, 'a'];
        test("And throws an error", () => {
            assert.throws(()=>new Statistics(statSet), Error)
        })
    })
})
describe("Stats on Normal Distribution Integers", ()=>{
    const statSet: Array<number> = [9,5,5,12,8,7,7,6,8,8,7,3,14,-3,6,-5,3,4,2,4];
    it("Set has 20 elements", ()=>{
        test("Count of elements", ()=>{
            assert.strictEqual(statSet.length, 20);
        })
    })
    it("Statistics", ()=>{
        const stats = new Statistics(statSet);
        test("Has an object datastructure", () => {
            assert.equal(typeof stats.analysis, 'object');
        })
        test("Has 20 entries", () => {
            assert.strictEqual(stats.analysis.count, 20);
        })
    })
})
describe("Stats on random Distribution Integers", ()=>{
    const statSet: Array<number> = [0,1,2,3,4,5,6];
    it("Set has 7 elements", ()=>{
        test("Count of elements", ()=>{
            assert.strictEqual(statSet.length, 7);
        })
    })
    it("Statistics", ()=>{
        const stats = new Statistics(statSet);
        test("Has an object datastructure", () => {
            assert.equal(typeof stats.analysis, 'object');
        })
        test("Has 7 entries", () => {
            assert.strictEqual(stats.analysis.count, 7);
        })
    })
})

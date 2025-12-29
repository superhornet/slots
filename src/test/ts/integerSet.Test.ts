import { describe, it, test } from "node:test";
import assert from "node:assert";
import { IntegerSet, DistributionEnum } from "../../main/ts/IntegerSet.ts";

describe("Integer Set", ()=>{
    //Arrange, Act, Assert
    let intSet: Array<number> = [];
    it("Generate nothing", ()=>{
        intSet = new IntegerSet(0, DistributionEnum.RAND);
    })
    test("is Empty when instantiated", ()=>{
        assert.equal(intSet.length, 0)
    })
})

describe("Set of 10 random integers", ()=>{
    //Arrange, Act, Assert
    let intSet: Array<number> = [];
    it("Generates a set of 10 values", ()=>{
        intSet = new IntegerSet(10, DistributionEnum.RAND, 5).numbers;
    })
    test(`Set {${intSet.toString()}} has 10 entries`, ()=>{
        assert.equal(intSet.length, 10);
    })
})
describe("Set of 20 normal integers", ()=>{
    //Arrange, Act, Assert
    let intSet: Array<number> = [];
    it("Generate a set of 10 values", ()=>{
        intSet = new IntegerSet(20, DistributionEnum.NORMAL, 5, 4).numbers;
    })
    test(`Set {${intSet.toString()}} has 10 entries`, ()=>{
        assert.equal(intSet.length, 20);
    })
})
describe("Set of 500 normal integers", ()=>{
    let intSet: Array<number> = [];
    it("Has a distribution of (0,1)", ()=>{
        intSet = new IntegerSet(500, DistributionEnum.NORMAL).numbers;
    })
    test("500 values", ()=>{
        assert.strictEqual(intSet.length, 500);
    })
})
describe("Integer Set exception handling", ()=>{
    it("Has an invalid distribution", ()=>{
        let intSet: Array<number> = [];
        test("And throws an error", ()=>{
            assert.throws(()=>{
                intSet = new IntegerSet(12, "Strange", 18, 5).numbers;

            }, Error)
        })
        test("Set is still empty", ()=>{
            assert.equal(intSet.length, 0);
        })
    })
})

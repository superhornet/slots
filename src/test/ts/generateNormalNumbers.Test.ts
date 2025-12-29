import { describe, it, test } from "node:test";
import assert from "node:assert";
import { generateNormalNumbers } from "../../main/ts/generateNormalNumbers.ts";

describe("Test Normal Distribution Number Generation", ()=>{
    let generatedNumber = 0;
    it("Default parameter (0,1)", ()=>{
        generatedNumber = generateNormalNumbers();
        test(`${generatedNumber} Should be valid`, ()=>{
            assert.equal(Number.isFinite(generatedNumber), true);
        })
    })
    it("Attempt to generate a number (pi, infinity)", ()=>{
        test("Should throw an exception", ()=>{
            assert.throws(()=>{
                generatedNumber = generateNormalNumbers(Math.PI, Infinity);

            }, Error)
        })
    })
})

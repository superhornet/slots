import { describe, it, test } from "node:test";
import assert from "node:assert";
import { RNGenum, RandomNumber } from "../../main/ts/RandomNumber.ts";
describe("Random Number Exception Handling", () => {
    test("Zero number value", () => {
        const rn = new RandomNumber(RNGenum.ZERO);
        assert.strictEqual(rn.rngValue, 0);
    })
    test("invalid number value", () => {
        const rn = new RandomNumber("foobar");
        assert.strictEqual(rn.rngValue, undefined);
        assert.notEqual(rn.checkNumberType(), 'float');
    })
})
describe('The Random Number Generator makes a float', () => {
    const rn = new RandomNumber(RNGenum.FP);

    it(`Outputs a number: ${rn.rngValue}`, () => {
        assert.strictEqual(typeof rn.rngValue, 'number');
    });
    test('Should be a floating point number', () => {
        assert.strictEqual(rn.checkNumberType(),'float');
    })
});

describe('The Random Number Generator makes an int', () => {
    const rn = new RandomNumber(RNGenum.INT, 15);

    it(`Outputs a number: ${rn.rngValue}`, () => {
        assert.strictEqual(typeof rn.rngValue,'number');
    });
    test('Should be a whole number', () => {
        assert.strictEqual(rn.checkNumberType(),'integer');
    })
});

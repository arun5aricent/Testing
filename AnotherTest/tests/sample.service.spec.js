// Be descriptive with titles here. The describe and it titles combined read like a sentence.
describe('Sample factory', function () {
    it('as a dummy spec to test 2 + 2', function () {
        // An intentionally failing test. No code within expect() will never equal 4.
        expect(2 + 2).toEqual(4);
    });
});

describe("Sample factory", function () {
    var a;

    it("a suite is just a function", function () {
        a = true;

        expect(a).toBe(true);
    });
});



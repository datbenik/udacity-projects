import { performAction } from "../src/client/js/app"

describe("Test performAction() should exist" , () => {
    test("Function should exist", async () => {
        expect(performAction).toBeDefined();
    });
});

describe("Test performAction() should be a function" , () => {
    test("It should be a function", async () => {
        expect(typeof performAction).toBe("function");
    });
});

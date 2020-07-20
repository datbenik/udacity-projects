import { handleNewsSubmit } from "../src/client/js/formHandler"

describe("Test handleNewsSubmit() should exist" , () => {
    test("Function should exist", async () => {
        expect(handleNewsSubmit).toBeDefined();
    });
});

describe("Test handleNewsSubmit() should be a function" , () => {
    test("It should be a function", async () => {
        expect(typeof handleNewsSubmit).toBe("function");
    });
	
});
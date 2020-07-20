import { checkSubject } from "../src/client/js/nameChecker"

describe("Test checkSubject() should exist" , () => {
    test("Function should exist", async () => {
        expect(checkSubject).toBeDefined();
    });
});

describe("Test checkSubject() should be a function" , () => {
    test("It should be a function", async () => {
        expect(typeof checkSubject).toBe("function");
    });
});
	
describe("Test checkSubject() should return message when subject is empty" , () => {
    test("It should return a message", async () => {
		expect(checkSubject('')).toEqual('Please fill in what you are looking for');
    });
	
});
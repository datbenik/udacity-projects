import { checkDestination, checkTravelDate, checkReturnDate } from "../src/client/js/inputChecker"

describe("Test checkDestination() should exist" , () => {
    test("Function checkDestination should exist", async () => {
        expect(checkDestination).toBeDefined();
    });
});

describe("Test checkDestination() should be a function" , () => {
    test("It should be a function", async () => {
        expect(typeof checkDestination).toBe("function");
    });
});

describe("Test checkDestination() should return message when destination is empty" , () => {
    test("It should return a message", async () => {
		expect(checkDestination('')).toEqual('Please fill in your destination');
    });
});

describe("Test checkTravelDate() should exist" , () => {
    test("Function checkTravelDate should exist", async () => {
        expect(checkTravelDate).toBeDefined();
    });
});

describe("Test checkTravelDate() should be a function" , () => {
    test("It should be a function", async () => {
        expect(typeof checkTravelDate).toBe("function");
    });
});

describe("Test checkTravelDate() should return message when travel date is empty" , () => {
    test("It should return a message when empty", async () => {
		expect(checkTravelDate('')).toEqual('Please fill in your planned travel date');
    });
});

describe("Test checkTravelDate() should return message when travel date is invalid" , () => {
    test("It should return a message when invalid", async () => {
		expect(checkTravelDate('2020-01-40')).toEqual('Please fill in a valid travel date');
    });
});

describe("Test checkReturnDate() should exist" , () => {
    test("Function checkReturnDate should exist", async () => {
        expect(checkReturnDate).toBeDefined();
    });
});

describe("Test checkReturnDate() should be a function" , () => {
    test("It should be a function", async () => {
        expect(typeof checkReturnDate).toBe("function");
    });
});

describe("Test checkReturnDate() should not return message when return date is empty" , () => {
    test("It should return a message when empty", async () => {
		expect(checkReturnDate('', '')).toEqual(null);
    });
});

describe("Test checkReturnDate() should return message when return date is invalid" , () => {
    test("It should return a message when invalid", async () => {
		expect(checkReturnDate('2020-01-30','2020-01-40')).toEqual('Please fill in a valid return date');
    });
});

describe("Test checkReturnDate() should return message when return date is before travel date" , () => {
    test("It should return a message when before travel date", async () => {
		expect(checkReturnDate('2020-01-30','2020-01-10')).toEqual('Please make sure the return date is after the date of departure');
    });
});




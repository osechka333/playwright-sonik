import {test} from "../../fixtures/test.fixtures.js";
import {expect} from "@playwright/test";
import {USER} from "../../data/users.js";

test.describe("API", ()=>{
    test("should return user's cars", async ({client})=>{
        test.info().annotations.push({
            type: 'bug',
            description: "Known issue"
        })
        const response = await client.cars.getUserCars();
        expect(response.status, "Status code should be 200").toEqual(200);
    });

    test("should return user's cars 2", async ({clientWithUser})=>{
        const client = await clientWithUser({
            email: USER.email,
            password: USER.password,
        })
        const response = await client.cars.getUserCars();
        expect(response.status, "Status code should be 200").toEqual(200);
    });
})
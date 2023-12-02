import {test as base, request} from "@playwright/test";
import {STORAGE_STATE_USER_PATH} from "../data/storageState";
import ProfilePage from "../pages/ProfilePage";
import GaragePage from "../pages/GaragePage";
import AuthController from "../controllers/AuthController.js";
import CarController from "../controllers/CarContoller.js";
import {CookieJar} from "tough-cookie";
import {config} from "../../config/config.js";
import {USER} from "../data/users.js";

export const test = base.extend({
        userProfilePage: async ({browser}, use) => {
            const contextData = await browser.newContext({
                storageState: STORAGE_STATE_USER_PATH
            });
            const page = await contextData.newPage();
            const profilePage = new ProfilePage(page);
            await profilePage.navigate();
            await use(profilePage);
        },
        garagePage: async ({browser}, use) => {
            const contextData = await browser.newContext({
                storageState: STORAGE_STATE_USER_PATH
            });
            const page = await contextData.newPage();
            const garagePage = new GaragePage(page);
            await garagePage.navigate();
            await use(garagePage);
        },
        userApiClient: async({}, use) => {
            const contextData = await request.newContext({
                storageState: STORAGE_STATE_USER_PATH
            });
            await use(contextData);

            await contextData.dispose();
        },
    client: async ({page}, use)=>{
        const cookie = new CookieJar()
        const options = {
            baseUrl: config.apiURL,
            cookies: cookie
        }
        const authController = new AuthController(options)
        await authController.signIn({
            email: USER.email,
            password: USER.password,
        })
        await use({
            cars: new CarController(options),
            auth: authController
        })
    },
    clientWithUser: async ({page}, use)=>{
        async  function getClient(userData){
            const cookie = new CookieJar()
            const options = {
                baseUrl: config.apiURL,
                cookies: cookie
            }
            const authController = new AuthController(options)
            await authController.signIn(userData)

            return {
                cars: new CarController(options),
                auth: authController
            }
        }
        await use(getClient)
    },
    clientWithNewUser: async ({page}, use)=>{
        const userData = {
            "name": "John",
            "lastName": "Dou",
            "email": `test${Date.now()}@test.com`,
            "password": "Qwerty12345",
            "repeatPassword": "Qwerty12345"
        }
        console.log(userData.email)
        const cookie = new CookieJar();
        const options = {
            baseUrl: config.apiURL,
            cookies: cookie
        }
        const authController = new AuthController(options)
        // const userController = new UserController(options)
        // await authController.signUp(userData)
        await authController.signIn({
            email: userData.email,
            password: userData.password,
        })
        await use({
            cars: new CarController(options),
            auth: authController,
           // users: userController
        })

       // await userController.deleteCurrentUser()
        },
    }
)
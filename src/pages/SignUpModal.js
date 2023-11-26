import BasePage from "./BasePage";

export class SignUpModal extends BasePage {
    constructor(page) {
        super(page, '/', page.locator('app-signup-modal'));
        this.userNameInput = page.locator('#signupName');
        this.userLastNameInput = page.locator('#signupLastName');
        this.userEmailInput = page.locator('#signupEmail');
        this.userPasswordInput = page.locator('#signupPassword');
        this.userReEnterPasswordInput = page.locator('#signupRepeatPassword');
        this.signUpButton = page.locator('button:text("Sign up")');

        this.registrationButton = page.locator('.modal-footer .btn-primary');
        this.closeButton = page.locator('button.close');

        this.formTitle = page.locator('.modal-title');

        // warning panel
        this.nameWarningsPanel = page.locator('div.invalid-feedback');

        this.alertMessage = page.locator(".alert-danger")
    }

    async fillInput(locator, text) {
        await locator.click();
        await locator.fill(text);
    }

    async focusOutFromField() {
        await this.formTitle.click();
    }

    getRandomNumber() {
        return Math.round(Math.random() * 400);
    }

    async openSignUpWindow() {
        await this.signUpButton.waitFor(); //default option is visible
        await this.signUpButton.click();
    }

    async closeSignUpWindow() {
        await this.closeButton.click();
    }

    async getFieldBorderColor(field) {
        const color = field.evaluate((el) => {
            const style = window.getComputedStyle(el);
            return style.getPropertyValue("color");
        });
        return color;
    }

    async getWarningNotification(index) {
        await this.nameWarningsPanel.waitFor();

        return await this._page.locator('div.invalid-feedback p')
            .nth(index).innerText();
    }
}


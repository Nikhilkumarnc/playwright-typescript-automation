import { Page, Locator } from '@playwright/test';

export class OrderConfirmationPage {

    private readonly page: Page;

    private readonly confirmationMessageLoc: Locator;
    private readonly orderId: Locator;

    constructor(page: Page) {
        this.page = page;

        this.confirmationMessageLoc =
            this.page.locator('.hero-primary');

        this.orderId =
            this.page.locator("label[class='ng-star-inserted']");
    }

    async verifyOrderConfirmation() {
        return await this.confirmationMessageLoc.textContent();
    }

    async getOrderId() {
        return await this.orderId.textContent();
    }
}
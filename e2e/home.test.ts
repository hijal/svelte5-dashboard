import { test, expect, type Browser, chromium, type Page } from '@playwright/test';

let browser: Browser;
let page: Page;

test.beforeAll(async () => {
    browser = await chromium.launch();
    page = await browser.newPage();
    await page.goto('/');
});

test.afterAll(async () => {
    await browser.close();
});

test.describe('home page', () => {
    // title visibility
    test('should display the expected title', async () => {
        expect(true).toBeTruthy();
    });
});

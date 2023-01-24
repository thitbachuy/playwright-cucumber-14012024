import Utilities from "../../configurations/Utilities"
import Log from "../../configurations/Log";
import { expect } from "@playwright/test";
const path = require('path');
const utilities = new Utilities();
var log = new Log();

class BasePage {
    constructor(page) {
        this.page = page;
    }

    async verifyIfPageBodyHasText() {
        this.commonPage.verifyIfPageBodyHasText();
    }

    async scrollToBottom() {
        console.log('Scrolling to load the entire page content...');
        await this.page.mouse.wheel(0, 800);
        await this.simpleWaitUntilDomContentLoaded();
    }

    async scrollToLoadAllPage() {
        await this.scrollToBottom();
        await this.scrollToBottom();
        await this.scrollToBottom();
        await this.scrollToBottom();
        await this.scrollToBottom();
    }

    async scrollToElementThenClick(elementLocator) {
        console.log("Trying to click element with locator " + elementLocator);
        await this.page.locator(elementLocator).scrollIntoViewIfNeeded();
        await this.page.locator(elementLocator).click();
        console.log("clicked");
    }

    async scrollToSpecificElementThenClick(element) {
        console.log("Trying to click element ".concat(element));
        await element.scrollIntoViewIfNeeded();
        await element.click();
        console.log("clicked");
    }

    async simpleWaitUntilDomContentLoaded() {
        log.write("Wait until page content loaded...");
        // console.log("Wait until page content loaded...");
        await this.page.waitForLoadState("domcontentloaded");
        log.write("Page loaded successfully!");
        // console.log("Page loaded successfully!");
    }

    async simpleWaitUntilPageLoaded() {
        console.log("Waiting until page loaded...");
        await this.page.waitForLoadState("load");
        console.log("Page loaded successfully!");
    }

    async simpleWaitForNetworkConnections() {
        console.log("Waiting for the network connections...");
        await this.page.waitForLoadState("networkidle");
        console.log("Page loaded successfully!");
    }

    async verifyIfPageBodyHasText(text) {
        let attempts = 0;
        do {
            try {
                await expect(this.page.locator("body")).toContainText(text);
                log.write("Page body has expected texts: " + text);
                // console.log("Page body has expected text %s", text);
                break;
            } catch (err) {
                log.write("Page body has no expected text %s. Scroll down to find it...: ", +text);
                this.scrollToBottom();
                attempts++;
            }
        } while (attempts < 8);
        if (attempts === 8) throw utilities.formatString("Page body has no expected text {expected}", text);
    }

    async verifyIfPageBodyHasTexts(textList) {
        for (let text of textList) {
            await this.verifyIfPageBodyHasText(text);
        }
    }

    async verifyIfPageBodyDoNotHaveText(text) {
        await this.scrollToLoadAllPage();
        await expect(this.page.locator("body")).not.toContainText(text);
    }

    async verifyIfPageTitleIs(expectedPageTitle) {
        await this.page.waitForLoadState("load");
        await expect(this.page).toHaveTitle(expectedPageTitle);
        console.log("Current page title is %s as expected", expectedPageTitle);
    }

    async verifyIfCurrentUrlIs(expectedUrl) {
        await this.page.waitForLoadState("load");
        await expect(this.page).toHaveURL(expectedUrl);
        console.log("Current url is %s as expected", expectedUrl);
    }

    async goBack() {
        console.log("Going back");
        await this.page.goBack({ waitUntil: "load" });
    }

    async closeCurrentTab() {
        console.log("Closing the current tap");
        await this.page.close();
    }

    async getTextOfElement(elementLocator) {
        return await this.page.innerText(elementLocator);
    }

    async getTextOfSpecificElement(element) {
        return await element.textContent();
    }

    async verifyVisibilityOfElement(elementLocator) {
        console.log("Verifying visibility of element whose locator is %s", elementLocator);
        expect(this.page.isVisible(elementLocator));
    }

    async verifyInisibilityOfElement(elementLocator) {
        console.log("Verifying invisibility of element whose locator is %s", elementLocator);
        expect(this.page.isHidden(elementLocator));
    }

    async verifyTable(columnNameList, rowDataList) {
        let tableRowLocator = "thead";
        for (let columnName of columnNameList) {
            tableRowLocator = tableRowLocator + ":has(th:has-text('" + columnName + "'))";
        }
        tableRowLocator = tableRowLocator.concat("+ tbody");
        for (let rowData of rowDataList) {
            for (let data of rowData) {
                tableRowLocator = tableRowLocator + ":has(th:has-text('" + data + "'))";
                this.verifyVisibilityOfElement(tableRowLocator);
            }
        }
    }

    async getTextOfElementsHaveSameLocator(locator) {
        return await this.page.locator(locator).allTextContents();
    }

    async getInnerTextOfElementsHaveSameLocator(locator) {
        return await this.page.locator(locator).allInnerTexts();
    }

    async elementAttributeShouldBe(locator, attribute, attributeValue) {
        await expect(locator).toHaveAttribute(attribute, attributeValue);
        console.log("Value of the attribute \"%s\" of element %s is \"%s\" as expected", attribute, locator, attributeValue);
    }

    async clickElementAndDownloadFile(locator) {
        await this.scrollToElementThenClick(locator);
        let download = await this.page.waitForEvent('download');
        if (!await download.failure()) throw utilities.formatString("Failed to download after clicking {element}. Please recheck!", locator);
        let expectedPath = this.generateRandomPathInProject();
        await download.saveAs(expectedPath);
    }

    async generateTemporaryPathInProject() {
        let fileName = 'download_file_' + await utilities.generateActualDateTime();
        return path.join(__dirname, '/download/'.concat(fileName));
    }
}

export default BasePage;
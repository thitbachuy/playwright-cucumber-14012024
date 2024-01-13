import { setDefaultTimeout } from "@cucumber/cucumber";
import { fixture } from "../../hooks/pageFixture";
import TikiPage from "../../pages/tiki";
const { Given, When, Then } = require("@cucumber/cucumber");
import { expect } from "@playwright/test";
const { chromium } = require("@playwright/test");
setDefaultTimeout(60 * 1000 * 2)
let tikiPage : TikiPage;
Given("the user can open the link {string}", async (linkUrl: string) => {
    tikiPage = new TikiPage(fixture.page);
    await fixture.page.goto(linkUrl);
    fixture.logger.info("Navigated to the application")

});
When("the title page is {string}",async(title:string)=>{
    const actualTitle: string = await fixture.page.title();
    expect(actualTitle).toContain(title);
})
Then("the user enters {string} into {string} input",async(data:string, fieldName:string)=>{
    await tikiPage.enterData(data);
})

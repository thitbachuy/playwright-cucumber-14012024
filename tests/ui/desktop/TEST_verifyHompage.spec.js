// @ts-check
const { test } = require('@playwright/test');
import HomePage from '../../../objects/ui/desktop/HomePage';
import FileUtils from '../../../configurations/FileUtils';
import Log from "../../../configurations/Log";
var log = new Log();
var landingPageContentList = new FileUtils().parseYamlFile('./../data/desktop/HomePage.yml')["data"];

test('AT_A01 - Verify information displayed on the homepage', async ({ page }) => {
    let homePage = new HomePage(page);
    log.write("1. GO TO THE HOMEPAGE");
    await homePage.goTo();
    log.write("2. VERIFY TEXTS DISPLAYED");
    await homePage.verifyIfPageBodyHasTexts(["Search for your Favorite Course"]);
    await homePage.verifyIfPageBodyHasTexts(landingPageContentList["short presentation"]);
});

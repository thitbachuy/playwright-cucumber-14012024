import BasePage from '../BasePage.js';
import FileUtils from '../../../configurations/FileUtils';
import Utilities from "../../../configurations/Utilities";
import Log from '../../../configurations/Log';

var pageLocatorList = new FileUtils().parseYamlFile('./../data/desktop/HomePage.yml')['locators'];
var log = new Log();
const utilities = new Utilities();

class HomePage extends BasePage{
    constructor(page) {
        super(page);
        this.page = page;
    }

    async goTo() {
        await this.page.goto("https://www.guru99.com/");
        await this.landOn();
    }

    async verifyVisibilityOfElementsOnPage(elementList) {
        for (let element of elementList) {
            await this.verifyVisibilityOfElement(pageLocatorList[element]);
            log.write("Element %s is displaying on HomePage as expected", element);
            // console.log("Element %s is displaying on HomePage as expected", element);
        }
    }

    async clickElementOnPage(elementName) {
        await this.scrollToElementThenClick(pageLocatorList[elementName]);
        console.log("Clicked element %s on HomePage", elementName);
    }

    async landOn() {
        await this.simpleWaitUntilDomContentLoaded();
        await this.page.locator(pageLocatorList["page title"]).waitFor();
    }
}

export default HomePage;


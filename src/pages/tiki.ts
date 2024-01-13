import { Page } from "@playwright/test";
import BasePage from "../objects/ui/BasePage";

export default class TikiPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    private Elements = {
        searchInput: "//input[@data-view-id='main_search_form_inpu']"

    }

    async enterData(data:string) {
        await this.page.type(this.Elements.searchInput, data);
    }
}

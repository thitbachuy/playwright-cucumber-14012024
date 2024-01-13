import { Page } from "@playwright/test";
import BasePage from "../objects/ui/BasePage";

export default class TikiPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    private Elements = {
        "tiki search": "//input[@data-view-id='main_search_form_input']",
        "tiki search1": "//input[@data-view-id='main_search_form_inpu']"

    }

    async enterData(data:string, fieldName: string) {
        await this.page.type(this.Elements[fieldName], data);
    }
}

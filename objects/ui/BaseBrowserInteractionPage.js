import BasePage from './BasePage.js';

class BaseBrowserInteractionPage extends BasePage{
    constructor(context, page) {
        super(page);
        this.context = context;
        this.page = page;
    }

    async switchToTheNewPageAfterClickingElement(elementLocator) {
        console.log(elementLocator);
        const newPage = await Promise.all([
            this.context.waitForEvent('page'),
            this.scrollToElementThenClick(elementLocator),
        ]);
        return newPage;
    }
}

export default BaseBrowserInteractionPage;
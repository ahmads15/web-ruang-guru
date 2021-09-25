const {Given, Then, When} = require('@cucumber/cucumber');
import * as search from '../pages/search'

Given(/^User open browser skill academy$/, async () => {
    await search.goToWebsiteSkillAcademy();
});

When(/^User search keyword '([^"]*)' on search field$/,async (value) => {
    await search.inputKeyword(value);
});

Then(/^User verify page hasil search tidak menemukan$/, async () => {
    await search.verifyResultNotFound();
});

Then(/^User verify page hasil '([^"]*)' on page$/, async (value) => {
    await search.verifyResultSearch(value);
});
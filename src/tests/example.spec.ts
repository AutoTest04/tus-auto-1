import { expect, TestBuilder, owner } from '@trident/e2e-common';

import { HomePage } from '../pages/home.page';
// integrate the HomePage to current test context
const { test } = TestBuilder.create().p('home', HomePage);


test.describe('recommendation', () => {
    test.beforeEach(async ({ home }) => {
        // make sure recommendation is ready to test
        await home.setupRecommendation();
    });

    test('should recommendation be visible @Official@Stable', async ({ home }) => {
        owner('ktan');
       
        // recommendation should be visible in home page
        await expect(home.recommendation.root).toBeVisible();

    });
});
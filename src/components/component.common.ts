import { BaseComponent, Logger } from '@trident/e2e-common';
import { expect } from '@playwright/test';

export class ComponentCommon extends BaseComponent {
    async toHaveScreenshot(screenshotPath: string): Promise<void> {
        await this.root.waitFor();

        const box = await this.root.boundingBox();
        if (box) {
            // 扩展区域，比如四周各扩展 20px
            const padding = 20;

            const clip = {
                x: Math.max(box.x - padding, 0),
                y: Math.max(box.y - padding, 0),
                width: box.width + padding * 2,
                height: box.height + padding * 2,
            };

            // Use page.screenshot to support the 'clip' option
            const page = this.root.page();
            await page.screenshot({ path: screenshotPath, clip });
        } else {
            throw new Error('Cannot locate filter element to get bounding box');
        }
        
    }

    async toFullScreenshot(screenshotPath: string): Promise<void> {
        await this.root.page().screenshot({ path: screenshotPath});
    }

        /**
     * 截图当前组件（带 padding），并与快照对比
     * @param name 快照文件名，如 'my-component.png'
     * @param padding 四周扩展区域，默认 20
     */
    async compareWithSnapshot(name: string, padding: number = 20): Promise<void> {
        await this.root.waitFor();
        const box = await this.root.boundingBox();
        if (!box) {
            throw new Error('Cannot locate element to get bounding box');
        }

        const clip = {
            x: Math.max(box.x - padding, 0),
            y: Math.max(box.y - padding, 0),
            width: box.width + padding * 2,
            height: box.height + padding * 2,
        };

        const page = this.root.page();
        const screenshotBuffer = await page.screenshot({ clip });

        // 使用 Playwright 断言进行快照比对
        expect(screenshotBuffer).toMatchSnapshot(name, {
            threshold: 0.2,
        });
    }
}


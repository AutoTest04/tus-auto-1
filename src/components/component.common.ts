import { BaseComponent } from '@trident/e2e-common';
import fs from 'fs';
import sharp from 'sharp';
import path from 'path';
import looksSame, { createDiff } from 'looks-same';

const SNAPSHOT_DIR = path.join(__dirname, '../tests/GB18030test-snapshots');

export class ComponentCommon extends BaseComponent {

    private caseId: string | undefined;

    setCaseId(id: string) {
        this.caseId = id;
    }

    private resolveFilename(name: string): string {
        return this.caseId ? `${this.caseId}-${name}` : name;
    }
   
    async toFullScreenshot(filename: string): Promise<void> {
        const resolved = this.resolveFilename(filename);
        const screenshotPath = path.join(SNAPSHOT_DIR, resolved);
        fs.mkdirSync(path.dirname(screenshotPath), { recursive: true });
        await this.root.page().screenshot({ path: screenshotPath});
    }

    async toHaveScreenshot(filename: string, maxWidth = 1920, maxHeight = 1080): Promise<void> {
    const { buffer } = await this.getComponentScreenshot();

    const resolved = this.resolveFilename(filename);
    const screenshotPath = path.join(SNAPSHOT_DIR, resolved);
    fs.mkdirSync(path.dirname(screenshotPath), { recursive: true });

    const image = sharp(buffer);
    const metadata = await image.metadata();

    // 判断是否超过最大尺寸
    if (metadata.width && metadata.height &&
        (metadata.width > maxWidth || metadata.height > maxHeight)) {

        // 按比例缩放
        const widthRatio = maxWidth / metadata.width;
        const heightRatio = maxHeight / metadata.height;
        const scaleRatio = Math.min(widthRatio, heightRatio);

        const resizedBuffer = await image
            .resize({
                width: Math.floor(metadata.width * scaleRatio),
                height: Math.floor(metadata.height * scaleRatio),
                kernel: sharp.kernel.lanczos3, // 更清晰的缩放算法
                fit: 'inside',
                withoutEnlargement: true,
            })
            .toBuffer();

        fs.writeFileSync(screenshotPath, resizedBuffer);
    } else {
        // 未超出最大尺寸，直接保存原图
        fs.writeFileSync(screenshotPath, buffer);
    }
}

    async toHaveScreenshot1(filename: string): Promise<void> {    
        const { buffer } = await this.getComponentScreenshot();
        const resolved = this.resolveFilename(filename);
        const screenshotPath = path.join(SNAPSHOT_DIR, resolved);
        fs.mkdirSync(path.dirname(screenshotPath), { recursive: true });
        fs.writeFileSync(screenshotPath, buffer);
    }


    async compareWithSnapshot(filename: string, padding: number = 20): Promise<void> {
        const { buffer } = await this.getComponentScreenshot(padding);
        const resolved = this.resolveFilename(filename);

        const currentScreenshotPath = path.join(SNAPSHOT_DIR, `current-${resolved}`);
        const expectedScreenshotPath = path.join(SNAPSHOT_DIR, resolved);
        const diffPath = path.join(SNAPSHOT_DIR, `diff-${resolved}`);

        fs.writeFileSync(currentScreenshotPath, buffer);

        if (!fs.existsSync(expectedScreenshotPath)) {
            throw new Error(`Expected snapshot not found: ${expectedScreenshotPath}`);
        }

        const result = await looksSame(currentScreenshotPath, expectedScreenshotPath, {
        tolerance: 0.3,
        ignoreAntialiasing: false,
        });

        if (!result.equal) {
            await createDiff({
                reference: currentScreenshotPath,
                current: expectedScreenshotPath,
                diff: diffPath,
                highlightColor: '#ff00ff',
                });
            throw new Error(`Snapshot mismatch! See diff: ${diffPath}`);
         }else {
            fs.rmSync(currentScreenshotPath, { force: true });
         }
    }
    private async getComponentScreenshot(
        padding = 20
    ): Promise<{ buffer: Buffer, clip: { x: number; y: number; width: number; height: number } }> {
        await this.root.waitFor();
        const box = await this.root.boundingBox();
        if (!box) throw new Error('Cannot locate element to get bounding box');

        const clip = {
            x: Math.max(box.x - padding, 0),
            y: Math.max(box.y - padding, 0),
            width: box.width + padding * 2,
            height: box.height + padding * 2,
        };

        const buffer = await this.root.page().screenshot({ clip });
        return { buffer, clip };
    }
}


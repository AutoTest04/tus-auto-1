import { Page, Locator } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';
import { loadSampleData } from './testdata-loader';

export const snapshotsDir = path.join(__dirname, '../tests/GBsnapshots');
export const snapshotsDir2 = path.join(__dirname, '../tests/GB18030test-snapshots');

/**
 * 测试输入多个值并截图
 */
export async function testInputSamplesAndCapture(
  inputLocator: Locator,
  page: Page,
  idPrefix: string,
  useAllSamples = false,
  //samples: string[] = loadSampleData().shortSamples,
  captureTarget?: Locator
): Promise<void> {
    const data = loadSampleData();
    let samples: string[] = [];

    if (useAllSamples) {
        samples = [...data.shortSamples];

        if (data.longSample) {
            samples.push(data.longSample);
        }
        if (Array.isArray(data.groups)) {
            samples.push(...data.groups); 
        }

    } else {
        samples = data.shortSamples;
    }

    const screenshotDir = path.join(__dirname, snapshotsDir, idPrefix);

    for (let i = 0; i < samples.length; i++) {
        const input = samples[i];
        const screenshotPath = path.join(screenshotDir, `input-${i + 1}.png`);

        await inputLocator.fill('');
        await inputLocator.fill(input);
        await page.waitForTimeout(300); // 等待页面响应

        if (captureTarget) {
            await captureElementScreenshot(captureTarget, screenshotPath);
        } else {
            await captureFullPageScreenshot(page, screenshotPath);
    }
  }

  await inputLocator.fill('');
}
export async function testInputSamplesSplitAndCapture(
  inputLocator: Locator,
  page: Page,
  idPrefix: string,
  useAllSamples = false,
  captureTarget?: Locator
): Promise<void> {
  const data = loadSampleData();
  let samples: string[] = [];

  if (useAllSamples) {
    samples = [...data.shortSamples];
    if (data.longSample) {
      samples.push(data.longSample);
    }
    if (Array.isArray(data.groups)) {
      samples.push(...data.groups);
    }
  } else {
    samples = data.shortSamples;
  }

  const screenshotDir = path.join(__dirname, '../tests/GBsnapshots', idPrefix);

  for (let i = 0; i < samples.length; i++) {
    const fullInput = samples[i];

    // 拆分字符串，12个字符一组
    const parts = fullInput.match(/.{1,12}/g) || [];

    // 先清空输入框
    await inputLocator.fill('');
    for (let j = 0; j < parts.length; j++) {
      // 输入当前片段（追加）
      const currentText = parts.slice(0, j + 1).join('');
      await inputLocator.fill(currentText);

      // 等待页面响应
      await page.waitForTimeout(300);

      const screenshotPath = path.join(
        screenshotDir,
        `input-${i + 1}-part-${j + 1}.png`
      );

      if (captureTarget) {
        await captureElementScreenshot(captureTarget, screenshotPath);
      } else {
        await captureFullPageScreenshot(page, screenshotPath);
      }
    }

    // 清空输入框准备下一个样本
    await inputLocator.fill('');
  }
}


/**
 * 截图指定控件
 */
export async function captureElementScreenshot(
  locator: Locator,
  screenshotPath: string
): Promise<void> {
  await ensureDirExists(screenshotPath);
  await locator.screenshot({ path: screenshotPath });
}

/**
 * 截图整个页面
 */
export async function captureFullPageScreenshot(
  page: Page,
  screenshotPath: string
): Promise<void> {
  await ensureDirExists(screenshotPath);
  await page.screenshot({ path: screenshotPath, fullPage: true });
}

/**
 * 创建截图文件夹
 */
function ensureDirExists(filePath: string) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

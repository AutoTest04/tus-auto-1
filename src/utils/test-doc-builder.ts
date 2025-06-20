import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  Media,
  ImageRun,
  IImageOptions
} from 'docx';
import * as fs from 'fs';
import * as path from 'path';
import sizeOf from 'image-size';


// 定义数据结构
interface SampleData {
  shortSamples: string[];
  longSample: string;
  groups: Record<string, string>;
}

export class TestDocBuilder {
  private content: Paragraph[] = [];
  constructor(private data: SampleData) {}


  getShort(index: number): string {
    return this.data.shortSamples[index];
  }

  getLong(): string {
    return this.data.longSample;
  }

  getGroup(groupName: string): string | undefined {
    return this.data.groups[groupName];
  }

  getGroupSubstring(groupName: string, start: number, end?: number): string | undefined {
    const groupStr = this.getGroup(groupName);
    return groupStr ? Array.from(groupStr).slice(start, end).join('') : undefined;
  }

  addTitle(id: string, title: string) {
    this.content.push(
      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun(`${id} ${title}`)],
        spacing: { after: 200 },
      })
    );
  }

  addPrecondition(text: string) {
    if (text) {
      this.content.push(
        new Paragraph({
          children: [new TextRun(`前置条件: ${text}`)],
          spacing: { after: 100 },
        })
      );
    }
  }
  addSteps(steps: StepItem[]) {
    this.content.push(new Paragraph({ children: [new TextRun('步骤:')] }));

    steps.forEach((step, idx) => {
    // 添加步骤描述
    this.content.push(
      new Paragraph({
        children: [new TextRun(`${idx + 1}. ${step.text}`)],
        spacing: { after: 100 },
      })
    );

    // 如果有图，复用 addImage
    if (step.imagePath) {
      this.addImagefull(step.imagePath); // ✅ 直接复用你已有的方法
    }
    });
  }

  addResult(result: string) {
    this.content.push(
      new Paragraph({
        children: [new TextRun(`结果: ${result}`)],
        spacing: { after: 300 },
      })
    );
  }

  addImage(imagePath: string, width = 500, height = 300) {
    if (!fs.existsSync(imagePath)) return;

    const imageBuffer = fs.readFileSync(imagePath);
    const image = new ImageRun({
      data: imageBuffer,
      transformation: { width, height },
    } as IImageOptions);

    this.content.push(new Paragraph({ children: [image] }));

  }

  addImagefull(imagePath: string) {
    if (!fs.existsSync(imagePath)) return;

    const imageBuffer = fs.readFileSync(imagePath);
    const dimensions = sizeOf(imageBuffer);

    if (!dimensions.width || !dimensions.height) return;

    const image = new ImageRun({
      data: imageBuffer,
      transformation: { 
        width: dimensions.width,
        height: dimensions.height,
       },
    } as IImageOptions);

    this.content.push(new Paragraph({ children: [image] }));

  }

  addTest(test: {
    id: string;
    title: string;
    precondition?: string;
    steps: { text: string; imagePath?: string }[];
    result: string;
    summaryImagePath?: string;
    }) {
    this.addTitle(test.id, test.title);
    this.addPrecondition(test.precondition || '');
    this.addSteps(test.steps);
    this.addResult(test.result);
    if (test.summaryImagePath) {
      this.addImage(test.summaryImagePath);
    }
  }

  async save(filename = '测试文档.docx') {
    const doc = new Document({
      sections: [{ children: this.content }],
    });

    const buffer = await Packer.toBuffer(doc);
    const filePath = path.resolve(process.cwd(), filename);
    fs.writeFileSync(filePath, buffer);
    console.log(`✅ 文档已保存到: ${filePath}`);
  }

  
}

type StepItem = {
  text: string;
  imagePath?: string;
};


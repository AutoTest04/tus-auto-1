import * as fs from 'fs';
import * as path from 'path';

export function loadJson<T>(relativePath: string): T {
  const jsonPath = path.resolve(__dirname, relativePath);
  const rawData = fs.readFileSync(jsonPath, 'utf-8');
  return JSON.parse(rawData);
}

export function loadTestCases(): {
  id: string;
  title: string;
  precondition?: string;
  steps: string[];
  result: string;
  imagePath?: string;
}[] {
  return loadJson('../utils/testcases.json');
}

export function loadSampleData(): any {
  return loadJson('../utils/testdata.json');
}

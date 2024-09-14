import {
  scoreFunction,
  preprocessString,
  calculateGitmonType,
} from "./helpers";
import { describe, it, expect } from "vitest";

describe("scoreFunction", () => {
  it("should return 0 for input_value=0", () => {
    expect(scoreFunction(0, 123)).toEqual(0);
  });
  it("should return 90 at cutoff_point=input_value", () => {
    expect(scoreFunction(123, 123)).toEqual(90);
  });
  it("should throw a RangeError when cutoff_point < 0", () => {
    expect(() => scoreFunction(123, 0)).toThrow(RangeError);
  });
  it("should return below 90 if input_value<cutoff_point", () => {
    expect(scoreFunction(100, 123)).toBeLessThan(90);
  });
  it("should return above 90 if input_value >= cutoff_point", () => {
    expect(scoreFunction(1000, 123)).toBeGreaterThan(90);
  });
  it("should return 100 for input_value >> cuttoff_point", () => {
    expect(scoreFunction(100000, 123)).toEqual(100);
  });
});

describe("preprocessString", () => {
  it("should remove all spaces", () => {
    const input = "Hello World!";
    const expectedOutput = "helloworld!";
    expect(preprocessString(input)).toEqual(expectedOutput);
  });
  it("should remove all underscores", () => {
    const input = "Hello_World!";
    const expectedOutput = "helloworld!";
    expect(preprocessString(input)).toEqual(expectedOutput);
  });
  it("should remove all dashes", () => {
    const input = "Hello-World!";
    const expectedOutput = "helloworld!";
    expect(preprocessString(input)).toEqual(expectedOutput);
  });
});

describe("calculateGitmonType", () => {
  it("should calculate frontend type correctly", () => {
    const tags = ["javascript", "react", "vite"];
    const actualOutput = calculateGitmonType(tags)[0].name;
    const expectedOutput = "frontend";
    expect(actualOutput).toEqual(expectedOutput);
  });
  it("should calculate backend type correctly", () => {
    const tags = ["node", "express", "rest"];
    const actualOutput = calculateGitmonType(tags)[0].name;
    const expectedOutput = "backend";
    expect(actualOutput).toEqual(expectedOutput);
  });
  it("should calculate data type correctly", () => {
    const tags = ["python", "Apache Spark", "Tensorflow"];
    const actualOutput = calculateGitmonType(tags)[0].name;
    const expectedOutput = "data";
    expect(actualOutput).toEqual(expectedOutput);
  });
  it("should calculate mobile type correctly", () => {
    const tags = ["swift", "flutter", "android"];
    const actualOutput = calculateGitmonType(tags)[0].name;
    const expectedOutput = "mobile";
    expect(actualOutput).toEqual(expectedOutput);
  });
  it("should calculate cybersecurity type correctly", () => {
    const tags = ["penetration testing", "c++", "c"];
    const actualOutput = calculateGitmonType(tags)[0].name;
    const expectedOutput = "cybersecurity";
    expect(actualOutput).toEqual(expectedOutput);
  });
});

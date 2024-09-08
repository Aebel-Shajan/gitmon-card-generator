import { preprocessString, calculateGitmonType } from "./helpers";
import { describe, it, expect } from "vitest";

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

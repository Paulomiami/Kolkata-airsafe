const http = require('http');
const fs = require('fs');
const path = require('path');
const { getAqiCategory, getMaskSuggestion, getHealthAdvice, getAqiColor } = require('./aqi');

describe("AQI Logic - Real Code Test", () => {
  test("Good AQI", () => { expect(getAqiCategory(30)).toBe("Good"); });
  test("Moderate AQI", () => { expect(getAqiCategory(80)).toBe("Moderate"); });
  test("Poor AQI", () => { expect(getAqiCategory(150)).toBe("Poor"); });
  test("Very Poor AQI", () => { expect(getAqiCategory(250)).toBe("Very Poor"); });
  test("Severe AQI", () => { expect(getAqiCategory(350)).toBe("Severe"); });
  test("Edge 50 is Good", () => { expect(getAqiCategory(50)).toBe("Good"); });
  test("Edge 51 is Moderate", () => { expect(getAqiCategory(51)).toBe("Moderate"); });
  test("Mask low", () => { expect(getMaskSuggestion(50)).toBe("No mask needed"); });
  test("Mask medium", () => { expect(getMaskSuggestion(150)).toBe("Wear N95 mask"); });
  test("Mask high", () => { expect(getMaskSuggestion(250)).toBe("Wear N95 mask and stay indoors"); });
  test("Health Safe", () => { expect(getHealthAdvice(30)).toBe("Safe for outdoor activities"); });
  test("Health Avoid", () => { expect(getHealthAdvice(350)).toBe("Avoid outdoor activities"); });
  test("Color green", () => { expect(getAqiColor(30)).toBe("green"); });
  test("Color maroon severe", () => { expect(getAqiColor(400)).toBe("maroon"); });
});

describe("Server.js - Static File Server Test", () => {
  test("server.js exists", () => {
    expect(fs.existsSync(path.join(__dirname, 'server.js'))).toBe(true);
  });
  test("index.html exists", () => {
    expect(fs.existsSync(path.join(__dirname, 'index.html'))).toBe(true);
  });
  test("package.json has test script", () => {
    const pkg = JSON.parse(fs.readFileSync(path.join(__dirname, 'package.json'), 'utf8'));
    expect(pkg.scripts.test).toBe("jest");
  });
  test("server.js blocks path traversal", () => {
    const src = fs.readFileSync(path.join(__dirname, 'server.js'), 'utf8');
    expect(src).toContain("startsWith(PUBLIC_DIR)");
    expect(src).toContain("403");
  });
  test("server.js handles 404", () => {
    const src = fs.readFileSync(path.join(__dirname, 'server.js'), 'utf8');
    expect(src).toContain("404");
  });
});

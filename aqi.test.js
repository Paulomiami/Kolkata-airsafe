// Kolkata AirSafe - AQI Logic Tests
function getAqiCategory(aqi) {
  if (aqi <= 50) return "Good";
  if (aqi <= 100) return "Moderate";
  if (aqi <= 200) return "Poor";
  if (aqi <= 300) return "Very Poor";
  return "Severe";
}
function getMaskSuggestion(aqi) {
  if (aqi <= 100) return "No mask needed";
  if (aqi <= 200) return "Wear N95 mask";
  return "Wear N95 mask and stay indoors";
}
function getHealthAdvice(aqi) {
  if (aqi <= 50) return "Safe for outdoor activities";
  if (aqi <= 200) return "Limit outdoor activities";
  return "Avoid outdoor activities";
}
describe("Kolkata AirSafe AQI Tests", () => {
  test("Good AQI", () => { expect(getAqiCategory(30)).toBe("Good"); });
  test("Moderate AQI", () => { expect(getAqiCategory(80)).toBe("Moderate"); });
  test("Poor AQI", () => { expect(getAqiCategory(150)).toBe("Poor"); });
  test("Very Poor AQI", () => { expect(getAqiCategory(250)).toBe("Very Poor"); });
  test("Severe AQI", () => { expect(getAqiCategory(350)).toBe("Severe"); });
  test("Mask for low AQI", () => { expect(getMaskSuggestion(50)).toBe("No mask needed"); });
  test("Mask for high AQI", () => { expect(getMaskSuggestion(250)).toBe("Wear N95 mask and stay indoors"); });
  test("Health advice severe", () => { expect(getHealthAdvice(350)).toBe("Avoid outdoor activities"); });
});

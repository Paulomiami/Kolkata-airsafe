// Kolkata AirSafe - Real AQI Logic used by app
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
function getAqiColor(aqi) {
  if (aqi <= 50) return "green";
  if (aqi <= 100) return "yellow";
  if (aqi <= 200) return "orange";
  if (aqi <= 300) return "red";
  return "maroon";
}
module.exports = { getAqiCategory, getMaskSuggestion, getHealthAdvice, getAqiColor };

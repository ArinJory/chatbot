// telemetria.js
const appInsights = require("applicationinsights");
require('dotenv').config();

if (process.env.APPINSIGHTS_CONNECTION_STRING) {
  appInsights.setup(process.env.APPINSIGHTS_CONNECTION_STRING)
    .setAutoCollectRequests(true)
    .setAutoCollectPerformance(true)
    .setAutoCollectDependencies(true)
    .setAutoDependencyCorrelation(true)
    .start();

  console.log("📊 Application Insights conectado correctamente.");
} else {
  console.log("⚠️ No se encontró la clave de Application Insights.");
}

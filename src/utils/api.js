export function fetchTideData(stationId) {
  const apiUrl = `https://api.tidesandcurrents.noaa.gov/api/prod/datagetter?date=latest&station=${stationId}&product=predictions&datum=MLLW&time_zone=lst&units=english&format=json&application=BlissLanding`;

  return fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        throw new Error(data.error.message);
      }
      if (data.predictions && data.predictions.length > 0) {
        return data.predictions[0];
      }
      throw new Error("No tide data available");
    })
    .catch((error) => {
      throw error;
    });
}

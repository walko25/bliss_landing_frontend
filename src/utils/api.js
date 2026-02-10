export function fetchTideData(stationId) {
  const apiUrl = `https://api.tidesandcurrents.noaa.gov/api/prod/datagetter?date=latest&station=${stationId}&product=water_level&datum=MLLW&time_zone=lst&units=english&format=json&application=BlissLanding`;

  return fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        throw new Error(data.error.message);
      }
      if (data.data && data.data.length > 0) {
        return data.data[0];
      }
      throw new Error("No tide data available");
    })
    .catch((error) => {
      throw error;
    });
}

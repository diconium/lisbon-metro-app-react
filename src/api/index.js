const baseUrl = 'https://diconium-lisbon-job-fairs.herokuapp.com';

export const api = {
  getLineInfo(line) {
    const endpoint = `${baseUrl}/lines/${line}/waitingTimes`;
    return fetch(endpoint).then(data => data.json());
  },

  getLines() {
    const endpoint = `${baseUrl}/lines`;
    return fetch(endpoint).then(data => data.json());
  },

  getStations() {
    const endpoint = `${baseUrl}/stations`;
    return fetch(endpoint).then(data => data.json());
  },

  getDestinations() {
    const endpoint = `${baseUrl}/destinations`;
    return fetch(endpoint).then(data => data.json());
  }
}

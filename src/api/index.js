const baseUrl = 'http://localhost:3333';

export const api = {
  getLineInfo(line) {
    const endpoint = `${baseUrl}/lines/${line}/waitingTimes`;
    return fetch(endpoint).then(data => data.json());
  },

  getLines() {
    const endpoint = `${baseUrl}/lines`;
    return fetch(endpoint).then(data => data.json());
  }
}

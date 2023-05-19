export function fetchCountries(name) {
  const url = `https://restcountries.com/v3.1/name/${name}`;

  return fetch(url)
    .then(response => response.json())
    .then(data => {
      // console.log(data);

      return data;
    })
    .catch(error => {
      // console.log('An error occurred while executing the request:', error);
      throw error;
    });
}

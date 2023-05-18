export function fetchCountries(name) {
  const url = `https://restcountries.com/v3.1/name/${name}`;

  return fetch(url)
    .then(response => response.json())
    .then(data => {
      console.log(data);

      return data;
    })
    .catch(error => {
      console.log('Произошла ошибка при выполнении запроса:', error);
      throw error;
    });
}

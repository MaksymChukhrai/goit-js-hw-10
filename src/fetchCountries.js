export function fetchCountries(name) {
  const url = `https://restcountries.com/v3.1/name/${name}`;

  return fetch(url)
    .then(response => response.json())
    .then(data => {
      console.log(data); // Выводим ответ от сервера в консоль
      // Дополнительные действия с ответом от сервера
      return data; // Возвращаем данные для использования в других частях кода
    })
    .catch(error => {
      console.log('Произошла ошибка при выполнении запроса:', error);
      throw error; // Пробрасываем ошибку для обработки в других частях кода
    });
}

  
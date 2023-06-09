import { fetchCountries } from './fetchCountries.js';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';

const searchInput = document.getElementById('search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');
let timeoutId; // Додана змінна для управління таймаутом

searchInput.addEventListener('input', debounce(handleSearch, 500));

function handleSearch() {
  clearTimeout(timeoutId);// Скидаємо попередній timeout

  const searchValue = searchInput.value.trim();

  if (searchValue === '') {
    clearResults();
    return;
  }

  // Встановлюємо новий timeout перед обробленням помилки
  timeoutId = setTimeout(() => {
    fetchCountries(searchValue)
      .then(data => {
        if (data.length > 10) {
          clearResults();
          throw new Error('Too many matches found. Please enter a more specific name.');
        } else if (data.length >= 2 && data.length <= 10) {
          showCountryList(data);
        } else if (data.length === 1) {
          showCountryInfo(data[0]);
        } else {
          clearResults();
          throw new Error('Oops, there is no country with that name');
        }
      })
      .catch(error => {
        console.log('An error occurred:', error);
        showNotification(error.message);
      });
  }, 1500);//При базі, збільшуємо або зменшуємо інтервал
}

function showNotification(message) {
  Notiflix.Notify.warning(message);
}

function showCountryList(countries) {
  countryList.innerHTML = '';

  countries.forEach(country => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `
      <img src="${country.flags.svg}" alt="${country.name.official}" width="40" height="30">
      ${country.name.official}
    `;
    countryList.appendChild(listItem);
  });

  countryInfo.innerHTML = '';
}

function showCountryInfo(country) {
  const countryCard = document.createElement('div');
  countryCard.classList.add('country-card');
  countryCard.innerHTML = `
    <img src="${country.flags.svg}" alt="${
    country.name.official
  }" width="100" height="70">
    <h3>${country.name.official}</h3>
    <p><strong>Capital:</strong> ${country.capital}</p>
    <p><strong>Population:</strong> ${country.population}</p>
    <p><strong>Languages:</strong> ${Object.values(country.languages).join(
      ', '
    )}</p>
  `;

  countryList.innerHTML = '';
  countryInfo.innerHTML = '';
  countryInfo.appendChild(countryCard);
}

function clearResults() {
  countryList.innerHTML = '';
  countryInfo.innerHTML = '';
  searchInput.value = '';
}

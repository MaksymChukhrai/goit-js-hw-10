import { fetchCountries } from './fetchCountries.js';
import Notiflix from 'notiflix';

const searchInput = document.getElementById('search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

searchInput.addEventListener('input', handleSearch);

function handleSearch() {
  const searchValue = searchInput.value.trim();

  if (searchValue === '') {
    clearResults();
    return;
  }

  fetchCountries(searchValue)
    .then(data => {
      if (data.length > 10) {
        showNotification('Too many matches found. Please enter a more specific name.');
      } else if (data.length >= 2 && data.length <= 10) {
        showCountryList(data);
      } else if (data.length === 1) {
        showCountryInfo(data[0]);
      } else {
        showNotification('Country not found.');
      }
    })
    .catch(error => {
      console.log('An error occurred:', error);
      showNotification('An error occurred while fetching data. Please try again.');
    });
}

function showNotification(message) {
  Notiflix.Notify.warning(message);
}

function showCountryList(countries) {
  countryList.innerHTML = '';

  countries.forEach(country => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `
      <img src="${country.flags.svg}" alt="${country.name.official}" width="30" height="20">
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
    <img src="${country.flags.svg}" alt="${country.name.official}" width="100" height="70">
    <h3>${country.name.official}</h3>
    <p><strong>Capital:</strong> ${country.capital}</p>
    <p><strong>Population:</strong> ${country.population}</p>
    <p><strong>Languages:</strong> ${Object.values(country.languages).join(', ')}</p>
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

document.addEventListener("DOMContentLoaded", function () {
    const btnGetInfo = document.getElementById('btnGetInfo');

    btnGetInfo.addEventListener('click', function() {
        const countryName = document.getElementById('countryName').value.trim();

        if (countryName === "") {
            alert("Please enter a country name.");
            return;
        }

        const url = `https://restcountries.com/v3.1/name/${countryName}?fields=name,population,region,flags,capital,borders`;

        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                if (!data || data.status === 404 || !data.length) {
                    alert("Country not found!");
                    return;
                }
                getCountryInfo(data[0]);
            })
            .catch(error => console.error("Error fetching data:", error));
    });

    function getCountryInfo(countryInfo) {
        document.getElementById('countryName2').innerText = countryInfo.name.common;
        document.getElementById('Capital').innerText = "Capital: " + (countryInfo.capital ? countryInfo.capital[0] : "N/A");
        document.getElementById('Population').innerText = "Population: " + countryInfo.population.toLocaleString();
        document.getElementById('Region').innerText = "Region: " + countryInfo.region;
        document.getElementById('countryPic').src = countryInfo.flags.png;

        if (countryInfo.borders && countryInfo.borders.length > 0) {
            fetchNeighboringCountries(countryInfo.borders);
        } else {
            document.getElementById('neighborCountry').innerText = "No neighboring countries.";
            document.getElementById('neighborPic').innerHTML = '';
        }
    }

    function fetchNeighboringCountries(borders) {
        const neighborList = document.getElementById('neighborList');
        neighborList.innerHTML = ''; // Clear previous list
    
        borders.forEach((border) => {
            const url = `https://restcountries.com/v3.1/alpha/${border}`;
    
            fetch(url)
                .then((response) => response.json())
                .then((data) => {
                    if (data && data[0]) {
                        const listItem = document.createElement('li');
                        
                        const flag = document.createElement('img');
                        flag.src = data[0].flags.png;
                        flag.alt = `${data[0].name.common} flag`;
    
                        const countryName = document.createTextNode(data[0].name.common);
    
                        listItem.appendChild(flag);
                        listItem.appendChild(countryName);
                        neighborList.appendChild(listItem);
                    }
                })
                .catch((error) => console.error("Error fetching neighbor country data:", error));
        });
    }
    
});

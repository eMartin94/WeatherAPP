const result = document.querySelector('.result');
const form = document.querySelector('.get-weather');
const nameConti = document.querySelector('#continent')
const nameCountry = document.querySelector('#country');
const nameCity = document.querySelector('#city');

// var paisPE = new Array("Seleccionar Ciudad", "Amazonas", "Ancash", "Apurimac", "Arequipa", "Ayacucho", "Cajamarca", "Callao", "Cusco", "Huancavelica", "Huanuco", "Ica", "Junín", "La Libertad", "Lambayeque", "Lima", "Loreto", "Madre de Dios", "Moquegua", "Pasco", "Piura", "Puno", "San Martín", "Tacna", "Tumbes", "Ucayali");
function lstPaises() {
    cbxCountry = document.getElementById('country')
    if (cbxCountry.length > 1) {
        cbxCountry.innerHTML = '';
        cbxCountry.innerHTML = `<option disabled selected value="">Seleccione País</option>`;
        console.log("holiii");
    }
    showSelect();
}

function lstCiudades() {
    cbxCity = document.getElementById('city')
    if (cbxCity.length > 1) {
        cbxCity.innerHTML = '';
        cbxCity.innerHTML = `<option disabled selected value="">Seleccione Ciudad</option>`;
        console.log("holiii");
    }
    callCityAPI(nameCountry.value);
    document.getElementById('cities').style.display = 'block';

}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (nameConti.value === '') {
        showError('Debe seleccionar un Continente');
        return;
    } else if (nameCountry.value === '') {
        showError('Debe seleccionar un país');
        return;
    } else if (nameCity.value === '') {
        showError('Debe seleccionar una ciudad');
        return;
    }

    callWeatherAPI(nameCity.value, nameCountry.value);
})

function callWeatherAPI(city, country) {
    const apiId = 'ec0d4e22307932576162844b65ba3c18';
    const idioma = 'es';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiId}&lang=${idioma}`
    // const url = `http://api.openweathermap.org/data/2.5/weather?q=bogota,colombia&appid=ec0d4e22307932576162844b65ba3c18`
    fetch(url)
        .then(data => {
            return data.json();
        })
        .then(dataJSON => {
            if (dataJSON.cod === '404') {
                showError('Ciudad no encontrada');
            } else {
                clearHTML();
                showWeather(dataJSON);
            }
            console.log(dataJSON);
        }).catch(error => {
            console.log(error)
        })
}

function showWeather(data) {
    const { name, main: { temp, temp_min, temp_max }, weather: [arr] } = data;

    const degress = kelvinToCentigrade(temp);
    const min = kelvinToCentigrade(temp_min);
    const max = kelvinToCentigrade(temp_max);
    const content = document.createElement('div');
    content.innerHTML = `
        <div class="temp">
            <h1>${name}</h1>
            <span>${degress}°</span>
            </div>
            <div class="description">
            <img src="http://openweathermap.org/img/wn/${arr.icon}@2x.png" alt="">
            <p>${arr.description}</p>
            <p>max: ${max}° | min:  ${min}°</p>
            
        </div>
        
    `;

    result.appendChild(content);

}

function kelvinToCentigrade(temp) {
    return parseInt(temp - 273.15);
}

function clearHTML() {
    result.innerHTML = ''
}

function showError(message) {
    console.log(message);
    const alert = document.createElement('p');
    alert.classList.add('alert-message');
    alert.innerHTML = message;

    form.appendChild(alert);
    setTimeout(() => {
        alert.remove();
    }, 2500);
}

function showSelect() {
    document.getElementById('countries').style.display = 'block';
    callCountryAPI(nameConti.value);
}

function getFecha() {

    var fecha = new Date();
    var diaSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    var mesAnio = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

    document.getElementById('fecha').innerHTML = `${diaSemana[fecha.getDay()]}, ${fecha.getDate()} de ${mesAnio[fecha.getMonth()]} del ${fecha.getFullYear()}`;
}

function callCountryAPI(country) {
    var myHeaders = new Headers();
    myHeaders.append("apikey", "rK31D0kqZJwiMbr2J68WI7VCMkJP1OLY");

    var requestOptions = {
        method: 'GET',
        redirect: 'follow',
        headers: myHeaders
    };
    var apiurl = `https://api.apilayer.com/geo/country/region/${country}`;
    fetch(apiurl, requestOptions)
        .then(datos => {
            return datos.json();
        })
        .then(res => {
            res.forEach(element => {
                let miSelected = document.getElementById('country');
                let opt = document.createElement('option');
                opt.appendChild(document.createTextNode(element.name));
                opt.value = element.alpha2code

                miSelected.appendChild(opt)
                console.log(opt);
            })
        })
}

function callCityAPI(city) {
    var myHeaders = new Headers();
    myHeaders.append("apikey", "rK31D0kqZJwiMbr2J68WI7VCMkJP1OLY");

    var requestOptions = {
        method: 'GET',
        redirect: 'follow',
        headers: myHeaders
    };
    var apiurl = `https://api.apilayer.com/geo/country/cities/${city}`;
    fetch(apiurl, requestOptions)
        .then(datos => {
            return datos.json();
        })
        .then(res => {
            res.forEach(element => {
                let miSelected = document.getElementById('city');
                let opt = document.createElement('option');
                opt.appendChild(document.createTextNode(element.name));
                opt.value = element.name;

                miSelected.appendChild(opt)
                console.log(opt);
            })
        })

}

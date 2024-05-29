const city = "Casablanca";
const url = `http://api.aladhan.com/v1/timingsByCity?city=${city}&country=Morocco&method=2`;
const dateElem = document.getElementById('date');
const sunriseTime = document.getElementById('sunrise-time');
const sunsetTime = document.getElementById('sunset-time');
const fajrTime = document.getElementById('fajr-time');
const dhuhrTime = document.getElementById('dhuhr-time');
const asrTime = document.getElementById('asr-time');
const maghribTime = document.getElementById('maghrib-time');
const ishaTime = document.getElementById('isha-time');
const cityElem = document.getElementById('city');

const citiesSelect = document.getElementById('cities');

const localBtn = document.getElementById('loc-btn');

const citiesInMorocco = [
    {
        "en": "Casablanca",
        "ar": "الدارالبيضاء"
    },
    {
        "en" : "Fes",
        "ar": "فاس"
    },
    {
        "en" : "Errachidia",
        "ar": "الراشيدية"
    },
    {
        "en" : "Marrakech",
        "ar": "مراكش"
    },
    {
        "en" : "Tangier",
        "ar": "طنجة"
    },
    {
        "en" : "Rabat",
        "ar": "الرباط"
    },
    {
        "en" : "Meknes",
        "ar": "مكناس"
    },
    {
        "en" : "Midelt",
        "ar": "ميدلت"
    },
    {
        "en" : "Agadir",
        "ar": "أكادير"
    },
    {
        "en" : "Salé",
        "ar": "سلا"
    },
    {
        "en" : "Oujda",
        "ar": "وجدة"
    },
    {
        "en" : "Ouarzazate",
        "ar": "ورزازات"
    },
    {
        "en" : "Kenitra",
        "ar": "قنيطرة"
    },
    {
        "en" : "Tetouan",
        "ar": "تطوان"
    },
    {
        "en" : "Safi",
        "ar": "اسفي"
    },
    {
        "en" : "Temara",
        "ar": "تمارة"
    },
    {
        "en" : "Laayoune",
        "ar": "العيون"
    },
    {
        "en" : "Khouribga",
        "ar": "خريبكة"
    },
    {
        "en" : "Beni Mellal",
        "ar": "بني ملال"
    },
    {
        "en" : "Jdida",
        "ar": "الجديدة"
    },
    {
        "en" : "Taza",
        "ar": "تازة"
    },
    {
        "en" : "Tinghir",
        "ar": "تنغير"
    }
];

citiesInMorocco.forEach(city => {
    const option = document.createElement('option');
    option.name = city.en;
    option.value = city.en;
    option.text = city.ar;

    citiesSelect.appendChild(option);
})

citiesSelect.addEventListener('change', (e) => {
    const selectedOption = e.target.selectedOptions[0]
    const selectedText = selectedOption.textContent;
    cityElem.innerHTML = "";
    cityElem.innerHTML = selectedText;
    const url = `https://api.aladhan.com/v1/timingsByCity?city=${e.target.value}&country=Morocco&method=2`;
    axiosData(url);
})
  

dateElem.innerHTML = "";
dateElem.innerHTML = new Date().toLocaleDateString();

sunriseTime.innerHTML = "";
sunsetTime.innerHTML = "";

const axiosData = (url) => {


    // get current time
    axios.get(url).then(response => {
        dateElem.innerHTML = response.data.data.date.gregorian.date;

        // get timings
        const timings = response.data.data.timings;

        // get Sunset & Sunrise times
        sunriseTime.innerHTML = timings.Sunrise;
        sunsetTime.innerHTML = timings.Sunset;

        fajrTime.innerHTML = timings.Fajr;
        dhuhrTime.innerHTML = timings.Dhuhr;
        asrTime.innerHTML = timings.Asr;
        maghribTime.innerHTML = timings.Maghrib;
        ishaTime.innerHTML = timings.Isha;
    })
}

axiosData(url);

// get current date with format dd-mm-yyyy
function getFormattedDate() {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
  
    // Combine and format the date parts
    return `${dd}-${mm}-${yyyy}`;
}


// Location

localBtn.addEventListener('click', (e) => {
    const successCallback = (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        const currentDate = getFormattedDate();

        const url = `https://api.aladhan.com/v1/timings/${currentDate}?latitude=${latitude}&longitude=${longitude}&method=2`;
        console.log(url);
        axiosData(url);

        cityElem.innerHTML = "";
        cityElem.innerHTML = "تم تحديد موقعك!";
        
    };
    
    const errorCallback = (error) => {
        alert('تعذر الحصول على موقعك, المرجو إختيار مدينتك في القائمة أسفله. شكرا')
    };
    
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);

})


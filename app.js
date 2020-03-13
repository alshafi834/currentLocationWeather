window.addEventListener('load', ()=> {
    let long;
    let lat;

    let temparatureDescription = document.querySelector('.temperature-description');
    let temparatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let temperatureSection = document.querySelector('.temperature-section');
    let temperatureSpan = document.querySelector('.temperature-section span');

    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            console.log(position);
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = 'https://cors-anywhere.herokuapp.com/';
            const weatherAPi = `${proxy}https://api.darksky.net/forecast/5fa66734119072879ccd4fe0aa5dc4bb/${lat},${long}`;

            fetch(weatherAPi).then(response => {
                return response.json();
            }).then(data => {
                console.log(data);
                const {temperature, summary, icon} = data.currently;
                let celcius = (temperature -32) * (5/9);

                temparatureDegree.textContent = temperature;
                temparatureDescription.textContent = summary;
                locationTimezone.textContent = data.timezone;

                setIcons(icon, document.querySelector('.icon'));

                temperatureSection.addEventListener('click', ()=>{
                    if(temperatureSpan.textContent==='F'){
                        temperatureSpan.textContent = "C";
                        temparatureDegree.textContent = Math.floor(celcius);
                    } else {
                        temperatureSpan.textContent = "F";
                        temparatureDegree.textContent = temperature;
                    }
                })
            });
        });
    }

    function setIcons(icon, iconId){
        const skycons = new Skycons({color: "white"});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconId, Skycons[currentIcon])
    }
});
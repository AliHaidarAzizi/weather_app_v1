import { useState } from 'react'
import './App.css'

// async function logMovies() {
//   const response = await fetch("http://example.com/movies.json");
//   const movies = await response.json();
//   console.log(movies);
// }


function App() {
  const [bandar, setBandar] = useState('')
  const [laporanCuaca, setLaporanCuaca] = useState({})

  const handleBandar = (event) => {
    setBandar(event.target.value);
  }

  const fetchWeatherForecast = async () => {
    const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=780f3da01fd44156923151611232408&q=${bandar}&days=2&aqi=yes&alerts=no`);
    const data = await response.json();
    setLaporanCuaca(data)
  

  }

  return (
    <>
      <div className='body'>
        <input 
          type="text" 
          placeholder='Nama Bandar'
          value={bandar}
          onChange={handleBandar}
        />
        <div className='button' style={{border: 'solid white 2px', marginTop: '10px'}}>
          <button 
          onClick={fetchWeatherForecast}
          >Dapatkan maklumat Cuaca
            </button>
        </div>

        <div style={{marginTop:'10px'}}>
          Ini adalah laporan cuaca untuk <br />  <b>{bandar}</b>

        </div>
        <div>
          <h1>Cuaca Terkini</h1>
          <br />
          suhu = {laporanCuaca.current?.temp_c} C
          <br />
          {laporanCuaca.current?.condition.text}
        </div>
        <div >
          <h1>Ramalan Cuaca di {laporanCuaca.location?.name}</h1>
          {laporanCuaca.forecast?.forecastday.map((forecast) => (
            <div key={forecast.data_epoch}>
              {forecast.date}
              <img src={forecast.day.condition.icon} alt={forecast.day.condition.text} />
              <div>
                {forecast.day.condition.text}
              </div>
            
            </div>

          ))}
        </div>
      </div>
    </>
  )
}

export default App

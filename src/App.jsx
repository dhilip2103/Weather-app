import { useState } from "react";
import axios from "axios";
import "./App.css";

// Weather condition-ku enna background gradient use pannanum-nu inga define pannrom.
// API response-la weather.main-la "Clear", "Rain", "Clouds" maadiri values varum —
// adha inge key-aa vachi antha condition-ku enna theme-nu map pannrom.
const getWeatherTheme = (condition) => {
  const themes = {
    Clear:        { gradient: "linear-gradient(135deg, #FF6B35, #F7C59F, #FFBE0B)", emoji: "☀️", label: "Sunny & Clear" },
    Clouds:       { gradient: "linear-gradient(135deg, #4A4E69, #9A8C98, #C9ADA7)", emoji: "☁️", label: "Cloudy" },
    Rain:         { gradient: "linear-gradient(135deg, #0D1B2A, #1B4F72, #2980B9)", emoji: "🌧️", label: "Rainy" },
    Drizzle:      { gradient: "linear-gradient(135deg, #2C3E50, #3498DB, #74B9FF)", emoji: "🌦️", label: "Drizzle" },
    Thunderstorm: { gradient: "linear-gradient(135deg, #1A0533, #4A0E8F, #7D3C98)", emoji: "⛈️", label: "Thunderstorm" },
    Snow:         { gradient: "linear-gradient(135deg, #E8F4F8, #AED6F1, #85C1E9)", emoji: "❄️", label: "Snowing" },
    Mist:         { gradient: "linear-gradient(135deg, #2D3436, #636E72, #B2BEC3)", emoji: "🌫️", label: "Misty" },
    Haze:         { gradient: "linear-gradient(135deg, #2D3436, #636E72, #B2BEC3)", emoji: "🌫️", label: "Hazy" },
    default:      { gradient: "linear-gradient(135deg, #0f0c29, #302b63, #24243e)", emoji: "🌤️", label: "Weather" },
  };
  // themes[condition] — "Rain" key irundha rain theme return aagum.
  // || themes.default — key illana fallback-aa default theme return aagum.
  return themes[condition] || themes.default;
};

// Time paathu greeting show pannrom — morning/afternoon/evening
const getGreeting = () => {
  const hour = new Date().getHours(); // 0-23 range-la current hour
  if (hour < 12) return "Good Morning 🌅";
  if (hour < 17) return "Good Afternoon ☀️";
  return "Good Evening 🌙";
};

function App() {
  // useState — React-la data store panna use pannrom.
  // [value, setValue] pattern — value read panna, setValue update panna.
  const [city, setCity]         = useState("");       // User type pannra city name
  const [weather, setWeather]   = useState(null);     // API response data
  const [loading, setLoading]   = useState(false);    // Search button spinner control
  const [error, setError]       = useState("");       // Error message text
  const [searched, setSearched] = useState(false);    // Card animation trigger

  // Ungaloda API key inga podanum — openweathermap.org -> API Keys section
  const API_KEY = "5aa9b7135d2fe8daa299dcb0b3d0238b";

  const fetchWeather = async () => {
    // city.trim() — spaces type pannina empty-aa treat pannrom
    if (!city.trim()) {
      setError("Please enter a city name! 🏙️");
      return; // Remaining code execute aagaama stop aagum
    }

    setLoading(true);    // Spinner show aagum
    setError("");        // Previous error clear
    setWeather(null);    // Previous result clear
    setSearched(false);  // Animation reset

    try {
      // axios.get — API-ku GET request anupurom.
      // Template literal (backtick) use panni city-ya URL-la dynamically insert pannrom.
      // units=metric — Celsius-la temperature varum (Fahrenheit venuma? imperial podanum)
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      setWeather(res.data);  // res.data-la entire weather object irukkum
      setSearched(true);     // Card slide-up animation trigger
    } catch {
      // City peyar wrong-aa irundha API 404 error throw pannum — catch block execute aagum
      setError("City not found! Check the spelling and try again 🔍");
    } finally {
      // try success-aa irundhalum, catch error-aa irundhalum — finally always run aagum
      setLoading(false); // Spinner hide aagum
    }
  };

  // Enter key press pannalum search aaganum — keyboard UX improvement
  const handleKey = (e) => {
    if (e.key === "Enter") fetchWeather();
  };

  // weather state-la data irundha, antha data-oda condition-ku theme pick pannrom.
  // weather null-aa irundha (initial state / loading) default theme use pannrom.
  const theme = weather
    ? getWeatherTheme(weather.weather[0].main)
    : getWeatherTheme("default");

  return (
    // style={{ background: theme.gradient }} — weather change aana background
    // CSS transition use panni smooth-aa fade aaum (App.css-la define pannrom)
    <div className="app" style={{ background: theme.gradient }}>

      {/* Floating background orbs — pure CSS animation, no logic */}
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />

      {/* 6 small floating particles — Array(6) creates [undefined x6],
          .map() adu loop panni 6 divs create pannum */}
      {[...Array(6)].map((_, i) => (
        <div key={i} className={`particle p-${i + 1}`} />
      ))}

      <div className="container">

        {/* App title + greeting */}
        <div className="header">
          <h1 className="app-title">
            <span className="title-icon">{theme.emoji}</span>
            WeatherApp
          </h1>
          <p className="greeting">{getGreeting()}</p>
        </div>

        {/* Search section */}
        <div className="search-wrapper">
          <div className="search-box">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              className="search-input"
              placeholder="Enter city name... (eg: Chennai, Mumbai)"
              value={city}
              // e.target.value — user type pannra character-by-character capture aagum
              onChange={(e) => setCity(e.target.value)}
              onKeyDown={handleKey}
            />
          </div>
          <button
            className={`search-btn ${loading ? "loading" : ""}`}
            onClick={fetchWeather}
            disabled={loading} // Loading-la irukumbodhu button click aagaama block pannrom
          >
            {/* Loading state-la spinner show pannrom, illana "Search" text */}
            {loading ? <span className="spinner" /> : "Search"}
          </button>
        </div>

        {/* Conditional rendering — error irundhaa mattum show aagum */}
        {error && (
          <div className="error-card">
            <span>⚠️</span> {error}
          </div>
        )}

        {/* Loading dots — API call nadakkumbodhu show aagum */}
        {loading && (
          <div className="loading-container">
            <div className="loading-dots">
              <span /><span /><span />
            </div>
            <p className="loading-text">Fetching weather data...</p>
          </div>
        )}

        {/* Weather card — weather state-la data irundhaa, searched true-aa irundha show aagum */}
        {weather && searched && (
          <div className="weather-card">

            <div className="live-badge">
              <span className="live-dot" /> LIVE
            </div>

            <div className="location-row">
              <div>
                <h2 className="city">{weather.name}</h2>
                <p className="country">
                  {/* weather.sys.country — "IN", "US" maadiri 2-letter country code */}
                  📍 {weather.sys.country} · {new Date().toLocaleDateString("en-IN", {
                    weekday: "long", day: "numeric", month: "short"
                  })}
                </p>
              </div>
              {/* OpenWeatherMap icon URL pattern — icon code API-la varum, @4x = high resolution */}
              <img
                className="weather-icon"
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
                alt={weather.weather[0].description}
              />
            </div>

            {/* Temperature display */}
            <div className="temp-row">
              <div className="temp-display">
                {/* Math.round() — 31.7 -> 32 maadiri decimal remove pannrom */}
                <span className="temp-number">{Math.round(weather.main.temp)}</span>
                <span className="temp-unit">°C</span>
              </div>
              <div className="temp-range">
                <span className="temp-max">▲ {Math.round(weather.main.temp_max)}°</span>
                <span className="temp-min">▼ {Math.round(weather.main.temp_min)}°</span>
              </div>
            </div>

            <p className="weather-desc">{theme.label}</p>

            <div className="divider" />

            {/* 6 detail stat cards */}
            <div className="details-grid">
              <div className="detail-card">
                <span className="detail-icon">🌡️</span>
                <span className="detail-value">{Math.round(weather.main.feels_like)}°C</span>
                <span className="detail-label">Feels Like</span>
              </div>
              <div className="detail-card">
                <span className="detail-icon">💧</span>
                <span className="detail-value">{weather.main.humidity}%</span>
                <span className="detail-label">Humidity</span>
              </div>
              <div className="detail-card">
                <span className="detail-icon">🌬️</span>
                <span className="detail-value">{weather.wind.speed} m/s</span>
                <span className="detail-label">Wind Speed</span>
              </div>
              <div className="detail-card">
                <span className="detail-icon">👁️</span>
                {/* visibility meters-la varum — 1000 divide panna km kidaikkum
                    toFixed(1) — 10.0 maadiri oru decimal varum */}
                <span className="detail-value">{(weather.visibility / 1000).toFixed(1)} km</span>
                <span className="detail-label">Visibility</span>
              </div>
              <div className="detail-card">
                <span className="detail-icon">🔼</span>
                <span className="detail-value">{weather.main.pressure} hPa</span>
                <span className="detail-label">Pressure</span>
              </div>
              <div className="detail-card">
                <span className="detail-icon">☁️</span>
                <span className="detail-value">{weather.clouds.all}%</span>
                <span className="detail-label">Cloud Cover</span>
              </div>
            </div>

            {/* Sunrise / Sunset — Unix timestamp (seconds) to readable time.
                * 1000 — JavaScript Date milliseconds expect pannum, API seconds kudukum */}
            <div className="sun-row">
              <div className="sun-item">
                <span className="sun-icon">🌅</span>
                <div>
                  <p className="sun-label">Sunrise</p>
                  <p className="sun-time">
                    {new Date(weather.sys.sunrise * 1000).toLocaleTimeString("en-IN", {
                      hour: "2-digit", minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
              <div className="sun-divider" />
              <div className="sun-item">
                <span className="sun-icon">🌇</span>
                <div>
                  <p className="sun-label">Sunset</p>
                  <p className="sun-time">
                    {new Date(weather.sys.sunset * 1000).toLocaleTimeString("en-IN", {
                      hour: "2-digit", minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* Placeholder — initial state, no search yet */}
        {!weather && !loading && !error && (
          <div className="placeholder">
            <div className="placeholder-icon">🗺️</div>
            <p className="placeholder-text">Search any city to see live weather!</p>
            <p className="placeholder-sub">Try "Chennai", "Mumbai", "London", "Tokyo"</p>
          </div>
        )}

      </div>
    </div>
  );
}

export default App;
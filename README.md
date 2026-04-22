# 🌤️ WeatherApp

A modern, responsive weather application built with **React + Vite** that fetches real-time weather data from the OpenWeatherMap API. The app features dynamic theme changes based on weather conditions, glassmorphism UI design, smooth CSS animations, and detailed weather statistics.

![Weather App Preview](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-1.x-5A29E4?style=for-the-badge&logo=axios&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-Animations-1572B6?style=for-the-badge&logo=css3&logoColor=white)

---

## 🌐 Live Demo

👉 [View Live App]([(https://vanilai-weatherapp.vercel.app/)]) <!-- Replace with your Vercel URL -->

---

## ✨ Features

**Dynamic Weather Themes** — The background gradient automatically changes based on the current weather condition. Sunny weather gives warm orange-yellow tones, rainy weather shifts to deep blues, and thunderstorms trigger a dramatic purple gradient. This is achieved by mapping OpenWeatherMap's `weather.main` values (like `"Clear"`, `"Rain"`, `"Thunderstorm"`) to a theme object in JavaScript.

**Glassmorphism UI** — The weather card uses `backdrop-filter: blur(25px)` combined with semi-transparent `rgba` backgrounds to create a modern frosted-glass effect that looks great on top of any gradient background.

**Real-time Weather Data** — Fetches live data including temperature, feels-like temperature, humidity, wind speed, visibility, air pressure, cloud coverage, and sunrise/sunset times — all from a single OpenWeatherMap API call.

**Smooth CSS Animations** — Floating ambient orbs in the background, a wobbling emoji icon, a floating weather icon, bouncing loading dots, a shake animation on error, and a spring-bounce card entry (`cubic-bezier`) — all done with pure CSS, no animation libraries needed.

**Keyboard Accessible** — Users can press `Enter` to trigger a search, making the experience faster and more natural.

**Responsive Design** — The detail grid switches from 3 columns on desktop to 2 columns on mobile screens using CSS `@media` queries.

---

## 🛠️ Tech Stack

The project uses **React 18** as the UI library, **Vite** as the build tool (chosen over Create React App for its significantly faster dev server and hot module replacement), and **Axios** for making HTTP requests to the weather API. Styling is done entirely with vanilla **CSS3**, taking advantage of custom keyframe animations, CSS variables, and `backdrop-filter` for the glass effect. The font used is **Nunito** from Google Fonts, chosen for its rounded, modern feel that suits a weather app's friendly aesthetic.

---

## 📁 Project Structure

```
weather-app/
├── public/
│   └── vite.svg
├── src/
│   ├── App.jsx          # Main component — all logic and UI lives here
│   ├── App.css          # All styles — animations, glassmorphism, responsive
│   ├── main.jsx         # React entry point — mounts App into #root div
│   └── index.css        # Global reset — html, body, #root full-screen setup
├── index.html           # Single HTML file (React SPA pattern)
├── package.json         # Project dependencies and scripts
└── vite.config.js       # Vite configuration
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have **Node.js** (v18 or above) installed. You can check by running `node --version` in your terminal.

### Installation

First, clone the repository to your local machine:

```bash
git clone https://github.com/your-username/weather-app.git
cd weather-app
```

Then install all dependencies:

```bash
npm install
```

### API Key Setup

This project uses the [OpenWeatherMap API](https://openweathermap.org/api). You need a free API key to fetch weather data.

1. Go to [openweathermap.org](https://openweathermap.org) and create a free account.
2. Navigate to **API Keys** in your dashboard and copy your key.
3. Open `src/App.jsx` and replace the placeholder on this line:

```js
const API_KEY = "your_actual_api_key_here";
```

> ⚠️ **Note:** Newly created API keys can take up to 2 hours to activate. If you get a 401 error, wait a bit and try again.

### Running the Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:5173` in your browser.

---

## 🌦️ How It Works

When a user types a city name and clicks Search (or presses Enter), the `fetchWeather` function runs. It sets `loading` to `true` to show the spinner, then uses `axios.get()` to call the OpenWeatherMap API with the city name, the API key, and `units=metric` (so temperature comes back in Celsius).

If the call succeeds, the response data is stored in the `weather` state variable using `setWeather(res.data)`. React automatically re-renders the UI whenever state changes, so the weather card appears with all the data. If the call fails (wrong city name, expired key, network issue), the `catch` block runs and sets an error message.

The dynamic background works by reading `weather.weather[0].main` from the API response — this gives a string like `"Clear"` or `"Thunderstorm"` — and passing it into the `getWeatherTheme()` function, which returns the matching gradient and emoji. That gradient is applied via inline `style={{ background: theme.gradient }}` on the root `div`, and CSS `transition: background 1.2s ease` makes the color change smooth.

---

## 📦 Deployment

This app is deployed on **Vercel**. To deploy your own copy:

1. Push your code to a GitHub repository.
2. Go to [vercel.com](https://vercel.com) and log in with GitHub.
3. Click **"Add New Project"** and import your `weather-app` repository.
4. Vercel auto-detects it as a Vite/React project and configures the build settings automatically.
5. Click **Deploy** — your live URL will be ready in about 2 minutes.

---

## 🔮 Future Improvements

A 5-day forecast section would be a great next feature, using OpenWeatherMap's `/forecast` endpoint. Adding a geolocation button (using the browser's `navigator.geolocation` API) would let users instantly see their current location's weather without typing. A search history saved to `localStorage` would also improve the user experience.

---

## 🙌 Author

**Your Name** — [GitHub](https://github.com/dhilip2103) · [LinkedIn](www.linkedin.com/in/dhilip-k-21mar03)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

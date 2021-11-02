// https://openweathermap.org/

class Coord {
  lon: number;
  lat: number;
}

class WeatherDescription {
  id: number;
  main: string;
  description: string;
  icon: string;
}

class Main {
  temp: number;
  pressure: number;
  humidity: number;
  temp_min: number;
  temp_max: number;
}

class Wind {
  speed: number;
  deg: number;
}

class Clouds {
  all: number;
}

class Sys {
  type: number;
  id: number;
  message: number;
  country: string;
  sunrise: number;
  sunset: number;
}

export type Weather = {
    coord: Coord;
    weather: WeatherDescription[];
    base: string;
    main: Main;
    visibility: number;
    wind: Wind;
    clouds: Clouds;
    dt: number;
    sys: Sys;
    id: number;
    name: string;
    cod: number;
}

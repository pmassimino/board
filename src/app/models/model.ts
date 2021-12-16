export class CotizacionCereal {
    id: number;
    fecha: Date;
    idCereal: string;
    idMercado: string;
    idMoneda: string;
    precio: number;
    obs: string;
    cereal: Cereal;
    mercado: Mercado;
}
export class PizarraCereal
{
  id_mercado:string;
  fecha:Date;
  soja:number;
  trigo:number; 
  maiz:number;
  sorgo:number;
  girasol:number;
}

export class Cereal {
    id: string;
    nombre: string;
}
export class Mercado {
    id: string;
    nombre: string;
}



export interface Information {
        temperature: string;
        wind: string;
        humidity: string;
        pressure: string;
}

export interface Locality {
        name: string;
        url_weather_forecast_15_days: string;
        url_hourly_forecast: string;
        country: string;
        url_country: string;
}

export interface Day {
        date: string;
        temperature_max: number;
        temperature_min: number;
        icon: string;
        text: string;
        humidity: number;
        wind: number;
        wind_direction: string;
        icon_wind: string;
        sunrise: string;
        sunset: string;
        moonrise: string;
        moonset: string;
        moon_phases_icon: string;
}

    

export interface Hour {
        date: string;
        hour_data: string;
        temperature: number;
        text: string;
        humidity: number;
        pressure: number;
        icon: string;
        wind: number;
        wind_direction: string;
        icon_wind: string;
}


export interface HourHour {
        hour1: Hour;
        hour2: Hour;
        hour3: Hour;
        hour4: Hour;
        hour5: Hour;
        hour6: Hour;
        hour7: Hour;
        hour8: Hour;
        hour9: Hour;
        hour10: Hour;
        hour11: Hour;
        hour12: Hour;
        hour13: Hour;
        hour14: Hour;
        hour15: Hour;
        hour16: Hour;
        hour17: Hour;
        hour18: Hour;
        hour19: Hour;
        hour20: Hour;
        hour21: Hour;
        hour22: Hour;
        hour23: Hour;
        hour24: Hour;
        hour25: Hour;
}

export interface TiempoInfo {
        copyright: string;
        use: string;
        information: Information;
        web: string;
        language: string;
        locality: Locality;
        day1: Day;
        day2: Day;
        day3: Day;
        day4: Day;
        day5: Day;
        day6: Day;
        day7: Day;
        hour_hour: HourHour;
}


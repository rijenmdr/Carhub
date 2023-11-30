import { FilterProps, ICar } from "@/types/car";
import axios from "axios"

export async function fetchCars(filter: FilterProps) {
    const { manufacturer, model, fuel, limit, year } = filter
    try {
        const headers = {
            'X-RapidAPI-Key': process.env.RAPID_API_KEY,
            'X-RapidAPI-Host': process.env.RAPID_API_HOST
        }

        const response = await axios(`https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?
            model=${model}&make=${manufacturer}&fuel_type=${fuel}&year=${year}&limit=${limit}`, {
            headers
        })
        const result: ICar[] = response?.data;

        return result
    } catch (err) {

    }
}

export const calculateCarRent = (city_mpg: number, year: number) => {
    const basePricePerDay = 50; // Base rental price per day in dollars
    const mileageFactor = 0.1; // Additional rate per mile driven
    const ageFactor = 0.05; // Additional rate per year of vehicle age

    // Calculate additional rate based on mileage and age
    const mileageRate = city_mpg * mileageFactor;
    const ageRate = (new Date().getFullYear() - year) * ageFactor;

    // Calculate total rental rate per day
    const rentalRatePerDay = basePricePerDay + mileageRate + ageRate;

    return rentalRatePerDay.toFixed(0);
};

export const generateCarImage = (car: ICar, angle?: string) => {
    const url = new URL("https://cdn.imagin.studio/getimage");
    const { make, model, year } = car;

    url.searchParams.append('customer', process.env.NEXT_PUBLIC_IMAGIN_API_KEY || '');
    url.searchParams.append('make', make);
    url.searchParams.append('modelFamily', model.split(" ")[0]);
    url.searchParams.append('zoomType', 'fullscreen');
    url.searchParams.append('modelYear', `${year}`);
    // url.searchParams.append('zoomLevel', zoomLevel);
    url.searchParams.append('angle', `${angle}`);

    return `${url}`;
}

export const updateSearchParams = (title: string, value: string) => {
    const searchParams = new URLSearchParams(window.location.search);

    if(value) searchParams.set(title, value);
    else searchParams.delete(title);

    const newPathname = `${window.location.pathname}?${searchParams?.toString()}`;

    return newPathname;
}
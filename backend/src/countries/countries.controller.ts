import { HttpService } from '@nestjs/axios';
import { Controller, Get, Param } from '@nestjs/common';
import axios, { AxiosResponse } from 'axios';
import { map, Observable } from 'rxjs';

@Controller('countries')
export class CountriesController {

    constructor(private readonly httpService: HttpService) { }
    @Get()
    getAllCountries(): Observable<AxiosResponse<any>> {
        const url = 'https://date.nager.at/api/v3/AvailableCountries';

        // Use HttpService to make the GET request to the external API
        return this.httpService.get(url).pipe(
            map((response) => {
                // Return the response from the external API
                return response.data;
            })
        );
    }

    @Get(':country')
    async getCountryDetails(@Param('country') country: string) {
        const countryName = country.split('-')[0];
        const countryCode = country.split('-')[1];
        try {
            const borderURL = `https://date.nager.at/api/v3/CountryInfo/${countryCode}`;
            const borders = await axios.get(borderURL);
            const bordersData = borders.data;

            const populationURL = `https://countriesnow.space/api/v0.1/countries/population`;
            const population = await axios.post(populationURL, {
                country: countryName
            });
            const populationData = population.data.data.populationCounts ? population.data.data.populationCounts : 'Population not found';

            let flagData = 'Flag not found';
            try {
                const flagURL = `https://countriesnow.space/api/v0.1/countries/flag/images`;
                const flag = await axios.post(flagURL, {
                    iso2: countryCode
                });
                flagData = flag.data.data.flag;
            } catch (error) {
            }

            return { ...bordersData, flag: flagData, population: populationData };
        } catch (error) {
            console.log(error);
            return { success: false, message: error };
        }
    }
}

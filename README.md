# Countries Info App

This is a simple app that displays information about countries: population over time and border countries.

## Information

This app has a front and back-end. The front end is a Next.js app and the back end is a NestJS app.

### Front-end (Next.js)

The Front-end is developed on [Next.js](https://nextjs.org/) with [Tailwind CSS](https://tailwindcss.com/) for CSS and [shadcn/ui](https://shadcn.dev/) for components.

The Front-end has two pages:

1. **Home Page (/)**: Displays a list of countries.
2. **Country Detail Page (/[Name_Code])**: Shows a graphic of the population over time and a list of border countries (one can click the country and travel to the border country page).

### Back-end (NestJS)

The Back-end has two GET endpoints:

1. **GET /countries**: Returns a list of countries with their name and code (taken from [here](https://date.nager.at/api/v3/AvailableCountries))
2. **GET /countries/[Name_Code]**: Returns information about the country with the [population](https://countriesnow.space/api/v0.1/countries/population/), [border countries](https://date.nager.at/api/v3/CountryInfo/BO) and a URL to the flag image.

## How to run

To run this app locally, you need to have [Node.js](https://nodejs.org/en/) installed. Install NestJS with:

`bash npm install -g @nestjs/cli`

Then, clone this repository and run the following commands:

```bash
    cd backend
    npm install
    npm run start

 # Then we change to the frontend folder
    cd ..
    cd frontend
    npm install
    npm start

```

After that you can access the app on [http://localhost:3000](http://localhost:3000).

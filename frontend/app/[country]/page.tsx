'use client'
import { useEffect, useState } from "react"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import PopulationChart from "./_components/populationChart"

export interface countryData {
    commonName: string,
    officialName: string,
    region: string,
    countryCode: string,
    flag: string,
    population: {
        year: number,
        value: number
    }[],
    borders: borderCountry[]
}

interface borderCountry {
    commonName: string,
    officialName: string
    countryCode: string
    region: string
}

export default function Country({ params }: { params: { country: string } }) {

    const countryName = params.country.split('-')[0]
    const countryCode = params.country.split('-')[1]

    const [data, setData] = useState<countryData>()
    const [error, setError] = useState(false)

    useEffect(() => {
        console.log(params.country)
        fetch(`http://localhost:3001/countries/${params.country}`)
            .then(response => response.json())
            .then(data => {
                if (data.success == false) {
                    setError(true)
                } else {
                    setData(data)
                }
                console.log(data)
            })
            .catch(error => console.error(error))
    }, [])


    if (data) {
        return (
            <div className="w-full p-2">
                <Card className="my-3">
                    <CardHeader className="">
                        <div className="flex justify-center gap-2 w-full items-center">
                            <div className="text-4xl text-center">{data?.officialName}</div>
                            {data.flag == "Flag not found" ? <></> : <img src={data.flag} className="h-10" />}
                        </div>
                    </CardHeader>
                </Card>
                <div className="flex sm:flex-row flex-col justify-between gap-3">
                    <Card className="w-full">
                        <CardHeader>
                            <CardTitle>Population History</CardTitle>
                            <CardDescription>Chart of the population history of {countryName}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="w-full h-96 bg-gray-200 flex items-center justify-center">
                                <PopulationChart populationData={data.population} />
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="basis-5/12">
                        <CardHeader>
                            <CardTitle>Border Countries</CardTitle>
                            <CardDescription>List of countries that border {countryName}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {data && data.borders.map((border: borderCountry, i) => (
                                <Link key={i} href={`${border.commonName}-${border.countryCode}`}>
                                    <Button variant={"outline"} className="my-2 p-4 flex flex-col items-start w-full">
                                        <div>{border.commonName} ({border.countryCode})</div>
                                    </Button>
                                </Link>
                            ))
                            }
                        </CardContent>
                    </Card>
                </div>
            </div>
        )
    } else if (error) {
        return (
            <Card className="min-w-1/2 max-w-[90%] m-auto my-4">
                <CardHeader>
                    <CardTitle>Error</CardTitle>
                    <CardDescription>Country not found</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>Sorry. The country of {countryName} couldn't be found in the list of countries we have information on.</p>
                </CardContent>
                <CardFooter>
                    <Link href="/">
                        <Button>Return to Country List</Button>
                    </Link>
                </CardFooter>
            </Card>
        )
    } else {
        return (
            <div className="w-full p-2">
                <div className="text-6xl text-center my-2">Loading...</div>
            </div>
        )
    }
}
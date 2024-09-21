'use client'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import Link from "next/link"
import { useEffect, useState } from "react"

export interface countryList {
  name: string
  countryCode: string
}

export default function Home() {

  const [countries, setCountries] = useState<countryList[]>([])

  useEffect(
    () => {
      fetch('http://localhost:3001/countries')
        .then(response => response.json())
        .then(data => setCountries(data))
        .catch(error => console.error(error))
    }, [])

  return (
    <div className='w-full pb-4'>

      <p className="m-auto text-2xl text-center my-4">Country List</p>

      <div className="flex flex-row justify-center flex-wrap gap-2 overflow-y-auto h-dvh">
        {countries.map((country: countryList, i) =>
          <Link href={`/${country.name}-${country.countryCode}`} className="basis-5/12 w-full">
            <Button variant={"secondary"} key={i} className="p-2 text-gray-800 w-full flex justify-between hover:gray-800">
                <div className="font-semibold text-lg">
                  {country.name}
                </div>

                <div className="font-light">
                  ({country.countryCode})
                </div>
            </Button>
          </Link>
        )}
      </div>

    </div>
  )
}

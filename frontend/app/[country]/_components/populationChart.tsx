import {
    ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
  } from "@/components/ui/chart"
  import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"

const chartConfig = {
    desktop: {
        label: "Population",
        color: "#2563eb",
    }
} satisfies ChartConfig


export default function PopulationChart({ populationData }: { populationData: { year: number, value: number }[] }) {
    return (
        <ChartContainer config={chartConfig} className="min-h-[200px] w-full max-h-full">
            <BarChart accessibilityLayer width={500} height={100} data={populationData}>
                <CartesianGrid vertical={true} />
                <YAxis
                    dataKey="value"
                    tickLine={false}
                    axisLine={true}
                    tickFormatter={(value) => value/1000000 + "M"}
                />
                <XAxis
                    dataKey="year"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={true}
                    tickFormatter={(value) => value.toString()}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <ChartLegend content={<ChartLegendContent  />} />
                <Bar dataKey={"value"} fill={chartConfig.desktop.color} />
            </BarChart>
        </ChartContainer>
    )
}
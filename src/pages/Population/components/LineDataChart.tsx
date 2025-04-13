import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LabelList
} from 'recharts'
import { PopulationItem } from '../domain/PopulationItem'

type Props = {
  data: PopulationItem[]
}

const LineDataChart: React.FC<Props> = ({ data }) => {
  const minPopulation = Math.floor(Math.min(...data.map(d => d.Population)) / 10_000_000) * 10_000_000
  const maxPopulation = Math.ceil(Math.max(...data.map(d => d.Population)) / 10_000_000) * 10_000_000
  
  return (
    <>
      <h4 className="font-bold mb-2">Data di Line Chart</h4>
      <div className="max-md:overflow-x-auto">
        <div className="md:w-full max-md:w-[700px]">
          <ResponsiveContainer width={"100%"} height={500}>
            <LineChart
              width={500}
              height={300}
              data={data}
              margin={{
                top: 30,
                right: 40,
                left: 10,
                bottom: 30,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="Year" 
                padding={{ left: 40, right: 40 }}
                height={60}
              />
              <YAxis 
                domain={[minPopulation, maxPopulation]}
                tickFormatter={(value) => {
                  if (value >= 1_000_000) return `${value / 1_000_000}M`
                  return value
                }}
              />
              <Tooltip
                formatter={(value: number) => new Intl.NumberFormat('id-ID').format(value)} 
              />
              <Legend />
              <Line type="monotone" dataKey="Population" stroke="#8884d8" >
                <LabelList 
                  dataKey="Population" 
                  position="top" 
                  formatter={(value: number) => {
                    if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`
                    if (value >= 1_000) return `${(value / 1_000).toFixed(0)}K`
                    return value.toString()
                  }} 
                />
              </Line>
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  )
}

export default LineDataChart
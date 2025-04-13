import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import LineDataChart from '@/pages/Population/components/LineDataChart'
import PieDataChart from '@/pages/Population/components/PieDataChart'
import { fetchPopulationData } from '../services/api';

const Population = () => {
  const [startYear, setStartYear] = useState<number | null>(null);
  const [endYear, setEndYear] = useState<number | null>(null);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['population'], 
    queryFn: fetchPopulationData,
  });

  const yearsList = Array.from(new Set(data?.items.map(item => item['ID Year']))).sort().reverse();
  const defaultEndYear = yearsList[0];
  const defaultStartYear = yearsList[yearsList.length - 1];

  const filteredData = data?.items.filter(item => {
    const isAfterStart = !startYear || item['ID Year'] >= startYear
    const isBeforeEnd = !endYear || item['ID Year'] <= endYear
    return isAfterStart && isBeforeEnd
  })

  return (
    <>
      {isLoading && (
        <div className="card">
          <div className="border-b p-4 mb-4 border-gray-200">
            <p>Please wait!</p>
          </div>
        </div>
      )}
      {isError && (
        <div className="card">
          <div className="border-b p-4 mb-4 border-gray-200">
            <p>Something went wrong!</p>
          </div>
        </div>
      )}
      {!isError && !isLoading && (
        <>
          <div className="card">
            <div className="border-b p-4 mb-4 border-gray-200">
              <h2 className="text-xl font-bold mb-2">{data?.sourceName || ''}</h2>
              <p className="text-[14px]">{data?.sourceDescription || ''}</p>
            </div>
          </div>
          <div className="card">
            <div className="border-b p-4 mb-4 border-gray-200">
            <div className="xs:flex gap-4">
              <div className="xs:flex max-xs:mb-2 gap-3">
                <label className="block leading-9 py-1">Start Year</label>
                <select
                  value={startYear ?? defaultStartYear}
                  onChange={(e) => setStartYear(parseInt(e.target.value) || null)}
                  className="border border-gray-400 px-1 py-2 min-w-[100px] max-xs:w-full rounded-lg"
                >
                  {yearsList.map(year => (
                    <option key={year} value={year} disabled={(endYear && year >= endYear) || (!endYear && year >= defaultEndYear)}>{year}</option>
                  ))}
                </select>
              </div>

              <div className="xs:flex gap-3">
                <label className="block leading-9 py-1">End Year</label>
                <select
                  value={endYear ?? defaultEndYear}
                  onChange={(e) => setEndYear(parseInt(e.target.value) || null)}
                  className="border border-gray-400 px-1 py-2 min-w-[100px] max-xs:w-full rounded-lg"
                >
                  {yearsList.map(year => (
                    <option key={year} value={year} disabled={(startYear && year <= startYear) || (!startYear && year <= defaultStartYear)}>{year}</option>
                  ))}
                </select>
              </div>
            </div>
            </div>
          </div>
          {filteredData?.length && (
            <>
              <div className="grid xl:grid-cols-2 grid-cols-1 gap-4">
                <div className="card">
                  <div className="p-4 w-full">
                    <LineDataChart data={filteredData ?? []} />
                  </div>
                </div>
                <div className="card">
                  <div className="p-4 w-full">
                    <PieDataChart data={filteredData ?? []} />
                  </div>
                </div>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
}

export default Population
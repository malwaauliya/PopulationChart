import axios from 'axios'
import { PopulationItem } from '../domain/PopulationItem'

type PopulationSource = {
  annotations: {
    source_name: string
    source_description: string
  }
}

type PopulationResponse = {
  data: PopulationItem[]
  source: PopulationSource[]
}

type PopulationData = {
  items: PopulationItem[]
  sourceName: string
  sourceDescription: string
}

const apiClient = axios.create({
  baseURL: 'https://datausa.io'
})

export const fetchPopulationData = async (): Promise<PopulationData> => {
  const { data } = await apiClient.get<PopulationResponse>('/api/data?drilldowns=Nation&measures=Population');
  return {
    items: data.data,
    sourceName: data.source[0].annotations.source_name,
    sourceDescription: data.source[0].annotations.source_description,
  }
}
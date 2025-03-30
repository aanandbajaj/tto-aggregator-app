import { useState } from 'react'
import { supabase } from '../supabase'

interface TechnologyListing {
  id: number
  title: string
  description?: string
  inventors: string[]
  technology_areas: string[]
}

interface SupabaseTechnologyListing {
  id: number
  title: string
  case_number: string
  inventors: string[]
  technology_areas: string[]
  technology_details: {
    description: string | null
  } | null
}

export function useSearchTechnologies() {
  const [results, setResults] = useState<TechnologyListing[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const searchTechnologies = async (query: string) => {
    try {
      setIsLoading(true)
      setError(null)

      const { data, error } = await supabase
        .from('technology_listings')
        .select(`
          id,
          title,
          inventors,
          technology_areas,
          technology_details!technology_details_technology_id_fkey (
            description
          )
        `)
        .textSearch('title', query)
        .limit(20)

      if (error) {
        console.error('Supabase error:', error)
        throw error
      }

      if (!data) {
        console.error('No data returned')
        throw new Error('No data returned from Supabase')
      }

      const formattedData = (data as unknown as SupabaseTechnologyListing[])?.map(item => ({
        id: item.id,
        title: item.title,
        inventors: item.inventors,
        technology_areas: item.technology_areas,
        description: item.technology_details?.description ?? undefined
      })) || []

      setResults(formattedData)
    } catch (err) {
      console.error('Search error:', err)
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  return { results, isLoading, error, searchTechnologies }
} 
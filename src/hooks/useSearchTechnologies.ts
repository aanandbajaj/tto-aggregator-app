import { useState } from 'react'
import { supabase } from '../supabase'

interface TechnologyListing {
  id: number
  title: string
  description?: string
  inventors: string[]
  technology_areas: string[]
  university_name?: string
  case_number?: string
  url?: string
  cleaned_url?: string
  details_url?: string
}

interface SupabaseTechnologyListing {
  id: number
  title: string
  case_number: string
  inventors: string[]
  technology_areas: string[]
  university_id: number
  url?: string
  cleaned_url?: string
  universities: {
    name: string
  } | null
  technology_details: {
    description: string | null
    refined_description: string | null
    url?: string
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

      let searchQuery = query.trim();
      let orTerms: string[] = [];
      let notTerms: string[] = [];
      let andTerms: string[] = [];
      let quotedPhrases: string[] = [];

      // Extract quoted phrases and remove them from the query string
      searchQuery = searchQuery.replace(/"([^"]+)"/g, (_, phrase) => {
        quotedPhrases.push(phrase.trim());
        return ''; // Remove from searchQuery
      }).trim();

      // Process OR terms (format: "term1 OR term2")
      if (searchQuery.includes(" OR ")) {
        orTerms = searchQuery.split(" OR ").map(term => term.trim());
      }
      // Process NOT terms (format: "term1 NOT term2")
      else if (searchQuery.includes(" NOT ")) {
        const parts = searchQuery.split(" NOT ");
        andTerms = [parts[0].trim()];
        notTerms = parts.slice(1).map(term => term.trim());
      }
      // Process AND terms (format: "term1 AND term2")
      else if (searchQuery.includes(" AND ")) {
        andTerms = searchQuery.split(" AND ").map(term => term.trim());
      }
      // Default case: treat as a simple query
      else if (searchQuery.length > 0) {
        andTerms = [searchQuery];
      }

      let supabaseQuery = supabase
        .from('technology_listings')
        .select(`
          id,
          title,
          inventors,
          technology_areas,
          case_number,
          url,
          cleaned_url,
          university_id,
          universities!technology_listings_university_id_fkey (
            name
          ),
          technology_details!technology_details_technology_id_fkey (
            description,
            refined_description,
            url
          )
        `);

      // Build all exact phrase match filters safely into one .or() clause
      const quotedFilters = quotedPhrases.flatMap(phrase => {
        const lower = phrase.toLowerCase();
        return [
          `title.ilike.% ${lower} %`,
          `title.ilike.${lower} %`,
          `title.ilike.% ${lower}`,
          `title.ilike.${lower}`
        ];
      });

      if (quotedFilters.length > 0) {
        supabaseQuery = supabaseQuery.or(quotedFilters.join(','));
      }

      // OR logic (title only)
      if (orTerms.length > 0) {
        const encodedTerms = orTerms.map(term => 
          `title.ilike.%${encodeURIComponent(term.toLowerCase())}%`
        );
        supabaseQuery = supabaseQuery.or(encodedTerms.join(','));
      }
      // AND logic (chained filters)
      else if (andTerms.length > 0) {
        andTerms.forEach(term => {
          supabaseQuery = supabaseQuery.ilike('title', `%${term}%`);
        });
      }

      // NOT logic
      if (notTerms.length > 0) {
        notTerms.forEach(term => {
          supabaseQuery = supabaseQuery.not('title', 'ilike', `%${term}%`);
        });
      }

      console.log('Executing title search query...');
      const { data: listingsData, error: listingsError } = await supabaseQuery;

      if (listingsError) {
        console.error('Supabase error:', listingsError);
        throw listingsError;
      }

      console.log('Title search results (first 5):', JSON.stringify((listingsData || []).slice(0, 5).map(d => ({ id: d.id, title: d.title })), null, 2));

      // Description/refined_description search
      const { data: detailsData, error: detailsError } = await supabase
        .from('technology_details')
        .select(`
          technology_id,
          description,
          refined_description
        `)
        .or([
          `description.ilike.%${query}%`,
          `refined_description.ilike.%${query}%`
        ].join(','));

      if (detailsError) {
        console.error('Supabase error:', detailsError);
        throw detailsError;
      }

      let combinedResults = [...(listingsData || [])];

      if (detailsData && detailsData.length > 0) {
        const techIds = detailsData.map(detail => detail.technology_id);

        const { data: additionalListings, error: additionalError } = await supabase
          .from('technology_listings')
          .select(`
            id,
            title,
            inventors,
            technology_areas,
            case_number,
            url,
            cleaned_url,
            university_id,
            universities!technology_listings_university_id_fkey (
              name
            ),
            technology_details!technology_details_technology_id_fkey (
              description,
              refined_description,
              url
            )
          `)
          .in('id', techIds);

        if (additionalError) {
          console.error('Supabase error:', additionalError);
          throw additionalError;
        }

        if (additionalListings) {
          const existingIds = new Set(combinedResults.map(item => item.id));
          additionalListings.forEach(item => {
            if (!existingIds.has(item.id)) {
              combinedResults.push(item);
            }
          });
        }
      }

      console.log('Combined results before mapping (first 5):', JSON.stringify(combinedResults.slice(0, 5).map(d => ({ id: d.id, title: d.title })), null, 2));

      const simplifiedFormattedData = (combinedResults as unknown as SupabaseTechnologyListing[])?.map((item) => ({
        id: item.id,
        title: item.title,
        inventors: item.inventors,
        technology_areas: item.technology_areas,
        case_number: item.case_number,
        url: item.technology_details?.url || item.cleaned_url,
        university_name: item.universities?.name,
        description: item.technology_details?.refined_description || item.technology_details?.description || undefined,
      })) || [];

      console.log('Simplified formatted data after map (first 5):', JSON.stringify(simplifiedFormattedData.slice(0, 5).map(d => ({ id: d.id, title: d.title })), null, 2));

      setResults(simplifiedFormattedData);

    } catch (err) {
      console.error('Search error:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  }

  return { results, isLoading, error, searchTechnologies }
}

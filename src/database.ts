export interface TechnologyListing {
    id: number
    university_id: number
    title: string
    case_number: string
    inventors: string[]
    technology_areas: string[]
    url: string
    created_at: string
  }
  
  export interface TechnologyDetail {
    id: number
    technology_id: number
    description: text
    ip_status: any // You might want to define a specific type for this jsonb field
    file_links: string[]
    created_at: string
  }
  
  export interface University {
    id: number
    name: string
    tech_transfer_url: string
    last_updated: string
    next_button_selector: string
    site_structure: any // You might want to define a specific type for this jsonb field
  }
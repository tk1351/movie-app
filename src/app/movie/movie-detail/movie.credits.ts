export class MovieCredits {
  id: number
  cast: {
    cast_id: number
    character: string
    credit_id: string
    gender: string
    id: number
    name: string
    order: string
    profile_path: string
    slice: any
  }
  crew: {
    credit_id: string
    department: string
    gender: string
    id: number
    job: string
    name: string
    profile_path: string
    slice: any
  }
}
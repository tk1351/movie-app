export interface MovieCredits {
  id: number
  cast: MovieCast[];
  crew: MovieCrew[]
}

export interface MovieCast {
  cast_id: number
  character: string
  credit_id: string
  gender: string
  id: number
  name: string
  order: string
  profile_path: string
}

export interface MovieCrew {
  credit_id: string
  department: string
  gender: string
  id: number
  job: string
  name: string
  profile_path: string
}
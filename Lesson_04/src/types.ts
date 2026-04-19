export type Agent = {
  id: number
  name: string
  model_type: string
  status: string
  presenting_complaints: string
}

export type Ailment = {
  id: number
  name: string
  description: string
}

export type Therapy = {
  id: number
  name: string
  description: string
}

export type AilmentWithTherapies = Ailment & { therapies: Therapy[] }

import { GeneralApiProblem } from "./api-problem"

export interface User {
  id: number
  name: string
}

export type GetCommonResult = { kind: "ok"; data: any } | GeneralApiProblem
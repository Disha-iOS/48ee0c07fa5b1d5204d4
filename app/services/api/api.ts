import { ApisauceInstance, create, ApiResponse } from "apisauce"
import { getGeneralApiProblem } from "./api-problem"
import { ApiConfig, DEFAULT_API_CONFIG } from "./api-config"
import * as Types from "./api.types"

/**
 * Manages all requests to the API.
 */
export class Api {
  /**
   * The underlying apisauce instance which performs the requests.
   */
  apisauce: ApisauceInstance

  /**
   * Configurable options.
   */
  config: ApiConfig

  /**
   * Creates the api.
   *
   * @param config The configuration to use.
   */
  constructor(config: ApiConfig = DEFAULT_API_CONFIG) {
    this.config = config
  }

  setup() {
    // construct the apisauce instance
    this.apisauce = create({
      baseURL: this.config.url,
      timeout: this.config.timeout,
      headers: {
        Accept: "application/json",
      },
    })
  }

  async getCountryDetails(countryName: string): Promise<Types.GetCommonResult> {
    // make the api call
    const response: ApiResponse<any> = await this.apisauce.get("https://restcountries.eu/rest/v2/name/"+ countryname)

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    // transform the data into the format we are expecting
    try {
      console.log(response)
      const data = response.data
      return { kind: "ok", data: data }
    } catch {
      return { kind: "bad-data" }
    }
  }

  async getWeatherDetail(countryName: string): Promise<Types.GetCommonResult> {
    // make the api call
    const response: ApiResponse<any> = await this.apisauce.get("http://api.weatherstack.com/current?access_key=0b8f2e9fe72007f716a9a265fce9f928&query="+ countryName)

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    // transform the data into the format we are expecting
    try {
      const data = response.data
      return { kind: "ok", data: data }
    } catch {
      return { kind: "bad-data" }
    }
  }
}

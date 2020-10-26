import { Instance, SnapshotOut, types, flow } from "mobx-state-tree"
import {Api} from "../../services/api"

const api = new Api()
api.setup()

export const HomeStoreModel = types
  .model("HomeStore")
  .props({
    countryData: types.optional(types.frozen(),null),
    weatherDetail: types.optional(types.frozen(),null)
  })
  .views(self => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions(self => ({
    getCountryDetail: flow(function* getCountryDetail(countryName: string){
      try {
        const data = yield api.getCountryDetails(countryName)
        if (data.kind === "ok"){
          const response = data.data
          for (let index = 0; index < response.length ; index++){
            if(response[index].name === countryName){
              self.countryData = response[index]
            }
          }
        } else {
          self.countryData = null
        }
      } catch (error){

      }
    }),
    getWeatherDetail: flow(function* getWeatherDetail(countryName: string){
      try {
        const data = yield api.getWeatherDetail(countryName)
        if (data.kind === "ok"){
          const response = data.data
          self.weatherDetail = response
        } else {
          self.weatherDetail = null
        }
      } catch (error){

      }
    }),

  })) // eslint-disable-line @typescript-eslint/no-unused-vars

 

type HomeStoreType = Instance<typeof HomeStoreModel>
export interface HomeStore extends HomeStoreType {}
type HomeStoreSnapshotType = SnapshotOut<typeof HomeStoreModel>
export interface HomeStoreSnapshot extends HomeStoreSnapshotType {}

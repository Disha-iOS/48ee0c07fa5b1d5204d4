import React, {useState, useEffect} from "react"
import { Image, ImageStyle, Platform, TextStyle, View, ViewStyle, StyleSheet } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { observer } from "mobx-react-lite"
import { BulletItem, Button, Header, Text, Screen, TextField } from "../../components"
import { color, spacing } from "../../theme"
import {SvgUri} from 'react-native-svg'
import {useStores} from "../../models"
const FULL: ViewStyle = { flex: 1 }

export const DetailScreen = observer(function DetailScreen() {

  const navigation = useNavigation()
  const {homeStore} = useStores()
  const {countryData} = homeStore
  const [isLoading, setIsLoading] = useState(false)
  const [weatherData, setWeatherData] = useState(null)

  const goBack = () => navigation.goBack()

    const renderRow = (label,value) => {
      return(
        <View style={{flexDirection: 'row'}}>
          <Text style={{flex: 1,color: 'black'}} text={label} preset={"bold"}/>
          <Text style={{flex: 1 ,color: 'black'}} text={value} preset={"bold"}/>
        </View>
      )
    }

    useEffect(() => {
      if(isLoading) {
        if(homeStore.weatherDetail) {
          setWeatherData(homeStore.weatherDetail)
        } else {

        }
        setIsLoading(false)
      }
    }, [homeStore.weatherDetail])

    const onSubmitPress = () => {
        homeStore.getWeatherDetail(countryData.capital)
        setIsLoading(true)
    }

  return (
    <View style={FULL}>
      {renderRow("capital", countryData.capital)}
      {renderRow("population", countryData.population)}
      {renderRow("latlng", countryData.latlng)}
      <View> 
        <Text style={{color: 'black'}} preset={"bold"} text="flag"/>
        <View>
          <SvgUri width="50" height="50" uri={countryData.flag}/>
        </View>
      </View>
      {
        weatherData && (
          <View style={{marginTop: 20, marginHorizontal: 20}}>
            <Text preset={"default"} text={"Weather Info"}/>
            {renderRow("temp", weatherData.current.temperature)}
            {renderRow("wind", weatherData.current.wind_speed)}
            {renderRow("precip", weatherData.current.precip)}
            <Image resizeMode="contain"
            style={{height: 40,width: 40, alignSelf: 'center'}}
            source={{uri: weatherData.current.weather_icons[0]}}
            />
          </View>
        )
      }
      <Button
        style={{marginHorizontal: 20, height: 50}}
        isLoading={isLoading}
        text="Capital Weather"
        onPress={() => {onSubmitPress()}}
      />
    </View>
  )
})

const styles = StyleSheet.create({
    textStyle: {
        marginHorizontal: 20,
        height: 50,
    }
})
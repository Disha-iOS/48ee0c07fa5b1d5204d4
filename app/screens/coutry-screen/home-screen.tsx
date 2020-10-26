import React, {useState, useEffect} from "react"
import { Image, ImageStyle, Platform, TextStyle, View, ViewStyle, StyleSheet, Alert } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { observer } from "mobx-react-lite"
import {  Button, TextField } from "../../components"
import { color, spacing } from "../../theme"
import {useStores} from "../../models"

const FULL: ViewStyle = { flex: 1 }

export const HomeScreen = observer(function HomeScreen() {

  const [countryName, setCountryName] = useState("")
  const [isValidText, setIsValidText] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const {homeStore} = useStores()  
  const navigation = useNavigation()

  const goBack = () => navigation.goBack()

    const onChangeText = (text) => {
        text ? setIsValidText(true) : setIsValidText(false)
        setCountryName(text)
    }

    const onSubmitPress = () => {
        setIsLoading(true)
        console.log(countryName);
        homeStore.getCountryDetail(countryName)
    }

    useEffect(() => {
        if (isLoading){
            if (homeStore.countryData){
                console.log(homeStore.countryData);
                navigation.navigate('detail')
            } else {
                Alert.alert("No data Found")
            }
            setIsLoading(false)
        }
    }, [homeStore.countryData])

  return (
    <View style={FULL}>
      <TextField
        onChangeText={onChangeText}
        placeholder="Enter country"
        value={countryName}
        inputStyle={styles.textFieldStyle}
      />
        <Button text="Submit" 
        disable={!isValidText} 
        isLoading={isLoading} 
        style={{...styles.buttonSubmitStyle, backgroundColor: isValidText? "green": "gray"}} 
        onPress={onSubmitPress()}
        />
    </View>
  )
})

const styles = StyleSheet.create({
    textFieldStyle: {
        marginHorizontal: 20,
        height: 50,
        padding: 10,
        color: 'black'
    },
    buttonSubmitStyle: {
        marginTop: 10,
        height: 50,
        marginHorizontal: 20
    }
})
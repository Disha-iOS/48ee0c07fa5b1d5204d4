import React, {useState, useEffect} from "react"
import { Image, ImageStyle, Platform, TextStyle, View, ViewStyle, StyleSheet } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { observer } from "mobx-react-lite"
import {  Button, TextField } from "../../components"
import { color, spacing } from "../../theme"
import { Api } from "../../services/api"
import { save } from "../../utils/storage"
export const logoIgnite = require("./logo-ignite.png")
export const heart = require("./heart.png")

const FULL: ViewStyle = { flex: 1 }

export const HomeScreen = observer(function HomeScreen() {
  const navigation = useNavigation()
  const [countryName, setCountryName] = useState("")
  const [isValidText, setIsValidText] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const goBack = () => navigation.goBack()

    const onChangeText = (value) => {
        value ? setIsValidText(true) : setIsValidText(false)
        setCountryName(value)
    }

    const onSubmitPress = () => {
        setIsLoading(true)
    }

    useEffect(() => {
        
    }, [])

  return (
    <View style={FULL}>
      <TextField
        onChangeText={onChangeText}
        placeholder="Enter country"
        value={countryName}
        inputStyle={styles.textFieldStyle}
      />
        <Button text="Submit" disable={!isValidText} isLoading={isLoading} style={{...styles.buttonSubmitStyle, backgroundColor: isValidText? "green": "gray"}}/>
    </View>
  )
})

const styles = StyleSheet.create({
    textFieldStyle: {
        marginHorizontal: 20,
        height: 50,
    },
    buttonSubmitStyle: {
        marginTop: 10,
        height: 50,
        marginHorizontal: 20
    }
})
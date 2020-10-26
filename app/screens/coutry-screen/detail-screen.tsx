import React, {useState, useEffect} from "react"
import { Image, ImageStyle, Platform, TextStyle, View, ViewStyle, StyleSheet } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { observer } from "mobx-react-lite"
import { BulletItem, Button, Header, Text, Screen, TextField } from "../../components"
import { color, spacing } from "../../theme"

const FULL: ViewStyle = { flex: 1 }

export const DetailScreen = observer(function DetailScreen() {

  const navigation = useNavigation()
  const [countryName, setCountryName] = useState("")
  const [isValidText, setIsValidText] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const goBack = () => navigation.goBack()

    const onChangeText = (value) => {

    }

    const onSubmitPress = () => {
        setIsLoading(true)
    }

    useEffect(() => {
        
    }, [])

  return (
    <View style={FULL}>
      
    </View>
  )
})

const styles = StyleSheet.create({
    textStyle: {
        marginHorizontal: 20,
        height: 50,
    }
})
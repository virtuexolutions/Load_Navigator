import { ImageBackground, ScrollView, FlatList,StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Header from '../Components/Header'
// import { FlatList } from 'native-base'

const CarDirectory = () => {
  const dummyData=[{
    id:1, name:"lorem ipsum"
  }]
  return (
    <>
        <Header 
        title="Pilot Car Directory" 
        headerColor={Color.black} 
        textstyle={{color: Color.white}}
        // showBack
        />
        <ScrollView>
            <View style={styles.dropDownContainers}>
              
            </View>
            <FlatList
            data={dummyData}
            />
        </ScrollView>
    </>
  )
}

export default CarDirectory

const styles = StyleSheet.create({})
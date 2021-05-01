import React from 'react'
import { StyleSheet, Text,TouchableOpacity,Dimensions } from 'react-native'

const windowWidth = Dimensions.get("window").width;

const Button = ({title}) => {
  return (
    <TouchableOpacity style={styles.button}>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  )
}

export default Button

const styles = StyleSheet.create({
  button:{
    borderWidth:2,
    margin:10,
    borderRadius:10,
    width:windowWidth * 0.2,
    alignItems:'center',
    justifyContent:'center',
    paddingVertical:10,
    backgroundColor:'#344fa1',
    borderColor:'#344fa1',
    elevation:2
  },
  title:{
    fontSize:18,
    color:'#fff'
  }
})

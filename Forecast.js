import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';






export default class Forecast extends React.Component{

  showForecast = () => 
  this.props.data.map((forecast, i)=>{
  
return (
<View 
  key={i} 
  style={styles.box4_1}>
    <View style={{marginVertical:-20}}>
    <Text
      numberOfLines={1} 
      style={styles.text} >{forecast.weekday}
    </Text>
    </View>
    <Image
       style={{width:120, height:120,}}
       source={{uri: "http://openweathermap.org/img/wn/"+forecast.icon+"@2x.png"}}
    />
    <View style={{marginVertical:-20}}>
    <Text
      numberOfLines={1} 
      style={styles.text} >{"min: " + Math.round(forecast.temp_min)+"ºC"}
    </Text>
    <Text
      numberOfLines={1} 
      style={styles.text} >{"max: " + Math.round(forecast.temp_max) + "ºC"}
    </Text>
    </View>
</View>
)
})

  render(){
      return(
          <View style={styles.box4}>
              {this.showForecast()}
          </View>  
      )
    }  
}

const styles = StyleSheet.create({

      box4_1:{
        flexDirection:'column',
        justifyContent:'flex-start',
        flex : 1,
        alignItems:'center',
        marginHorizontal : 60, 
        marginVertical: 28,
        // zIndex: 99,
            
      },
      box4:{
        flex:8,
        flexWrap:'wrap',
        flexDirection:'row',
        justifyContent:'space-around',
        // backgroundColor:'yellow'  
      },
      text:{
        color: 'white',
        fontSize: 15,
        
        // marginVertical: -15
      }
    })
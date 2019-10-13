import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions} from 'react-native';
import axios from 'axios';
import InputSearch from './InputSearch';
import Weekday from './Weekday';
import Forecast from './Forecast';
import Spinner from 'react-native-loading-spinner-overlay';


const OpenWeatherAPI = "7e05e04043d46b948cbcc40ee41ae69b";
const GoogleAPI= "AIzaSyBvTxlkfE6_2E5KawdmVGhMFWL9-ppaHN8";
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);





export default class App extends React.Component{
  state ={
    forecast : [],
    currentWeather : [],
    searchCity: false,
    currentCity : "",
    spinner: false,
  }

  componentDidMount() {
    this.state.searchCity=false;
    let response
    run = this.handleCitySelection;
    this.setState({spinner:true});
  
    try{
      navigator.geolocation.getCurrentPosition(async function(position){
       var pos={
         lat: position.coords.latitude,
         lng : position.coords.longitude
       }

       pos={lat:41.38, lng:2.13};
       let url = "https://maps.googleapis.com/maps/api/geocode/json?latlng="+pos.lat+","+pos.lng+"&key="+GoogleAPI
       
       response = await axios.get(url);
       run(response.data.results[9].formatted_address)
     })
         
   }catch(error){
     console.log(error);
   }  
  }

  searchNewCity = () => {
    this.setState({searchCity:true})
  }

  cancellSearch = () => {
    this.setState({searchCity:false})
  }

  handleCitySelection = async (city) => {
     
    try{       
       let url = "http://api.openweathermap.org/data/2.5/forecast?q="+city+",es&APPID="+OpenWeatherAPI;
       const res = await axios.get(url); 
       let forecast = this.handleForecastData(res.data.list)
       let currentWeather = forecast[0];
       forecast.splice(0,1);
       this.setState({forecast, currentWeather, searchCity:false, currentCity : city, spinner:false})
       
     }catch(error){
     console.log(error);
   }
  }

  handleForecastData(data){
    var weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var weekday = "";
    let result = []
    let date = new Date();
    currentDate = data[0].dt_txt;
    let j = 0;
    let day ="";
    result.push({temp:data[0].main.temp-273, icon:data[0].weather[0].icon})
    for (i=0; i<data.length; i++){
      if (this.newDayData(data[i].dt_txt, currentDate)){
        day = date.getDay()
        if (day + j >= 6){  
          weekday = weekdays[j+1];
        }else{
          weekday = weekdays[day + j+1];
        }
        result.push({temp_min:data[i].main.temp_min-273, temp_max:data[i].main.temp_max-273, icon:data[i].weather[0].icon, weekday})
        currentDate=data[i].dt_txt;
        j=j+1;
        
      }
    }
    
    return result
  }

  newDayData(date, currentDate){
    let result = false;
    let day = date.substring(0,date.indexOf(" "))
    let hour = date.substring(date.indexOf(" ")+1,date.length)
    if (currentDate !== day && hour === "12:00:00"){
      result = true;
    }
    return result;
  }


  render(){
    
  const styles = StyleSheet.create({

    container: {
      flex: 1,
      top:30,
      // backgroundColor: this.state.searchCity? 'rgba(37, 50, 56, 0.6)' : 'rgba(0, 0, 102, 1)',
      backgroundColor: 'rgba(0, 0, 102, 1)',
      // alignItems: 'center',
      justifyContent: 'flex-start',
      margin: 0,
      padding: 0,
      flexDirection:'column',
      width : screenWidth,
      height : screenHeight,
      // width : 210,
    },
    input:{
      minHeight: 40, 
      borderColor: 'gray', 
      width:150,
      borderWidth: 1  
    },
    text:{
       fontSize:20,
       color:'white'
     },
    button:{
      borderColor:'black',
      borderWidth:1,
      height:40,
      width:150,
  
    },
    box2:{
      alignSelf: 'center',
      // width:200,
      fontSize:120,
      flex:1,
      margin:20,
      // backgroundColor: 'red'
    },
    box3:{
      flex:3,
      flexDirection:'column',
      justifyContent:'flex-start',
      alignItems:'center',
      // backgroundColor:'green'
    },
  
  
  
  });
  
      return (
            <View style={styles.container}>
              <Spinner 
                visible={this.state.spinner}
                textContent={'Loading...'}
                overlayColor='black'              
                textStyle={{color:'white'}}
                />
              <Weekday></Weekday>
              <View style = {styles.box2}>
                <Text  onPress={this.searchNewCity} style={{fontSize:30, color: 'white'}}>{this.state.currentCity}</Text>
              
              </View>
              <View style={styles.box3}>
                <Text style={{fontSize:20, color:'white', marginBottom:-40}}>{Math.round(this.state.currentWeather.temp) + "ºC - actual"} </Text>
                <Image
                  style={{width:200, height:200}}
                  source={{uri: "http://openweathermap.org/img/wn/"+this.state.currentWeather.icon+"@2x.png"}}
                />
              </View>
              <Forecast data={this.state.forecast}></Forecast>
              {this.state.searchCity? <InputSearch cancellSearch={this.cancellSearch} handleCitySelection={this.handleCitySelection} ></InputSearch> : null}  
            </View>
      )
      
  }


}


import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import {Icon} from 'react-native-elements';




export default class Weekday extends React.Component{
    state ={
        date : "",
        hour : "",  
     }


  componentDidMount() {
    setInterval( () => {
        var d = new Date();
        var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        var month = months[d.getMonth()];
        var day = d.getDate();
        var hour = d.getHours ();
        var minutes = d.getMinutes();
        var seconds = d.getSeconds();
        var weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        var weekday = weekdays[d.getDay()];
        this.setState({
        //Setting the value of the date time
        date: day + " " + month + " / " + weekday,
        hour : hour + ":" + minutes + ":" + seconds
        });
      },1000)
  }

  



  render(){

      return(
        <View style={styles.box1}>
                <View style = {styles.icon}>
                   <Icon
                     name='room'
                     type='material'
                     color='white'
                    />
                </View>
                <View style={styles.date}>
                   <Text style={styles.text}>{this.state.date}</Text>
                </View>
                <View style={styles.hour}>
                   <Text style={styles.text}>{this.state.hour}</Text>
                </View>
        </View> 

      )
    }

      
  

}

const styles = StyleSheet.create({

    date:{
        alignSelf: 'stretch',
      },
      hour:{
        // alignSelf: 'flex-end',
        // width: 60,
      },
      icon:{
        alignSelf: 'flex-start',
      },
      text:{
        // fontSize:20,
         color:'white'
       },
      box1:{
        flexDirection:'row',
        justifyContent:'space-around',
        flex : 1,
       
      }
    })
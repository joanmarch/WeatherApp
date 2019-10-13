import React from 'react';
import { StyleSheet, Text, View,  TextInput } from 'react-native';
import axios from 'axios';
import {Icon} from 'react-native-elements';



const GoogleAPI= "AIzaSyBvTxlkfE6_2E5KawdmVGhMFWL9-ppaHN8";


export default class InputSearch extends React.Component{
  state ={
    query:[],
    search:""
  }

  componentDidMount() {
    this.state.query=[]
  }

   updateSearch =  search =>{
      var timeout = null;
      clearTimeout(timeout);
      let aux = this
      timeout = setTimeout(async function () {   
      try{     
         let url = "https://maps.googleapis.com/maps/api/place/autocomplete/json?input="+search+"&types=(cities)&language=es&key="+GoogleAPI
         const res = await axios.get(url);
         if (res.data.status === "OK"){
          // this.state.query = [...res.data.predictions]
         aux.setState({query:res.data.predictions})                   
         }              
      }catch(error){
       console.log(error);
      }         
      }, 500)
      this.setState({ search });
  }
  


  showAutocomplete = () => 
        this.state.query.map((city, i)=>{
        let bgc;
        i % 2 !=0 ? bgc = "transparent" : bgc = 'transparent'
      return (
      <View 
        key={i} 
        style={{backgroundColor:bgc}}>
       <View>
          <Text
            onPress= {()=>this.props.handleCitySelection(city.description)}
            numberOfLines={1} 
            style={{color:'white', fontSize: 20}} >{city.description}
          </Text>
            
        </View>
                <View
            style={{
              borderBottomColor: 'black',
              borderBottomWidth: 1,
              width:300
            }}
          />
      </View>
      )
    })
  




  render(){
  //   const { query } = this.state;
  // const data = this._filterData(query);
  
      return(
        <View style = {styles.veil}>
        <View style={styles.container}>
          <View style = {styles.box1}>
            <Text style={{color:'white', margin:6}}>Enter city or postcode</Text>

          </View>
          <View style= {styles.box2}>
            <View style= {styles.box2_1}>
              <Icon
               name='search'
               type='material'
               color='white'
               containerStyle={{alignSelf:'center', marginLeft: 7}}
              />
              <TextInput
               style={styles.input}
               onChangeText={(text) => this.updateSearch(text)}
               value={this.state.search}
              />
            </View>
              <Text onPress={this.props.cancellSearch} style={{color:'white', marginVertical:5, marginHorizontal: 10}}>Cancel</Text>
            
          </View>
          <View style={styles.box3}>
            {this.showAutocomplete()}


          </View>
          
        </View>
        </View>

      )
    }

      
  

}

const styles = StyleSheet.create({

    container: {
      flex: 1,
      overflow:"hidden",
      position: 'absolute',
      backgroundColor: 'rgba(0, 51, 102, 1)',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
      top: '25%',
      left: '13.4%',
      width : 300,
      zIndex: 999,
    },
    veil:{
      position:'absolute',
      width: '100%',
      height: '100%',
      top: 0,
      left: 0,
      backgroundColor: 'rgba(37, 50, 56, 0.8)',
    },
    box1:{

    },
    box2:{
      // alignSelf:'stretch',
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      
      

    },
    box2_1:{
      backgroundColor: 'black',
      marginLeft: 15,
      flex: 1,
      flexDirection: 'row',
      marginBottom: 10,
      borderRadius: 10,
      height: 40,
      justifyContent : 'flex-start',
    },
    box3:{
      flex:1,
      flexDirection : 'column',
      justifyContent : 'flex-start',
     
    },
    input:{
      
      height: 40,
      color:'white', 
      //40px height to our input
      width:230,
      //100px width
      //  borderColor: 'black', 
      //color of our border
      //  borderWidth: 1,
      //width of our border
      

    },
    text:{
      color:'white',
      fontSize: 10,
    }

})


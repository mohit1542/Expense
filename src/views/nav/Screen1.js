import React, { useRef,useState, useEffect} from 'react'
import { Text,
    View,
    Image,
    FlatList,
    StyleSheet, 
    TouchableOpacity,
    DrawerLayoutAndroid,
    Button, StatusBar,
    ActivityIndicator,
    Alert,
    RefreshControl,
    BackHandler} from 'react-native'
import AnimatedLottieView from 'lottie-react-native';
import { StackActions, useNavigation } from '@react-navigation/native';
import { Card,Title } from 'react-native-paper';
import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons';
import { Avatar } from 'react-native-paper';
import { AntDesign } from '@expo/vector-icons';
import Parse, { Query } from "parse/react-native.js";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios"




const Screen1 =()=>{

    const [mydata, setMydata]=useState([]);
    const drawer = useRef(null);
    const [drawerPosition, setDrawerPosition] = useState("left");
    const [person,setPerson]=useState('')
    const [username, setUsername]=useState('')
    const [Loading, setLoading]=useState(false);
    const [refresh, setRefresh] = useState(false)



    // const getUserData =async()=>{
    //     const Expense = Parse.Object.extend('Expense');
    //     const query = new Parse.Query(Expense);
    //     query.equalTo('text', 'Hello')
    //     // You can also query by using a parameter of an object
    //     // query.equalTo('objectId', 'xKue915KBG');
    //     try {
    //       const results = await query.find()
    //       for (const object of results) {
    //         // Access the Parse Object attributes using the .GET method
    //         const category = object.get('category')
    //         // const date = object.get('date')
    //         // const amount = object.get('amount')
    //         // const text = object.get('text')
    //         // const note = object.get('note')
    //         setMydata('no change')
    //         console.log(category);
    //         // console.log(date);
    //         // console.log(amount);
    //         // console.log(text);
    //         // console.log(note);
    //       }
    //       return true
          
    //     } catch (error) {
    //       console.error('Error while fetching Expense', error);
    //     }
        
    //   }

      

    //   useEffect(()=>{
    //     getUserData();
    //     console.log(mydata)
    // },[])
    

    //const url="https://parseapi.back4app.com/classes/Expense"


    const fetchTransactions = async() => {
        try {
            await axios ({
               method:'get',
               url:'https://parseapi.back4app.com/classes/Expense',
               headers:{
                'X-Parse-Application-Id' :'PPeAzbb69YA9r151tP8oEa5308CSn2XNz5eweCXZ',
                'X-Parse-REST-API-Key': 'Z4eivtVtYlcvOKThJun2nX5fLrlwxJ0vtnNytExY',
                'content-type': 'application/json'
               }
            })
            .then((response)=>{
                var json=response.data.results
                setMydata([...json.reverse()])
                // setMydata([...json.reverse()])
                // console.log("response",JSON.stringify(response.data.objectId))
                // console.log("response",JSON.stringify(response.data.category))
            })
            .catch((error)=>{
                alert('error', error)
            })
            return true
        } catch (e) {
            Alert.alert("Error!", "Cannot load transactions! Please check your internet connection")
            return false
        }
        finally{
            setRefresh(false)
        }
    }

    useEffect(()=>{
        fetchTransactions();
        //console.log(mydata);
    },[])


    const onRefresh=()=>{
        setRefresh(true);
        fetchTransactions();
    }


    // const [list,setList]=useState([
    //     {name : mydata, id:'1', avatarUrl: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?"},
    //     {name : 'virat', id:'2',avatarUrl: "https://m.cricbuzz.com/a/img/v1/192x192/i1/c170661/virat-kohli.jpg"},
    //     {name : 'Mr. 360', id:'3', avatarUrl:"https://c.ndtvimg.com/2021-11/u756k9jg_ab-de-villiers_625x300_19_November_21.jpg"},
    //     {name : 'Saiee', id:'4',avatarUrl:'https://starsbiog.com/wp-content/uploads/2020/04/Saiee-Manjrekar.jpg'},
    //     {name : 'Ravi', id:'5'},
    //     {name : 'm6', id:'6'},
    //     {name : 'm7', id:'7'},
    //     {name : 'm8', id:'8'},
    //     {name : 'm9', id:'9'},
    //     {name : 'm10', id:'10'},
    // ])

    const doUserLogOut = async () => {
        setLoading(true)
        return await Parse.User.logOut()
        .then(async()=> {
            const currentUser=await Parse.User.currentAsync();
            if (currentUser===null){
                const rm=await AsyncStorage.removeItem("KeepUserLoggedIn")
                navigation.reset({
                    index: 0,
                    routes: [{name: 'AuthNavigator'}]
                })
                
                console.log('removed',rm)
                Alert.alert('Logout successfully')
                
                return true
                
            }

            
        })
        .catch((error)=>{
            Alert.alert('Error!',error.message)
            return false;
        })
        .finally(() => setLoading(false))
    }


    

    // fetch data
    //   const fetchPerson = async()=> {
    //     //create your Parse Query using the Person Class you've created
    //     let query = new Parse.Query('Expense');
    //     //run the query to retrieve all objects on Person class, optionally you can add your filters
    //     let queryResult = await query.find();
    //     //the resul is an arry of objects. Pick the first result 
    //     const currentPerson = queryResult[1];
    //     //access the Parse Object attributes
    //     console.log('person id: ', currentPerson.get('text'));
    //     console.log('person name: ', currentPerson.get('category'));
    //     console.log('person email: ', currentPerson.get('amount'));
        
        
        
    //   }

    //   useEffect(()=>{
    //     fetchPerson()
    //   },[])


    // fetch data by rest api

    // const getUserData =async()=>{
    //     try {
    //         const response=await fetch("https://parseapi.back4app.com/classes/Expense");
    //         const realData =response.json();
    //         setMydata(realData);
    //         console.log(realData)
    //     } catch (error) {
    //         console.log('check again ,not able to fetch')
    //     }
        
    // };

    // useEffect(()=>{
    //     getUserData()
    // },[])


    
    



    const navigationView = () => (
        <View style={{flexDirection:'column', flex:1}}>
            <View style={{flex:0.3, backgroundColor:'skyblue', borderBottomWidth:2, borderBottomColor:'violet'}}>
            <Avatar.Image  style={{marginLeft:20, marginTop:50}} size={45} source={{uri:'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?'}}/>
            <Text style={{marginLeft:25, fontSize:25, fontWeight:'bold'}}>Mohit</Text>
            <Text style={{marginLeft:25, fontSize:15,}}>mohit@gmail.com</Text>
            </View>

            <View style={{flex:1, backgroundColor:'grey'}}>
            <Text>this is other partition</Text>
        
          <Text style={styles.paragraph}>I'm in the Drawer!</Text>
          <Button
            title="Close drawer"
            onPress={() => drawer.current.closeDrawer()}
          />

        <TouchableOpacity style={{height: 40, width: '100%', alignItems: 'center', justifyContent: 'center'}}
            onPress={doUserLogOut}
        >
            {Loading ? <ActivityIndicator size={'small'} color='white' /> : <Text>Logout</Text>}
        </TouchableOpacity>
          </View>
          
        </View>
    );


    //set greeting time

        let AvatarShow;
        let timeofDay;
        const date=new Date();
        const hours=date.getHours();

        if (hours < 12) {
            timeofDay = 'Morning';
            AvatarShow= <Avatar.Image size={20} source={require('../../../assets/greetImage/morningSun.png')} />
            
          } else if (hours >= 12 && hours < 17) {
            timeofDay = 'Afternoon';
            AvatarShow= <Avatar.Image size={15} source={require('../../../assets/greetImage/morningSun.png')} />
            
            
          } else {
            timeofDay='Evening'
            AvatarShow= <Avatar.Image size={24} source={require('../../../assets/greetImage/eveningSun.png')} />      
          }


    

          

    // set greet name
      
    useEffect(() => {
        // Since the async method Parse.User.currentAsync is needed to
        // retrieve the current user data, you need to declare an async
        // function here and call it afterwards
        async function getCurrentUser() {
          // This condition ensures that username is updated only if needed
          if (username === '') {
            const currentUser = await Parse.User.currentAsync();
            if (currentUser !== null) {
              setUsername(currentUser.getUsername());
            }
          }
        }
        getCurrentUser();
      }, [username]);
    

    const navigation=useNavigation();


    // const storeData =async(value)=>{
    //     try {
    //         await AsyncStorage.setItem('ListItem','Statistics')
    //         navigation.navigate('Stats')
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    const itemseparate=()=>{
        return (
            <View style={styles.separate}></View>
        )
    }

    const headerComponent=()=>{
        return(
            <Text style={styles.ListHeadLine}>History</Text>
        )
    }
    
    return (
        <DrawerLayoutAndroid
        ref={drawer}
        drawerWidth={280}
        drawerPosition={drawerPosition}
        renderNavigationView={navigationView}>
        <View style={{flex:1, backgroundColor:'white'}}>
        {/* <ImageBackground style={styles.backimage} source={{uri:'https://i.pinimg.com/736x/04/34/89/043489e7922dabf9902965b964ca04a5.jpg'}}> */}


        <View style={{backgroundColor:'#f0e68c', height:380, borderBottomLeftRadius:40}}>

         <View style={{backgroundColor:'#afeeee', height:260, borderBottomLeftRadius:40}}>

           <View style={{marginTop:35, marginEnd:'88%'}}>
            <TouchableOpacity onPress={()=> drawer.current.openDrawer()}>
           <Ionicons name="reorder-three-outline" size={40} color="black" />
           </TouchableOpacity>
           </View>


            <View style={styles.greet}>
                <View style={{flex:0.6,flexWrap:'wrap', marginLeft:15}}>
                <Text style={{fontSize:18, color:'white'}}>Good {timeofDay} {AvatarShow} </Text>
                <Text style={{marginLeft:40,fontSize:30, fontWeight:'bold', color:'white'}}> {username} </Text>
                </View>
                <View style={{flex:0.1, flexWrap:'wrap', marginRight:15}}>
                <TouchableOpacity>
                    <Ionicons name="notifications" size={26} color="blue" />
                </TouchableOpacity>
                </View>
            </View>

            <TouchableOpacity style={{left:300, bottom:100}} onPress={doUserLogOut}>
            <AntDesign name="logout" size={24} color="black" />
            </TouchableOpacity>
            
            
            
        </View>
        </View>
        <View>
        <Card  style={{shadowColor:'black',shadowOffset:{width:1, height:2},shadowOpacity:0.50,shadowRadius:5,elevation:10,backgroundColor:'#7b68ee', height:175, width:325, margin:18,marginTop:-200,justifyContent:'center', borderRadius:15,}}>
            <Card.Content style={{justifyContent:'center', alignItems:'center'}}>

            <View style={{flexDirection:'row', marginTop:15}}>
                    <Image source={require('../../../assets/Images/chip1.png')} style={{width:50, height:50, marginLeft:-50}}/>
                    <Text style={{marginLeft:50, fontSize:20, fontWeight:'bold',color:'white'}}>Total Balance</Text>
                    <MaterialIcons name="arrow-drop-down" size={24} color="black" />
            </View>
            

            <View style={{flexDirection:'row'}}>
                <View style={{flexDirection:'row', marginTop:40}}>
                    <Entypo name="arrow-with-circle-down" size={24} color="white"/>
                    <Text style={{marginLeft:6, color:'white', fontWeight:'bold',fontSize:18}}>Income</Text>
                </View>
                <View style={{flexDirection:'row', marginTop:40,marginLeft:100}}>
                    <Entypo name="arrow-with-circle-up" size={24} color="white"/>
                    <Text style={{marginLeft:6, color:'white', fontSize:18, fontWeight:'bold'}}>Expense</Text>
                </View>  
            </View>
    
            
            </Card.Content>
        </Card>
        
        </View>

        <View style={{marginTop:10, flexDirection:'row',marginBottom:10, justifyContent:'space-between'}}>
            <View style={{flex:0.5 }}>
                <Text style={{fontSize:15, fontWeight:'bold', paddingLeft:'10%'}}>Transaction History</Text>
            </View>

            <View style={{flex:0.3,flexWrap:'wrap-reverse', marginRight:'5%'}}>
                <TouchableOpacity >
                    <Text style={{fontSize:15, fontWeight:'200'}}>see all</Text>
                </TouchableOpacity>
            </View>
        </View>
        

        <FlatList
        style={{marginBottom:-50}}
        ListHeaderComponentStyle={styles.listHeader}
        ListHeaderComponent={headerComponent}
        numColumns={1}
        ItemSeparatorComponent={itemseparate}
        refreshing={refresh}
        onRefresh={onRefresh}
        keyExtractor={(item) => item.objectId}
        data={mydata}
        renderItem={({item}) => (
            <View style={styles.items}>
                {/* <Avatar.Image size={45} marginLeft={-5} source={{uri:item.avatarUrl}}/> */}
                <View style={{ flex:0.5}}>
                <Text style={styles.flatText1}> {item.category} </Text>
                </View>
                <View style={{flex:0.5}}>
                <Text style={styles.flatText2}> {item.amount} </Text>
                </View>
            </View>
        )}/>

        <View style={{flex: 1, paddingTop: StatusBar.currentHeight, paddingHorizontal: 10}}>
            <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate('Screen2')}>
                <AntDesign name="plus" size={26} color="white" />
            </TouchableOpacity>
        </View>
        
      </View>

    
      </DrawerLayoutAndroid>
    )
}



const styles=StyleSheet.create({
    greet:{
        //marginLeft:20,
        flexDirection:'row',
        flex:1,
        flexWrap:'wrap',
        justifyContent:'space-between'
        
    },
    backimage:{
        width:'100%',
        borderWidth:0.5,
        borderBottomLeftRadius:30,
        borderBottomRightRadius:30,
        overflow:'hidden',
    },
    ListHeadLine:{
        color:'black',
        fontWeight:'500',
        fontSize:15,
        marginLeft:-260
    },
    separate:{
        height:0.5,
        width:'90%',
        marginLeft:20,
        
    },
    listHeader:{
        height:35,
        alignItems:'center',
        justifyContent:'center',
    },
    items:{
        flexDirection:'row',
        flex:1,
        marginLeft:10,
        marginRight:10,
        padding:12,
        borderRadius:5,
        borderBottomWidth:1,
        borderColor:'#dcdcdc',
        backgroundColor:'white',
        marginTop:0,
    },
    flatText1:{
        marginLeft:'8%',
        marginTop:8,
        fontSize:18,
    },
    flatText2:{
        fontSize:18,
        marginTop:8,
        left:'45%',
        color:'green',
    },
    paragraph:{
        marginTop:200,

    },
    fab: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 63,
        height: 63, 
        position: 'absolute',
        bottom: 10,
        right: 28,
        backgroundColor:'purple',
        borderRadius: 100,
        shadowColor: '#000000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 1,
        shadowRadius: 4,
        elevation: 4,
    }
    
})


export default Screen1

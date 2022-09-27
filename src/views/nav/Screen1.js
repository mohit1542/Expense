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
import { StackActions, useIsFocused, useNavigation } from '@react-navigation/native';
import { Card,ProgressBar,Title } from 'react-native-paper';
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
    const [username, setUsername]=useState('')
    const [Loading, setLoading]=useState(false);
    const [refresh, setRefresh] = useState(false)
    const [transactions, setTransactions] = useState([])
    const [balance, setBalance] = useState()
    const [profit, setProfit] = useState()
    const [expense, setExpense] = useState()
    const [personData, setPersonData]=useState([]);
    const [balanceloading, setBalanceLoading]=useState(false)
    const focussed =useIsFocused()


    const fetchTransactions = async() => {
        try {
            setBalanceLoading(true)
            await axios ({
               method:'GET',
               url:`https://parseapi.back4app.com/classes/Expense`,
               headers:{
                'X-Parse-Application-Id' :'PPeAzbb69YA9r151tP8oEa5308CSn2XNz5eweCXZ',
                'X-Parse-REST-API-Key': 'Z4eivtVtYlcvOKThJun2nX5fLrlwxJ0vtnNytExY',
                'content-type': 'application/json'
               }
            })
            .then((response)=>{
                let json= response.data.results
                //console.log(response.data.results[1].category)
                //setMydata([...json.reverse()])
                let filteredJSON= json.reverse().filter((val, i)=>{
                    if(val.username == username){
                    return val
                    }
                    })
                    setMydata(filteredJSON)
                    calculateBalance(filteredJSON)
                    TotalPositive(filteredJSON)
                    totalNegative(filteredJSON)
                    // console.log(balance)
                    // console.log(profit)
                    // console.log(expense) 
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
            setBalanceLoading(false)
        }
    }

    const onRefresh=()=>{
        setRefresh(true);
        fetchTransactions();
    }

    useEffect(()=>{
        focussed && fetchTransactions();
        console.log(mydata);
    },[focussed])

    

    const calculateBalance=(mydata)=>{
        var balance=0
        if(mydata !== null){
            mydata.map(it=>{
                if( it.category=="allowance" || it.category=="comission"
                || it.category=="gifts" || it.category=="interests"
                || it.category=="investments" || it.category=="salary"
                || it.category=="selling" || it.category=="misc-income"){
                balance=balance + Number(it.amount)}

                else{balance=balance - Number(it.amount)}
                //console.log(balance)
            })
            
            setBalance(balance.toString())
        }
        return true
    }


    const TotalPositive=(mydata)=>{
        var pos=0
        if(mydata != null){
            mydata.map(it=>{
                if(it.amount>=0 && it.category=="allowance" || it.category=="comission"
                || it.category=="gifts" || it.category=="interests"
                || it.category=="investments" || it.category=="salary"
                || it.category=="selling" || it.category=="misc-income"){
                    pos =pos+Number(it.amount);
                }
            })
            setProfit(pos.toString())
        }
    }

    const totalNegative = (mydata) => {
        var neg = 0;
        if(mydata != null) {
            mydata.map(it => {
                if(it.category=="food" || it.category=="bills" 
                || it.category=="clothing" || it.category=="entertainment"
                || it.category=="purchases" || it.category=="subscriptions" 
                || it.category=="transportation" || it.category=="misc-expense") {
                    neg = neg - Number(it.amount);
                }
            })
            setExpense(neg.toString())
        }
    }


            
        const deleteAlert=(objectId)=>{
            Alert.alert("Are you sure", "Do you want to delete this transaction?",
            [
                {
                text:'Cancel',
                onPress:()=>console.log("Cancel"),
                style:'cancel',   // this is for ios
                },
                {
                text:'Yes',
                onPress:async() => 
                        {
                            //deleteTransaction
                            //console.log(objectId)
                            await axios({
                                method:'DELETE',
                                url:`https://parseapi.back4app.com/classes/Expense/${objectId}`,
                                headers:{
                                    'X-Parse-Application-Id' :'PPeAzbb69YA9r151tP8oEa5308CSn2XNz5eweCXZ',
                                    'X-Parse-REST-API-Key': 'Z4eivtVtYlcvOKThJun2nX5fLrlwxJ0vtnNytExY',
                                    'content-type': 'application/json'
                                   }
                            })
                            .then(()=>{
                                //below things is not neccessory to write
                                let filteredJSON=mydata.filter((val, i)=>{
                                    if(val.objectId !==objectId){
                                    return val
                                    }
                                    })
                                    //console.log(filteredJSON)
                                    setMydata(filteredJSON)
                            })
                            
                        }
                }
            ]
            )
    }



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


    //set greeting time

        let AvatarShow;
        let timeofDay;
        const date=new Date();
        const hours=date.getHours();

        if (hours < 12) {
            timeofDay = 'Morning';
            AvatarShow= <Avatar.Image style={{backgroundColor:'yellow'}} size={20} source={require('../../../assets/greetImage/morningSun.png')} />
            
          } else if (hours >= 12 && hours < 17) {
            timeofDay = 'Afternoon';
            AvatarShow= <Avatar.Image style={{backgroundColor:'orange'}} size={15} source={require('../../../assets/greetImage/morningSun.png')} />
            
            
          } else {
            timeofDay='Evening'
            AvatarShow= <Avatar.Image style={{backgroundColor:'grey'}} size={24} source={require('../../../assets/greetImage/eveningSun.png')} />      
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
        
        <View style={{flex:1, backgroundColor:'white'}}>

            <View style={{backgroundColor:'#f0e68c', height:380, borderBottomLeftRadius:40}}>

                <View style={{backgroundColor:'#afeeee', height:260, borderBottomLeftRadius:40}}>


                    <View style={styles.greet}>
                        <View style={{flex:0.6,flexWrap:'wrap', marginLeft:15}}>
                            <Text style={{fontSize:18, color:'white'}}>Good {timeofDay} {AvatarShow} </Text>
                            <Text style={{marginLeft:40,fontSize:30, fontWeight:'bold', color:'white'}}> {username} </Text>
                        </View>

                        <View style={{flex:0.08,right:'5%',}}>
                        <TouchableOpacity >
                            <Ionicons name="notifications" size={28} color="blue" />
                        </TouchableOpacity>
                        </View>

                    </View>

                    <View style={{ bottom:'38%', left:'85%', width:'8%'}}>
                    <TouchableOpacity  onPress={doUserLogOut}>
                        <AntDesign name="logout" size={24} color="black" />
                    </TouchableOpacity>
                    </View>
            
                </View>
            </View>
        
        <Card style={{shadowColor:'black',shadowOffset:{width:1, height:2},shadowOpacity:0.50,shadowRadius:5,elevation:10,backgroundColor:'#7b68ee', height:175, width:325, margin:18,marginTop:-200,justifyContent:'center', borderRadius:15,}}>
            {balanceloading ? <ProgressBar indeterminate color='coral' /> : (
            <Card.Content>
            
                    <View style={{ height:'45%'}}>
                        <View style={{flexDirection:'row'}}>
                            <Image source={require('../../../assets/Images/chip1.png')} style={{width:50, height:50}}/>
                            <Text style={{left:'50%', fontSize:20,color:'white'}}>Total Balance</Text>
                            <MaterialIcons style={{left:'45%'}} name="arrow-drop-down" size={28} color="black" />
                        </View>
                        <View style={{left:'42%'}}>
                            <Text style={{fontSize:20, fontWeight:'bold',color:'white', bottom:'70%'}}>{balance}</Text>
                        </View>
                    </View>
            

                    <View style={{flexDirection:'row', marginTop:'2%',height:'50%'}}>
                        <View style={{flex:0.5,flexDirection:'row', marginTop:'5%', flexWrap:'wrap'}}>
                            <Entypo name="arrow-with-circle-down" size={24} color="white"/>
                            <View style={{flexDirection:'column', marginLeft:'2%'}}>
                                <Text style={{marginLeft:'5%', color:'white',fontSize:18}}>Income</Text>
                                <Text style={{left:'25%', color:'white', fontWeight:'bold',fontSize:18}}>{profit}</Text>
                            </View>
                        </View>

                        <View style={{flex:0.5,flexDirection:'row', marginTop:'5%', flexWrap:'wrap'}}>
                            <Entypo name="arrow-with-circle-up" size={24} color="white"/>
                            <View style={{flexDirection:'column', marginLeft:'2%'}}>
                                <Text style={{marginLeft:'5%', color:'white', fontSize:18}}>Expense</Text>
                                <Text style={{left:'25%', color:'white', fontSize:18, fontWeight:'bold'}}>{expense}</Text>
                            </View>
                        </View>
                        
                          
                    </View>
            
            
            </Card.Content>
            )}
        </Card>
        


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
            
            <TouchableOpacity
            onLongPress={()=>{deleteAlert(item.objectId)}}
            >
            <View style={styles.items}>
                <View style={{flex:0.13}}>
                    {
                    item.category=="salary"?
                    (
                        <Avatar.Image style={{ backgroundColor:'white'}} size={38}  source={require('../../../assets/pickerImage/selling.png')}/>
                    ) : item.category=="selling" ? (
                        <Avatar.Image style={{ backgroundColor:'white'}} size={38}  source={require('../../../assets/pickerImage/selling.png')}/>
                    ): item.category=="allowance"?(
                        <Avatar.Image style={{ backgroundColor:'white'}} size={38}  source={require('../../../assets/pickerImage/selling.png')}/>
                    ): item.category=="comission"?(
                        <Avatar.Image style={{ backgroundColor:'white'}} size={38}  source={require('../../../assets/pickerImage/selling.png')}/>
                    ): item.category=="gifts"?(
                        <Avatar.Image style={{ backgroundColor:'white'}} size={38}  source={require('../../../assets/pickerImage/selling.png')}/>
                    ): item.category=="interests"?(
                        <Avatar.Image style={{ backgroundColor:'white'}} size={38}  source={require('../../../assets/pickerImage/interests.png')}/>
                    ): item.category=="investments"?(
                        <Avatar.Image style={{ backgroundColor:'white'}} size={38}  source={require('../../../assets/pickerImage/selling.png')}/>
                    ): item.category=="misc-income"?(
                        <Avatar.Image style={{ backgroundColor:'white'}} size={38}  source={require('../../../assets/pickerImage/miscellaneous.png')}/>
                    ): item.category=="bills"?(
                        <Avatar.Image style={{ backgroundColor:'white'}} size={38}  source={require('../../../assets/pickerImage/bill.png')}/>
                    ): item.category=="clothing"?(
                        <Avatar.Image style={{ backgroundColor:'white'}} size={38}  source={require('../../../assets/pickerImage/clothing.png')}/>
                    ): item.category=="entertainment"?(
                        <Avatar.Image style={{ backgroundColor:'white'}} size={38}  source={require('../../../assets/pickerImage/entertainment.png')}/>
                    ): item.category=="food"?(
                        <Avatar.Image style={{ backgroundColor:'white'}} size={38}  source={require('../../../assets/pickerImage/food.png')}/>
                    ): item.category=="purchases"?(
                        <Avatar.Image style={{ backgroundColor:'white'}} size={38}  source={require('../../../assets/pickerImage/purchases.png')}/>
                    ): item.category=="subscriptions"?(
                        <Avatar.Image style={{ backgroundColor:'white'}} size={38}  source={require('../../../assets/pickerImage/subscribe.png')}/>
                    ): item.category=="transportation"?(
                        <Avatar.Image style={{ backgroundColor:'white'}} size={38}  source={require('../../../assets/pickerImage/transportation.png')}/>
                    ): item.category=="misc-expense"?(
                        <Avatar.Image style={{ backgroundColor:'white'}} size={38}  source={require('../../../assets/pickerImage/miscellaneous.png')}/>
                    ):null}
                    
                </View>


                <View style={{ flex:0.45, }}>
                    <Text style={styles.flatText1}> {item.category} </Text>
                </View>

                <View style={{flex:0.35}}>
                    {
                    item.category=="salary"?
                    (
                        <Text style={styles.flatText2}> +{item.amount} </Text>
                    ) : item.category=="selling" ? (
                        <Text style={styles.flatText2}> +{item.amount} </Text>
                    ): item.category=="allowance"?(
                        <Text style={styles.flatText2}> +{item.amount} </Text>
                    ): item.category=="comission"?(
                        <Text style={styles.flatText2}> +{item.amount} </Text>
                    ): item.category=="gifts"?(
                        <Text style={styles.flatText2}> +{item.amount} </Text>
                    ): item.category=="interests"?(
                        <Text style={styles.flatText2}> +{item.amount} </Text>
                    ): item.category=="investments"?(
                        <Text style={styles.flatText2}> +{item.amount} </Text>
                    ): item.category=="misc-income"?(
                        <Text style={styles.flatText2}> +{item.amount} </Text>
                    ): item.category=="bills"?(
                        <Text style={styles.flatText3}> -{item.amount} </Text>
                    ): item.category=="clothing"?(
                        <Text style={styles.flatText3}> -{item.amount} </Text>
                    ): item.category=="entertainment"?(
                        <Text style={styles.flatText3}> -{item.amount} </Text>
                    ): item.category=="food"?(
                        <Text style={styles.flatText3}> -{item.amount} </Text>
                    ): item.category=="purchases"?(
                        <Text style={styles.flatText3}> -{item.amount} </Text>
                    ): item.category=="subscriptions"?(
                        <Text style={styles.flatText3}> -{item.amount} </Text>
                    ): item.category=="transportation"?(
                        <Text style={styles.flatText3}> -{item.amount} </Text>
                    ): item.category=="misc-expense"?(
                        <Text style={styles.flatText3}> -{item.amount} </Text>
                    ):null}
                    
                </View>
            </View>
            </TouchableOpacity>
        )}/>

        <View style={{flex: 1, paddingTop: StatusBar.currentHeight, paddingHorizontal: 10}}>
            <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate('Screen2')}>
                <AntDesign name="plus" size={24} color="white" />
            </TouchableOpacity>
        </View>
        
      </View>

    )
}



const styles=StyleSheet.create({
    greet:{
        //marginLeft:20,
        flexDirection:'row',
        flex:1,
        flexWrap:'wrap',
        justifyContent:'space-between',
        top:'20%'
        
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
        left:'8%',
        width:'20%'
    },
    separate:{
        height:5,
        width:'90%',
        marginLeft:20,
        
    },
    listHeader:{
        height:35,
        justifyContent:'center'
    },
    items:{
        flexDirection:'row',
        flex:1,
        marginHorizontal:'2%',
        padding:12,
        borderRadius:10,
        borderBottomWidth:1,
        borderBottomColor:'grey',
        justifyContent:'space-between',
        width:'96%'
    },
    flatText1:{
        marginLeft:'2%',
        marginTop:8,
        fontSize:18,
    },
    flatText2:{
        fontSize:18,
        marginTop:8,
        marginLeft:'15%',
        color:'green',
        fontWeight:'bold'
    },
    flatText3:{
        fontSize:18,
        marginTop:8,
        marginLeft:'15%',
        color:'red',
        fontWeight:'bold'
    },
    paragraph:{
        marginTop:200,

    },
    fab: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 55,
        height: 55, 
        position: 'absolute',
        bottom: 10,
        right: 30,
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

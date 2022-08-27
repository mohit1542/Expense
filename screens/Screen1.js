import React, { useRef,useState} from 'react'
import { Text,
    View,
    Image, 
    FlatList,
    StyleSheet, 
    TouchableOpacity,
    DrawerLayoutAndroid,
    Button, StatusBar, 
    ActivityIndicator,} from 'react-native'
import AnimatedLottieView from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';
import { Card,Title } from 'react-native-paper';
import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons';
import { Avatar } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AntDesign } from '@expo/vector-icons';



const Screen1 =()=>{
    
    const [list,setList]=useState([
        {name : 'mohit', id:'1', avatarUrl: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?"},
        {name : 'virat', id:'2',avatarUrl: "https://m.cricbuzz.com/a/img/v1/192x192/i1/c170661/virat-kohli.jpg"},
        {name : 'Mr. 360', id:'3', avatarUrl:"https://c.ndtvimg.com/2021-11/u756k9jg_ab-de-villiers_625x300_19_November_21.jpg"},
        {name : 'Saiee', id:'4',avatarUrl:'https://starsbiog.com/wp-content/uploads/2020/04/Saiee-Manjrekar.jpg'},
        {name : 'Ravi', id:'5'},
        {name : 'm6', id:'6'},
        {name : 'm7', id:'7'},
        {name : 'm8', id:'8'},
        {name : 'm9', id:'9'},
        {name : 'm10', id:'10'},
    ])

    const drawer = useRef(null);
    const [drawerPosition, setDrawerPosition] = useState("left");

    

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
          </View>
          
        </View>
    );


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

           <View style={{marginTop:35}}>
            <TouchableOpacity onPress={()=> drawer.current.openDrawer()}>
           <Ionicons name="reorder-three-outline" size={40} color="black" />
           </TouchableOpacity>
           </View>


            <View style={styles.greet}>
                <Text style={{fontSize:18, color:'white'}}>Good afternoon,</Text>
                <TouchableOpacity>
                    <Ionicons style={{marginLeft:165}} name="notifications" size={26} color="blue" />
                </TouchableOpacity>
            </View>
            <Text style={{marginLeft:40,fontSize:30, fontWeight:'bold', color:'white'}}>Mohit</Text>
            
        </View>
        </View>
        <View>
        <Card  style={{shadowColor:'black',shadowOffset:{width:1, height:2},shadowOpacity:0.50,shadowRadius:5,elevation:10,backgroundColor:'#7b68ee', height:175, width:325, margin:18,marginTop:-200,justifyContent:'center', borderRadius:15,}}>
            <Card.Content style={{justifyContent:'center', alignItems:'center'}}>

            <View style={{flexDirection:'row', marginTop:15}}>
                    <Image source={require('../assets/Images/chip1.png')} style={{width:50, height:50, marginLeft:-50}}/>
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
                    <Text style={{marginLeft:6, color:'white', fontSize:18, fontWeight:'bold'}}>Expences</Text>
                </View>  
            </View>
    
            
            </Card.Content>
        </Card>
        
        </View>

        <View style={{marginTop:10, marginLeft:10, flexDirection:'row',marginBottom:10}}>
        <Text style={{fontSize:15, fontWeight:'bold',}}>Transaction History</Text>
        <TouchableOpacity >
        <Text style={{fontSize:15, fontWeight:'200',marginLeft:150}}>see all</Text>
        </TouchableOpacity>
        </View>
        

        <FlatList
        style={{marginBottom:-50}}
        ListHeaderComponentStyle={styles.listHeader}
        ListHeaderComponent={headerComponent}
        numColumns={1}
        ItemSeparatorComponent={itemseparate}
        keyExtractor={(item) => item.id}
        data={list}
        renderItem={({item}) => (
            <View style={styles.items}>
                <Avatar.Image size={45} marginLeft={-5} source={{uri:item.avatarUrl}}/>
                <Text style={styles.flatText}> {item.name}</Text>
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
        marginLeft:20,
        flexDirection:'row',
        
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
    flatText:{
        marginLeft:70,
        marginTop:8,
        fontSize:18,
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

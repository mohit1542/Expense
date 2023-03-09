import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Button,KeyboardAvoidingView, Platform, TouchableWithoutFeedback , ScrollView, Keyboard, Alert} from "react-native";
import { Card,TextInput ,List, Avatar} from "react-native-paper";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { Picker } from "@react-native-picker/picker";
import { MaterialIcons } from '@expo/vector-icons';
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import Parse from "parse/react-native.js";
import { StatusBar } from "expo-status-bar";


const Screen2 = () => {

    const [text,setText]=useState('')
    const [category,setCategory]=useState('')
    const [amount,setAmount]=useState('')
    const [note,setNote]=useState('')
    const [date,setDate]=useState(new Date(1598051730000))
    const [pick, setPick]=useState('')
    const [button, SetButton]=useState('')
    const [textInputName, setTextInputName] = useState('');
    const [username, setUsername]= useState('')


    //get current user
    const getCurrentUser = async()=> {
        const currentUser = await Parse.User.currentAsync();
        if (currentUser !== null) {
            setUsername(currentUser.getUsername())
        }
        return currentUser;
      };
      useEffect(()=>{
        getCurrentUser()
      },[username])


    const addExpense= async() =>{
        //Checking empty textinput
        if (!text.trim()) {
          alert('Please Enter Title');
          return;
        }else if (!category) {
            alert('Please select category');
            return;
          }
        else{
            try {
                //generate random id
                let s4 = () => {
                    return Math.floor((1 + Math.random()) * 0x10000)
                        .toString(16)
                        .substring(1);
                  }

                const ExpenseAdd =new Parse.Object('Expense');
                ExpenseAdd.set('text', text);
                ExpenseAdd.set('category', category);
                ExpenseAdd.set('numAmount', Number(amount));
                ExpenseAdd.set('note', note);
                ExpenseAdd.set('date', date);
                ExpenseAdd.set('username', username);
                ExpenseAdd.set('objectid', username+text+s4())
                await ExpenseAdd.save();

                //Checked Successfully
                //Do whatever you want
                alert('done! Your data is Added successfully');
              } catch (error) {
                console.log('something wrong')
              }
          }
    }

    // const onChange = (event, selectedDate) => {
    //     const currentDate = selectedDate;
    //     setDate(currentDate);
    // };
    
    //   const showMode = (currentMode) => {
    //     DateTimePickerAndroid.open({
    //       value: date,
    //       onChange,
    //       mode: currentMode,
    //       is24Hour: true,
    //     });
    // };
    
    //   const showDatepicker = () => {
    //     showMode('date')   
    // };


    const getCurrentDate=()=>{
 
        var date = new Date().getDate();
        var month = new Date().getMonth() + 1;
        var year = new Date().getFullYear();
        var hours = new Date().getHours();
        var min = new Date().getMinutes();
        var sec = new Date().getSeconds()

        var final=date + '/' + month + '/' + year + ' ' + hours + ':' + min + ':' + sec;
        //Alert.alert(date + '-' + month + '-' + year);
        // You can turn it in to your desired format
        setDate(final);
   }

   const message=()=>{
       alert('done!')
   }

   const navigation=useNavigation()


    return (
        <View style={{flex:1}}>

            <View style={{flex:0.1, flexDirection:'row',justifyContent:'center', alignItems:'flex-end'}}>
                    
                    <View style={{flex:0.08}}>
                            <TouchableOpacity onPress={()=>navigation.navigate('Screen1')}>
                                <Ionicons  name="arrow-back-sharp" size={24} color="black" />
                            </TouchableOpacity>
                    </View>


                    <View style={{flex:0.7, alignItems:'center'}}>
                            <Text style={{fontSize:18, fontWeight:'bold'}}>Add Expense</Text>
                    </View>
            </View>
      

            <View style={{flex:0.9,alignItems:'center'}}>
                
                <Card style={styles.card}>
                    <View style={{alignItems:'center'}} >
                        <TextInput style={styles.text1}
                            label={'Title'}
                            value={text}
                            onChangeText={text=>setText(text)}
                            mode={"outlined"}
                            selectionColor={'skyblue'}
                            activeOutlineColor={'grey'}
                            //placeholder="label"
                            //placeholderTextColor={'red'}
                            //activeUnderlineColor={'red'}
                            maxLength={50}
                            
                        />

                        <View style={{width:'90%', borderWidth:1, marginTop:20, borderColor:'grey'}}>
                            <Picker style={styles.picker1}
                                mode={'dropdown'}
                                selectedValue={pick}
                                onValueChange={(value)=>setPick(value)}
                                dropdownIconColor={'grey'}
                            >
                                <Picker.Item label="Select" value={'select'} style={{color:'grey'}}/>
                                <Picker.Item label="Expense" value={'expense'} style={styles.pickerItem}/>
                                <Picker.Item label="Income" value={'income'} style={styles.pickerItem}/>
                        
                            </Picker>

                            {pick == "income" ? (
                            <Picker
                                style={styles.picker1}
                                mode="dropdown"
                                dropdownIconColor={Colors.DARK_GRAY}
                                selectedValue={category}
                                onValueChange={(val) => setCategory(val)}
                            >
                                <Picker.Item label="Select Income Category" value="category" style={{backgroundColor: Colors.DARK, color: Colors.DARK_GRAY}}/>
                                <Picker.Item label="Allowance" value="allowance" style={styles.pickerItem}/>
                                <Picker.Item label="Commission" value="comission" style={styles.pickerItem}/>
                                <Picker.Item label="Gifts" value="gifts" style={styles.pickerItem}/>
                                <Picker.Item label="Interests" value="interests" style={styles.pickerItem}/>
                                <Picker.Item label="Investments" value="investments" style={styles.pickerItem}/>
                                <Picker.Item label="Salary" value="salary" style={styles.pickerItem}/>
                                <Picker.Item label="Selling" value="selling" style={styles.pickerItem}/>
                                <Picker.Item label="Miscellaneous" value="misc-income" style={styles.pickerItem}/>
                            </Picker>

                            ) : pick=="expense" ?(

                            <Picker
                                style={styles.picker1}
                                mode="dropdown"
                                dropdownIconColor={Colors.DARK_GRAY}
                                selectedValue={category}
                                onValueChange={(val) => setCategory(val)}
                            >
                                <Picker.Item label="Select Expense Category" value="category" style={{backgroundColor: Colors.DARK, color: Colors.DARK_GRAY}}/>
                                <Picker.Item label="Bills" value="bills" style={styles.pickerItem} />
                                <Picker.Item label="Clothing" value="clothing" style={styles.pickerItem}/>
                                <Picker.Item label="Entertainment" value="entertainment" style={styles.pickerItem}/>
                                <Picker.Item label="Food and Drinks" value="food" style={styles.pickerItem}/>
                                <Picker.Item label="Purchases" value="purchases" style={styles.pickerItem}/>
                                <Picker.Item label="Subscriptions" value="subscriptions" style={styles.pickerItem}/>
                                <Picker.Item label="Transportation" value="transportation" style={styles.pickerItem}/>
                                <Picker.Item label="Miscellaneous" value="misc-expense" style={styles.pickerItem}/>
                            </Picker>
                            ):null}


                        </View>

                        
                        <TextInput style={styles.text1}
                            label={'Amount'}
                            value={amount}
                            onChangeText={text=>setAmount(text)}
                            mode={"outlined"}
                            selectionColor={'skyblue'}
                            activeOutlineColor={'grey'}
                            left={<TextInput.Icon icon='currency-rupee'/>}
                            right={<TextInput.Icon icon='backspace' onPress={() => setAmount('')}/>}
                            keyboardType={'numeric'}
                            maxLength={10}
                        />
                        
                    

                        <TextInput style={styles.text1}
                            label={'Date'}
                            value={date}
                            onChangeText={date=>setDate(date)}
                            mode={"outlined"}
                            selectionColor={'skyblue'}
                            activeOutlineColor={'grey'}
                            keyboardType={'numeric'}
                            right={<TextInput.Icon icon='calendar' onPress={getCurrentDate}/>}
                            //editable={false}
                        />

                        <TextInput style={styles.text1}
                            label={'Note'}
                            placeholder={'Note (Optional)'}
                            value={note}
                            onChangeText={text=>setNote(text)}
                            mode={"outlined"}
                            selectionColor={'skyblue'}
                            activeOutlineColor={'grey'}
                            left={<TextInput.Icon icon='note'/>}
                            maxLength={80}
                        />

                    </View>
                
                </Card>
                

    
                    <View style={{width:'50%',marginTop:15}}>
                        <Button
                            title="Add"
                            value={button}
                            onPress= {()=>{
                                addExpense();
                            }} 
                        />
                    </View>

            </View>
        
        </View>

        
    )
}



const styles=StyleSheet.create({
    text1:{
        marginTop:20,
        width:'90%',
        paddingHorizontal:8,
        paddingBottom:8,
        backgroundColor:'white',
    },
    picker1:{
        width:'90%',
        borderWidth:2,
        backgroundColor:'white',
        marginLeft:15
    },
    card:{
        height:500, 
        width:'85%', 
        backgroundColor:'white', 
        borderRadius:15, 
        borderWidth:2, 
        borderColor:'grey', 
        shadowColor:'grey', 
        shadowOffset:{width:0, height:2}, 
        shadowOpacity:0.75, 
        shadowRadius:8, 
        elevation:5,
        marginTop:'8%'
    }
})


export default Screen2



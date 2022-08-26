import React, { useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Button,KeyboardAvoidingView, Platform, TouchableWithoutFeedback , ScrollView, Keyboard} from "react-native";
import { Card,TextInput ,List} from "react-native-paper";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { Picker } from "@react-native-picker/picker";
import { MaterialIcons } from '@expo/vector-icons';
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { Ionicons } from '@expo/vector-icons';


const Screen2 = () => {

    const [text,setText]=useState('')
    const [category,setCategory]=useState('')
    const [amount,setAmount]=useState('')
    const [note,setNote]=useState('')
    const [date,setDate]=useState(new Date(1598051730000))
    const [pick, setPick]=useState('')
    const [button, SetButton]=useState('')
    const [textInputName, setTextInputName] = useState('');


    const checkTextInput = () => {
        //Check for the Title TextInput
        if (!text.trim()) {
          alert('Please Enter Title');
          return;
        }
        //Check for the date TextInput
        if (!date.trim()) {
          alert('Please Enter Date');
          return;
        }
        if (!amount.trim()) {
            alert('Please Enter Date');
            return;
          }
        //Checked Successfully
        //Do whatever you want
        alert('done! Your data is Added successfully');
      };



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


    return (
        <View style={{flex:1}}>
            <View style={{backgroundColor:'#ffa500', height:250, borderBottomRightRadius:50, borderBottomLeftRadius:50, alignItems:'center',justifyContent:'center'}}>
                <View style={{flexDirection:'row-reverse',marginBottom:90}}>
                <Text style={{marginRight:100,fontSize:18, fontWeight:'bold'}}>Add Expense</Text>
                <Ionicons style={{marginRight:80}} name="arrow-back-sharp" size={24} color="black" />
                </View>
            </View>

            <View style={{alignItems:'center', marginTop:-100}}>
                <Card style={{height:450, width:'85%', backgroundColor:'white', borderRadius:15, borderWidth:2, borderColor:'grey', shadowColor:'grey', shadowOffset:{width:0, height:2}, shadowOpacity:0.75, shadowRadius:8, elevation:5}}>
                    <View style={{alignItems:'center'}}>
                        <TextInput style={styles.text1}
                            label={'Title'}
                            placeholder={'TItle'}
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
                        >
                        <Picker.Item label="amazon" value={'category'}/>
                        <Picker.Item label="flipkart" value={'flipkart'}/>
                        <Picker.Item label="myntra" value={'myntra'}/>
                        <Picker.Item label="fb" value={'fb'}/>
                        <Picker.Item label="pahrmeasy" value={'pharmeasy'}/>
                        <Picker.Item label="whatsapp" value={'whatsapp'}/>
                        <Picker.Item label="insta" value={'insta'}/>
                        
                    </Picker>
                    </View>

                        
                        <TextInput style={styles.text1}
                            label={'Amount'}
                            value={amount}
                            onChangeText={text=>setAmount(text)}
                            mode={"outlined"}
                            selectionColor={'skyblue'}
                            activeOutlineColor={'grey'}
                            left={<TextInput.Icon icon='currency-rupee'/>}
                            right={<TextInput.Icon icon='backspace' onPress={() => setAmount("")}/>}
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
            </View>

            <View style={{width:'50%',marginTop:15, marginLeft:90}}>
            <Button
            title="Add"
            value={button}
            onPress={checkTextInput}/>
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
    }
})


export default Screen2


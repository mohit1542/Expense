import React, { useRef,useState, useEffect} from 'react'
import { Text,
    View,
    StyleSheet, 
    Button,
    ActivityIndicator,
    Alert,
    ToastAndroid,} from 'react-native'
import { Card,ProgressBar,Title,TextInput } from 'react-native-paper';
import axios from "axios"
import { Picker } from "@react-native-picker/picker";
import Colors from '../../constants/Colors';

const UpdateTransactionsView = ({route})=> {

  const {objectId, myUpdatedata} = route.params;

    const [textUpdate,setTextUpdate]=useState('')
    const [categoryUpdate,setCategoryUpdate]=useState('')
    const [amountUpdate,setAmountUpdate]=useState('')
    const [noteUpdate,setNoteUpdate]=useState('')
    const [dateUpdate,setDateUpdate]=useState(new Date(1598051730000))
    const [button, SetButton]=useState('')
    const [mydata, setMydata]=useState([]);
    const [pick, setPick]=useState('')


  const UpadateTransaction =async(objectId)=>{

    if (textUpdate.trim()=="") {
          alert('Please Enter Title');
          return
    }
    else if (amountUpdate.trim()=="") {
          alert('Please Enter Amount');
          return;
    }
    else if (categoryUpdate=="") {
          alert('Please select category');
          return;
    }
    else{
        try {
        //console.log(objectId)
        await axios ({
           method:'PUT',
           url:`https://parseapi.back4app.com/classes/Expense/${objectId}`,
           headers:{
            'X-Parse-Application-Id' :'PPeAzbb69YA9r151tP8oEa5308CSn2XNz5eweCXZ',
            'X-Parse-REST-API-Key': 'Z4eivtVtYlcvOKThJun2nX5fLrlwxJ0vtnNytExY',
            'content-type': 'application/json'
           },
           data:{
            amount:amountUpdate,
            text:textUpdate,
            date:dateUpdate,
            note:noteUpdate,
            category:categoryUpdate
           }
        })
        .then(()=>{
          //below things is not neccessory to write
          let filteredJSON=myUpdatedata.filter((val, i)=>{
              if(val.objectId ==objectId){
              return val
              }
              })

              setMydata(filteredJSON)
              //console.log(filteredJSON)

                ToastAndroid.showWithGravity(
                  "Your Expense is Updated!",
                  ToastAndroid.SHORT,
                  ToastAndroid.CENTER
                );
              
      })
        .catch((error)=>{
            alert('error', error)
        })
        return true
    } catch (e) {
        Alert.alert("Error!", "Cannot Update transactions! Please check your internet connection")
        return false
    }
    }

  }
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
      setDateUpdate(final);
    }

    return (
      <View style={styles.container}>

                <Text style={{fontWeight:'bold', fontSize:20}}>Update Transaction</Text>
           
                        <TextInput style={styles.text1}
                            label={'Title*'}
                            value={textUpdate}
                            onChangeText={textUpdate=>setTextUpdate(textUpdate)}
                            mode={'flat'}
                            selectionColor={'skyblue'}
                            activeOutlineColor={'grey'}
                            //placeholder="label"
                            //placeholderTextColor={'red'}
                            //activeUnderlineColor={'red'}
                            maxLength={50}
                        />

                          <View style={{ borderWidth:1, borderColor:'grey', backgroundColor:'white'}}>
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
                                selectedValue={categoryUpdate}
                                onValueChange={(val) => setCategoryUpdate(val)}
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
                                selectedValue={categoryUpdate}
                                onValueChange={(val) => setCategoryUpdate(val)}
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
                            label={'Amount*'}
                            value={amountUpdate}
                            onChangeText={textUpdate=>setAmountUpdate(textUpdate)}
                            mode={'flat'}
                            selectionColor={'skyblue'}
                            activeOutlineColor={'grey'}
                            //left={<TextInput.Icon icon='currency-rupee'/>}
                            right={<TextInput.Icon icon='backspace' onPress={() => setAmountUpdate("")}/>}
                            keyboardType={'numeric'}
                            maxLength={10}
                        />

                        <TextInput style={styles.text1}
                            label={'Date'}
                            value={dateUpdate}
                            onChangeText={dateUpdate=>setDateUpdate(dateUpdate)}
                            mode={"flat"}
                            selectionColor={'skyblue'}
                            activeOutlineColor={'grey'}
                            keyboardType={'numeric'}
                            right={<TextInput.Icon icon='calendar' onPress={getCurrentDate}/>}
                            //editable={false}
                        />

                        <TextInput style={styles.text1}
                            label={'Note'}
                            placeholder={'Note (Optional)'}
                            value={noteUpdate}
                            onChangeText={textUpdate=>setNoteUpdate(textUpdate)}
                            mode={"flat"}
                            selectionColor={'skyblue'}
                            activeOutlineColor={'grey'}
                            right={<TextInput.Icon icon='note'/>}
                            maxLength={80}
                        />

                <Button 
                 onPress={()=>UpadateTransaction(objectId)}
                  title='Update'
                  value={button}
                  color={'orange'}/>
      </View>
    )
  }


export default UpdateTransactionsView


const styles =StyleSheet.create({
  container:{
    flex:1,
    paddingTop:'15%',
  },
  text1:{
    marginTop:0,
    width:'100%',
    paddingHorizontal:8,
    paddingBottom:8,
    backgroundColor:'white',
  },
})
import React from "react";
import { StyleSheet, TouchableOpacity, View, Text, Alert, Image, Dimensions } from "react-native";
import Colors from "../constants/Colors";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Parse from "parse/react-native";
import { Avatar } from 'react-native-paper';

const TransactionItem = ({item}) => {

    const { objectId, label, amount, type, category, username } = item

    const deleteTransaction = async () => {
        let transaction = new Parse.Object("Transactions")
        transaction.set('objectId', objectId)

        try {
            await transaction.destroy()
            Alert.alert("Transaction deleted!")
            return true
        } catch (error) {
            Alert.alert("Error!", error.message)
            return false
        }
    }

    return (
        <TouchableOpacity
            style={styles.container}
        >
            <View style={styles.view1}>
            <TouchableOpacity
            onLongPress={()=>{deleteAlert()}}
            >
                <TransactionItem item={item}/>
            <View style={styles.items}>
                <View style={{flex:0.13}}>
                    {
                    item.category=="salary"?
                    (
                        <Avatar.Image style={{ backgroundColor:'white'}} size={38}  source={require('../../assets/pickerImage/selling.png')}/>
                    ) : item.category=="selling" ? (
                        <Avatar.Image style={{ backgroundColor:'white'}} size={38}  source={require('../../assets/pickerImage/selling.png')}/>
                    ): item.category=="allowance"?(
                        <Avatar.Image style={{ backgroundColor:'white'}} size={38}  source={require('../../assets/pickerImage/selling.png')}/>
                    ): item.category=="comission"?(
                        <Avatar.Image style={{ backgroundColor:'white'}} size={38}  source={require('../../assets/pickerImage/selling.png')}/>
                    ): item.category=="gifts"?(
                        <Avatar.Image style={{ backgroundColor:'white'}} size={38}  source={require('../../assets/pickerImage/selling.png')}/>
                    ): item.category=="interests"?(
                        <Avatar.Image style={{ backgroundColor:'white'}} size={38}  source={require('../../assets/pickerImage/interests.png')}/>
                    ): item.category=="investments"?(
                        <Avatar.Image style={{ backgroundColor:'white'}} size={38}  source={require('../../assets/pickerImage/selling.png')}/>
                    ): item.category=="misc-income"?(
                        <Avatar.Image style={{ backgroundColor:'white'}} size={38}  source={require('../../assets/pickerImage/miscellaneous.png')}/>
                    ): item.category=="bills"?(
                        <Avatar.Image style={{ backgroundColor:'white'}} size={38}  source={require('../../assets/pickerImage/bill.png')}/>
                    ): item.category=="clothing?" ?(
                        <Avatar.Image style={{ backgroundColor:'white'}} size={38}  source={require('../../assets/pickerImage/clothing.png')}/>
                    ): item.category=="entertainment"?(
                        <Avatar.Image style={{ backgroundColor:'white'}} size={38}  source={require('../../assets/pickerImage/entertainment.png')}/>
                    ): item.category=="food"?(
                        <Avatar.Image style={{ backgroundColor:'white'}} size={38}  source={require('../../assets/pickerImage/food.png')}/>
                    ): item.category=="purchases"?(
                        <Avatar.Image style={{ backgroundColor:'white'}} size={38}  source={require('../../assets/pickerImage/purchases.png')}/>
                    ): item.category=="subscriptions"?(
                        <Avatar.Image style={{ backgroundColor:'white'}} size={38}  source={require('../../assets/pickerImage/subscribe.png')}/>
                    ): item.category=="transportation"?(
                        <Avatar.Image style={{ backgroundColor:'white'}} size={38}  source={require('../../assets/pickerImage/transportation.png')}/>
                    ): item.category=="misc-expense"?(
                        <Avatar.Image style={{ backgroundColor:'white'}} size={38}  source={require('../../assets/pickerImage/miscellaneous.png')}/>
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
                <View style={styles.view2}>
                    <Text style={styles.label}>{label}</Text>
                    <Text 
                        style={{
                            fontSize: 20, 
                            fontWeight: '500', 
                            alignSelf: 'flex-end', 
                            color: type === "Income" ? 'green' : Colors.RED
                        }}
                    >
                        ₹{amount}
                    </Text>
                </View>
                <TouchableOpacity 
                    style={{alignSelf: 'flex-end'}}
                    onPress={() => deleteTransaction()}
                >
                    <Icon name="delete" size={26} />
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    )
}

export default TransactionItem

const WIDTH = Dimensions.get('window').width

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 10,
        marginTop: 20,
    },
    view1: {
        flexDirection :'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    view2: {
        flexDirection :'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '75%',
        paddingHorizontal: 8
    },
    label: {
        fontSize: 20,
        fontWeight: '500'
    },  marginLeft:'2%',
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
    amount: {
        fontSize: 20,
        fontWeight: '500',
        alignSelf: 'flex-end'
    },
    logo: {
        height: 32,
        width: 32
    }
})
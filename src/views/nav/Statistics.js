import React, { useEffect, useState } from "react";
import { StatusBar, Text, View, Alert, Dimensions, ScrollView, RefreshControl, Switch } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { PieChart } from "react-native-chart-kit";
import Colors from "../../constants/Colors"
import { useIsFocused } from "@react-navigation/native";
import { ProgressBar } from "react-native-paper";
import { VictoryPie } from "victory-native";
import Parse, { Query } from "parse/react-native.js";


const Statistics =()=> {

    const isFocused = useIsFocused()
    const [allowance, setAllowance] = useState(null)
    const [commission, setCommission] = useState(null)
    const [gifts, setGifts] = useState(null)
    const [interests, setInterests] = useState(null)
    const [investments, setInvestments] = useState(null)
    const [salary, setSalary] = useState(null)
    const [selling, setSelling] = useState(null)
    const [miscIncome, setMiscIncome] = useState(null)
    const [bills, setBills] = useState(null)
    const [clothing, setClothing] = useState(null)
    const [entertainment, setEntertainment] = useState(null)
    const [food, setFood] = useState(null)
    const [purchases, setPurchases] = useState(null)
    const [subscriptions, setSubscriptions] = useState(null)
    const [transportation, setTransportation] = useState(null)
    const [miscExpense, setMiscExpense] = useState(null)
    const [isEnabled, setIsEnabled] = useState(false)
    const [refresh, setRefresh] = useState(false)
    const [loading, setLoading] = useState(false)
    const [mydata, setMydata] = useState([])
    const [username, setUsername]=useState('')
    const [profit, setProfit] = useState(null)
    const [expense, setExpense] = useState(null)

    const fetchIncomeAndExpense =async()=>{

      try {
        setLoading(true)
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
          let filteredJSON= json.reverse().filter((val, i)=>{
              if(val.username == username){
              return val
              }
              })
              setMydata(filteredJSON)
              TotalPositive(filteredJSON)
              totalNegative(filteredJSON)
              
       })
       return true
      } catch (error) {
        Alert.alert("Error!", "Cannot load data")
        return false
      } finally {
        setLoading(false)
        setRefresh(false)
      }
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
          setProfit(pos)
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
        setExpense(neg)
    }
}


    const fetchIncomeDetails =async()=>{
      try {
        setLoading(true)
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
          let filteredJSON= json.reverse().filter((val, i)=>{
              if(val.username == username){
              return val
              }
              })
              
              if(filteredJSON != null){
                filteredJSON.filter(it=>{
                  if(it.category=="allowance"){
                    setAllowance(Number(it.amount))
                  } else if(it.category=="comission"){
                    setCommission(Number(it.amount))
                  } else if(it.category == "gifts"){
                    setGifts(Number(it.amount))
                  } else if(it.category == "interests"){
                    setInterests(Number(it.amount))
                  } else if(it.category == "investments"){
                    setInvestments(Number(it.amount))
                  } else if(it.category == "salary"){
                    setSalary(Number(it.amount))
                  } else if(it.category == "selling"){
                    setSelling(Number(it.amount))
                  } else if(it.category == "misc-income"){
                    setMiscIncome(Number(it.amount))
                  }
                })
              }
       })
       return true
      } catch (e) {
        Alert.alert("Error!", "Cannot load data! Please check your internet connection fetchIncomeDetails")
        return false
      } finally {
        setLoading(false)
        setRefresh(false)
      }
    }

    const fetchExpenseDetails = async () => {
      try {
          setLoading(true)
          await axios ({
            method:'GET',
            url:`https://parseapi.back4app.com/classes/Expense`,
            headers:{
             'X-Parse-Application-Id' :'PPeAzbb69YA9r151tP8oEa5308CSn2XNz5eweCXZ',
             'X-Parse-REST-API-Key': 'Z4eivtVtYlcvOKThJun2nX5fLrlwxJ0vtnNytExY',
             'content-type': 'application/json'
            }
            })
            .then((response) => {

              const json= response.data.results
              // const json2 =JSON.stringify(json);
              // const json3 =JSON.parse(json2)
              const filteredJSON= json.reverse().filter((val, i)=>{
              if(val.username == username){
              return val
              }
              })
              //console.log(JSON.stringify(filteredJSON))
              //console.log(json3)
              // console.log(typeof(bills))

           /*    function getKeyByValue(object, value) {
                return Object.keys(object).find(key => object[key] === value);
              }
              const map = {"first" : "1", "second" : "2"};
              console.log(getKeyByValue(map,"2"));
          */

              // const extract = (arr, prop)=>{
              //     let extractedvalue= arr.map(item=> item[prop]);
              //     return extractedvalue;
              // }

              // const result = extract(filteredJSON, "bills");
              // console.log(result)
              

              if(filteredJSON != null){
                filteredJSON.filter(it=>{
                  if(it.category =="bills"){
                    setBills(Number(it.amount))

                    //console.log(it.amount)
                    // const str=[];
                    // for(let i=0; i<2; i++){
                    //   str.push(Number(it.amount));
                    // }
                    // console.log(str);
                    //console.log(str.length)

                  }else if(it.category == "clothing"){ 
                    setClothing(Number(it.amount))
                  } else if(it.category == "entertainment"){
                    setEntertainment(Number(it.amount))
                  } else if(it.category == "food"){
                    setFood(Number(it.amount))
                    //console.log((Number(it.amount).reduce((total, currentAmount)=> total= total + currentAmount.prix, 0)))
                    //console.log(((it.amount/1)).reduce((prev, curr) => prev + curr,0))
                  } else if(it.category == "purchases"){
                    setPurchases(Number(it.amount))
                  } else if(it.category == "subscriptions"){
                    setSubscriptions(Number(it.amount))
                  } else if(it.category == "transportation"){
                    setTransportation(Number(it.amount))
                  } else if(it.category == "misc-expense"){
                    setMiscExpense(Number(it.amount))
                    //console.log(typeof(it.amount/1))
                  }
                })
              }

              })
          return true
      } catch (e) {
          Alert.alert("Error!", "Cannot load data! Please check your internet connection fetchExpenseDetails")
          return false
      } finally {
          setLoading(false)
          setRefresh(false)
      }
    }

    const onRefresh = () => {
      setRefresh(true)
      fetchIncomeAndExpense()
      fetchIncomeDetails()
      fetchExpenseDetails()
    }

    useEffect(() => {
      isFocused && fetchIncomeAndExpense() 
          && fetchIncomeDetails() && fetchExpenseDetails()
    }, [isFocused])


    const totalData = [
      {
          x: "Income",
          y: profit,
      },
      {
          x: "Expense",
          y: expense*-1,
      }
  ]

  const incomeData = [
      {
          name: "Allowance",
          amount: allowance,
          color: Colors.NIGHT_RED,
          legendFontSize: 14,
          legendFontColor: Colors.DARK_GRAY,
      },
      {
          name: "Commission",
          amount: commission,
          color: Colors.NIGHT_PINK,
          legendFontSize: 14,
          legendFontColor: Colors.DARK_GRAY,
      },
      {
          name: "Gifts",
          amount: gifts,
          color: Colors.NIGHT_PURPLE,
          legendFontSize: 14,
          legendFontColor: Colors.DARK_GRAY,
      },
      {
          name: "Interests",
          amount: interests,
          color: Colors.NIGHT_BLUE,
          legendFontSize: 14,
          legendFontColor: Colors.DARK_GRAY,
      },
      {
          name: "Investments",
          amount: investments,
          color: Colors.NIGHT_ORANGE,
          legendFontSize: 14,
          legendFontColor: Colors.DARK_GRAY,
      },
      {
          name: "Salary",
          amount: salary,
          color: Colors.NIGHT_GREEN,
          legendFontSize: 14,
          legendFontColor: Colors.DARK_GRAY,
      },
      {
          name: "Selling",
          amount: selling,
          color: Colors.NIGHT_INDIGO,
          legendFontSize: 14,
          legendFontColor: Colors.DARK_GRAY,
      },
      {
          name: "Miscellaneous",
          amount: miscIncome,
          color: Colors.NIGHT_YELLOW,
          legendFontSize: 14,
          legendFontColor: Colors.DARK_GRAY,
      }
  ]

  const expenseData = [
      {
          name: "Bills",
          amount: bills,
          color: Colors.NIGHT_RED,
          legendFontSize: 14,
          legendFontColor: Colors.DARK_GRAY,
          
      },
      {
          name: "Clothing",
          amount: clothing,
          color: Colors.NIGHT_PINK,
          legendFontSize: 14,
          legendFontColor: Colors.DARK_GRAY,
      },
      {
          name: "Entertainment",
          amount: entertainment,
          color: Colors.NIGHT_PURPLE,
          legendFontSize: 14,
          legendFontColor: Colors.DARK_GRAY,
      },
      {
          name: "Food",
          amount: food,
          color: Colors.NIGHT_BLUE,
          legendFontSize: 14,
          legendFontColor: Colors.DARK_GRAY,
      },
      {
          name: "Purchases",
          amount: purchases,
          color: Colors.NIGHT_ORANGE,
          legendFontSize: 14,
          legendFontColor: Colors.DARK_GRAY,
      },
      {
          name: "Subscriptions",
          amount: subscriptions,
          color: Colors.NIGHT_GREEN,
          legendFontSize: 14,
          legendFontColor: Colors.DARK_GRAY,
      },
      {
          name: "Transportation",
          amount: transportation,
          color: Colors.NIGHT_INDIGO,
          legendFontSize: 14,
          legendFontColor: Colors.DARK_GRAY,
      },
      {
          name: "Miscellaneous",
          amount: miscExpense,
          color: Colors.NIGHT_YELLOW,
          legendFontSize: 14,
          legendFontColor: Colors.DARK_GRAY,
      }
  ]


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


  return (
    <View style={{flex: 1, paddingTop: StatusBar.currentHeight, paddingHorizontal: 10}}>
        <View style={{flex: 0.075, justifyContent: 'center'}}>
            <Text style={{color: 'blue', fontSize: 30, fontWeight: '700'}}>Statistics</Text>
        </View>
        
        {loading ? (
            <ProgressBar indeterminate color={'coral'} />
        ) : (
            <ScrollView 
                style={{flex: 0.925}}
                refreshControl={
                    <RefreshControl
                        refreshing={refresh}
                        onRefresh={onRefresh}
                    />
                }
            >
                <View style={{
                    flex: 0.325, 
                    justifyContent: 'center', 
                    backgroundColor: Colors.DARK, 
                    borderRadius: 8, 
                    paddingBottom: 10
                }}>
                    <VictoryPie
                        data={totalData}
                        colorScale={[Colors.NIGHT_GREEN, Colors.NIGHT_RED]}
                        width={WIDTH}
                        height={270}
                        animate={{duration: 2000}}
                        style={{labels: {fontSize: 14, fill: Colors.DARK_GRAY}}}
                    />
                    <View style={{
                        flex: 1, 
                        flexDirection: 'row', 
                        justifyContent: 'space-between', 
                        paddingHorizontal: 10,
                        marginTop: 10
                    }}>
                        <Text style={{color: Colors.DARK_GRAY, fontSize: 14}}>
                            Total Income = ₹{profit}
                        </Text>
                        <Text style={{color: Colors.DARK_GRAY, fontSize: 14}}>
                            Total Expense = ₹{expense}
                        </Text>
                    </View>
                </View>
                <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                    <Text style={{color: Colors.DARK_GRAY, fontSize: 16}}>
                        Show absolute values
                    </Text>
                    <Switch
                        trackColor={{ false: "#767577", true: "#87CEEB" }}
                        thumbColor={isEnabled ? Colors.BLUE : "#f4f3f4"}
                        onValueChange={() => setIsEnabled(!isEnabled)}
                        value={isEnabled}
                    />
                </View>


                <View style={{
                          flex: 0.325, 
                          justifyContent: 'center', 
                          backgroundColor: Colors.DARK, 
                          borderRadius: 8,
                          paddingBottom: 10
                      }}>
                    <View style={{flex: 1, paddingHorizontal: 10, marginTop: 10}}>
                        <Text style={{color: Colors.DARK_GRAY, fontSize: 16}}>
                            Income
                        </Text>
                    </View>
                    <PieChart
                        data={incomeData}
                        width={WIDTH}
                        height={200}
                        chartConfig={chartConfig}
                        accessor={"amount"}
                        absolute={isEnabled === true ? true : false}
                        avoidFalseZero={true}
                    />
                </View>


                <View style={{
                          flex: 0.325, 
                          justifyContent: 'center', 
                          backgroundColor: Colors.DARK, 
                          borderRadius: 8,
                          marginTop: 20,
                          paddingBottom: 10,
                      }}>
                      <View style={{flex: 1, paddingHorizontal: 10, marginTop: 10}}>
                          <Text style={{color: Colors.DARK_GRAY, fontSize: 16}}>
                              Expense
                          </Text>
                      </View>
                      <PieChart
                        data={expenseData}
                        width={WIDTH}
                        height={200}
                        chartConfig={chartConfig}
                        accessor={"amount"}
                        absolute={isEnabled === true ? true : false}
                        avoidFalseZero={true}
                      />
                </View>
            </ScrollView>
        )}
    </View>
)
    
  }

export default Statistics


const WIDTH = Dimensions.get('window').width

const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    barPercentage: 0.5,
}

import React, { useEffect, useState } from "react";
import {
  StatusBar,
  Text,
  View,
  Alert,
  Dimensions,
  ScrollView,
  RefreshControl,
  Switch,
} from "react-native";
import { PieChart } from "react-native-chart-kit";
import Colors from "../../constants/Colors";
import { useIsFocused } from "@react-navigation/native";
import { ProgressBar } from "react-native-paper";
import { VictoryPie } from "victory-native";
import Parse, { Query } from "parse/react-native.js";


const Statistics = () => {
  const isFocused = useIsFocused();
  const [allowance, setAllowance] = useState(null);
  const [commission, setCommission] = useState(null);
  const [gifts, setGifts] = useState(null);
  const [interests, setInterests] = useState(null);
  const [investments, setInvestments] = useState(null);
  const [salary, setSalary] = useState(null);
  const [selling, setSelling] = useState(null);
  const [miscIncome, setMiscIncome] = useState(null);
  const [bills, setBills] = useState(null);
  const [clothing, setClothing] = useState(null);
  const [entertainment, setEntertainment] = useState(null);
  const [food, setFood] = useState(null);
  const [purchases, setPurchases] = useState(null);
  const [subscriptions, setSubscriptions] = useState(null);
  const [transportation, setTransportation] = useState(null);
  const [miscExpense, setMiscExpense] = useState(null);
  const [isEnabled, setIsEnabled] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [username, setUsername] = useState("");
  const [profit, setProfit] = useState(null);
  const [expense, setExpense] = useState(null);
  const [loading, setLoading] = useState(false);

  //const [mydata, setMydata] = useState([])


  const fetchIncomeAndExpense = async() => {
    setLoading(true)
    const currentUser = await Parse.User.currentAsync();
    const usernamefetch = currentUser.getUsername();
    
    const ExpenseDataGet = Parse.Object.extend('Expense');
    const query = new Parse.Query(ExpenseDataGet)
    query.descending('updatedAt')  //sort-> latest to oldest 
    //query.equalTo('username', 'Anubhav');
    //console.log(usernamefetch)
    query.contains('username', usernamefetch)
    try {
        
        await query.find()
        .then((results)=>{
            const filteredJSON =results.map((result)=>({
                category: result.get('category'),
                date: result.get('date'),
                text: result.get('text'),
                numAmount:result.get('numAmount'),
                username: result.get('username'),
                objectid: result.get('objectid'),
                note: result.get('note'),
                createdAt: result.get('createdAt'),
               updatedAt: result.get('updatedAt')
            }))
            

       //setMydata(filteredJSON)
        TotalPositive(filteredJSON);
        totalNegative(filteredJSON);

        //expense
        foodBalance(filteredJSON);
        billsBalance(filteredJSON);
        clothingBalance(filteredJSON);
        entertainmentBalance(filteredJSON);
        purchasesBalance(filteredJSON);
        subscriptionsBalance(filteredJSON);
        transportationBalance(filteredJSON);
        miscexpenseBalance(filteredJSON);

        //income
        allowanceBalance(filteredJSON);
        comissionBalance(filteredJSON);
        giftsBalance(filteredJSON);
        interestsBalance(filteredJSON);
        investmentsBalance(filteredJSON);
        salaryBalance(filteredJSON);
        sellingBalance(filteredJSON);
        miscincomeBalance(filteredJSON);
        })
       
        return true
    } catch (error) {
        Alert.alert("Error!", "Cannot load data");
      return false;
    }
    finally{
        setRefresh(false)
        setLoading(false)
    }
    
}


  const TotalPositive = (mydata) => {
    var pos = 0;
    if (mydata != null) {
      mydata.map((it) => {
        if (
          (it.numAmount >= 0 && it.category == "allowance") ||
          it.category == "comission" ||
          it.category == "gifts" ||
          it.category == "interests" ||
          it.category == "investments" ||
          it.category == "salary" ||
          it.category == "selling" ||
          it.category == "misc-income"
        ) {
          pos = pos + it.numAmount;
        }
      });
      setProfit(pos);
    }
  };

  const totalNegative = (mydata) => {
    var neg = 0;
    if (mydata != null) {
      mydata.map((it) => {
        if (
          it.category == "food" ||
          it.category == "bills" ||
          it.category == "clothing" ||
          it.category == "entertainment" ||
          it.category == "purchases" ||
          it.category == "subscriptions" ||
          it.category == "transportation" ||
          it.category == "misc-expense"
        ) {
          neg = neg - it.numAmount;
        }
      });
      setExpense(neg);
    }
  };

  //expense
  const billsBalance = (mydata) => {
    var billsD = 0;
    if (mydata != 0) {
      mydata.filter((it) => {
        if (it.category == "bills") {
          billsD = billsD + it.numAmount;
        }
      });
      setBills(billsD);
    }
  };

  const foodBalance = (mydata) => {
    var foodD = 0;
    if (mydata != 0) {
      mydata.filter((it) => {
        if (it.category == "food") {
          foodD = foodD + it.numAmount;
        }
      });
      setFood(foodD);
    }
  };

  const clothingBalance = (mydata) => {
    var clothingD = 0;
    if (mydata != 0) {
      mydata.filter((it) => {
        if (it.category == "clothing") {
          clothingD = clothingD + it.numAmount;
        }
      });
      setClothing(clothingD);
    }
  };

  const entertainmentBalance = (mydata) => {
    var entertainmentD = 0;
    if (mydata != 0) {
      mydata.filter((it) => {
        if (it.category == "entertainment") {
          entertainmentD = entertainmentD + it.numAmount;
        }
      });
      setEntertainment(entertainmentD);
    }
  };

  const purchasesBalance = (mydata) => {
    var purchasesD = 0;
    if (mydata != 0) {
      mydata.filter((it) => {
        if (it.category == "purchases") {
          purchasesD = purchasesD + it.numAmount;
        }
      });
      setPurchases(purchasesD);
    }
  };

  const subscriptionsBalance = (mydata) => {
    var subscriptionsD = 0;
    if (mydata != 0) {
      mydata.filter((it) => {
        if (it.category == "subscriptions") {
          subscriptionsD = subscriptionsD + it.numAmount;
        }
      });
      setSubscriptions(subscriptionsD);
    }
  };

  const transportationBalance = (mydata) => {
    var transportationD = 0;
    if (mydata != 0) {
      mydata.filter((it) => {
        if (it.category == "transportation") {
          transportationD = transportationD + it.numAmount;
        }
      });
      setTransportation(transportationD);
    }
  };

  const miscexpenseBalance = (mydata) => {
    var miscexpenseD = 0;
    if (mydata != 0) {
      mydata.filter((it) => {
        if (it.category == "misc-expense") {
          miscexpenseD = miscexpenseD + it.numAmount;
        }
      });
      setMiscExpense(miscexpenseD);
    }
  };

  //income
  const allowanceBalance = (mydata) => {
    var allowanceD = 0;
    if (mydata != 0) {
      mydata.filter((it) => {
        if (it.category == "allowance") {
          allowanceD = allowanceD + it.numAmount;
        }
      });
      setAllowance(allowanceD);
    }
  };

  const comissionBalance = (mydata) => {
    var comissionD = 0;
    if (mydata != 0) {
      mydata.filter((it) => {
        if (it.category == "comission") {
          comissionD = comissionD + it.numAmount;
        }
      });
      setCommission(comissionD);
    }
  };

  const giftsBalance = (mydata) => {
    var giftsD = 0;
    if (mydata != 0) {
      mydata.filter((it) => {
        if (it.category == "gifts") {
          giftsD = giftsD + it.numAmount;
        }
      });
      setGifts(giftsD);
    }
  };

  const interestsBalance = (mydata) => {
    var interestsD = 0;
    if (mydata != 0) {
      mydata.filter((it) => {
        if (it.category == "interests") {
          interestsD = interestsD + it.numAmount;
        }
      });
      setInterests(interestsD);
    }
  };

  const investmentsBalance = (mydata) => {
    var investmentsD = 0;
    if (mydata != 0) {
      mydata.filter((it) => {
        if (it.category == "investments") {
          investmentsD = investmentsD + it.numAmount;
        }
      });
      setInvestments(investmentsD);
    }
  };

  const salaryBalance = (mydata) => {
    var salaryD = 0;
    if (mydata != 0) {
      mydata.filter((it) => {
        if (it.category == "salary") {
          salaryD = salaryD + it.numAmount;
        }
      });
      setSalary(salaryD);
    }
  };

  const sellingBalance = (mydata) => {
    var sellingD = 0;
    if (mydata != 0) {
      mydata.filter((it) => {
        if (it.category == "selling") {
          sellingD = sellingD + it.numAmount;
        }
      });
      setSelling(sellingD);
    }
  };

  const miscincomeBalance = (mydata) => {
    var miscincomeD = 0;
    if (mydata != 0) {
      mydata.filter((it) => {
        if (it.category == "misc-income") {
          miscincomeD = miscincomeD + it.numAmount;
        }
      });
      setMiscIncome(miscincomeD);
    }
  };

  const onRefresh = () => {
    setRefresh(true);
    fetchIncomeAndExpense();
  };

  useEffect(() => {
    isFocused && fetchIncomeAndExpense();
  }, [isFocused]);

  const totalData = [
    {
      x: "Income",
      y: profit,
    },
    {
      x: "Expense",
      y: expense * -1,
    },
  ];

  const incomeData = [
    {
      name: "Allowance",
      numAmount: allowance,
      color: Colors.NIGHT_RED,
      legendFontSize: 14,
      legendFontColor: Colors.DARK_GRAY,
    },
    {
      name: "Commission",
      numAmount: commission,
      color: Colors.NIGHT_PINK,
      legendFontSize: 14,
      legendFontColor: Colors.DARK_GRAY,
    },
    {
      name: "Gifts",
      numAmount: gifts,
      color: Colors.NIGHT_PURPLE,
      legendFontSize: 14,
      legendFontColor: Colors.DARK_GRAY,
    },
    {
      name: "Interests",
      numAmount: interests,
      color: Colors.NIGHT_BLUE,
      legendFontSize: 14,
      legendFontColor: Colors.DARK_GRAY,
    },
    {
      name: "Investments",
      numAmount: investments,
      color: Colors.NIGHT_ORANGE,
      legendFontSize: 14,
      legendFontColor: Colors.DARK_GRAY,
    },
    {
      name: "Salary",
      numAmount: salary,
      color: Colors.NIGHT_GREEN,
      legendFontSize: 14,
      legendFontColor: Colors.DARK_GRAY,
    },
    {
      name: "Selling",
      numAmount: selling,
      color: Colors.NIGHT_INDIGO,
      legendFontSize: 14,
      legendFontColor: Colors.DARK_GRAY,
    },
    {
      name: "Miscellaneous",
      numAmount: miscIncome,
      color: Colors.NIGHT_YELLOW,
      legendFontSize: 14,
      legendFontColor: Colors.DARK_GRAY,
    },
  ];

  const expenseData = [
    {
      name: "Bills",
      numAmount: bills,
      color: Colors.NIGHT_RED,
      legendFontSize: 14,
      legendFontColor: Colors.DARK_GRAY,
    },
    {
      name: "Clothing",
      numAmount: clothing,
      color: Colors.NIGHT_PINK,
      legendFontSize: 14,
      legendFontColor: Colors.DARK_GRAY,
    },
    {
      name: "Entertainment",
      numAmount: entertainment,
      color: Colors.NIGHT_PURPLE,
      legendFontSize: 14,
      legendFontColor: Colors.DARK_GRAY,
    },
    {
      name: "Food",
      numAmount: food,
      color: Colors.NIGHT_BLUE,
      legendFontSize: 14,
      legendFontColor: Colors.DARK_GRAY,
    },
    {
      name: "Purchases",
      numAmount: purchases,
      color: Colors.NIGHT_ORANGE,
      legendFontSize: 14,
      legendFontColor: Colors.DARK_GRAY,
    },
    {
      name: "Subscriptions",
      numAmount: subscriptions,
      color: Colors.NIGHT_GREEN,
      legendFontSize: 14,
      legendFontColor: Colors.DARK_GRAY,
    },
    {
      name: "Transportation",
      numAmount: transportation,
      color: Colors.NIGHT_INDIGO,
      legendFontSize: 14,
      legendFontColor: Colors.DARK_GRAY,
    },
    {
      name: "Miscellaneous",
      numAmount: miscExpense,
      color: Colors.NIGHT_YELLOW,
      legendFontSize: 14,
      legendFontColor: Colors.DARK_GRAY,
    },
  ];

  useEffect(() => {
    // Since the async method Parse.User.currentAsync is needed to
    // retrieve the current user data, you need to declare an async
    // function here and call it afterwards
    async function getCurrentUser() {
      // This condition ensures that username is updated only if needed
      if (username === "") {
        const currentUser = await Parse.User.currentAsync();
        if (currentUser !== null) {
          setUsername(currentUser.getUsername());
        }
      }
    }
    getCurrentUser();
  }, [username]);

  return (
    <View
      style={{
        flex: 1,
        paddingTop: StatusBar.currentHeight,
        paddingHorizontal: 10,
      }}
    >
      <View style={{ flex: 0.075, justifyContent: "center" }}>
        <Text style={{ color: "blue", fontSize: 30, fontWeight: "700" }}>
          Statistics
        </Text>
      </View>

      {loading ? 
        <ProgressBar indeterminate color={"coral"} /> : (
        <ScrollView
          style={{ flex: 0.925 }}
          refreshControl={
            <RefreshControl refreshing={refresh} onRefresh={onRefresh} />
          }
        >
          <View
            style={{
              flex: 0.325,
              justifyContent: "center",
              backgroundColor: Colors.DARK,
              borderRadius: 8,
              paddingBottom: 10,
            }}
          >
            <VictoryPie
              data={totalData}
              colorScale={[Colors.NIGHT_GREEN, Colors.NIGHT_RED]}
              width={WIDTH}
              height={270}
              animate={{ duration: 2000 }}
              style={{ labels: { fontSize: 14, fill: Colors.DARK_GRAY } }}
            />
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "space-between",
                paddingHorizontal: 10,
                marginTop: 10,
              }}
            >
              <Text style={{ color: Colors.DARK_GRAY, fontSize: 14 }}>
                Total Income = ₹{profit}
              </Text>
              <Text style={{ color: Colors.DARK_GRAY, fontSize: 14 }}>
                Total Expense = ₹{expense}
              </Text>
            </View>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ color: Colors.DARK_GRAY, fontSize: 16 }}>
              Show absolute values
            </Text>
            <Switch
              trackColor={{ false: "#767577", true: "#87CEEB" }}
              thumbColor={isEnabled ? Colors.BLUE : "#f4f3f4"}
              onValueChange={() => setIsEnabled(!isEnabled)}
              value={isEnabled}
            />
          </View>

          <View
            style={{
              flex: 0.325,
              justifyContent: "center",
              backgroundColor: Colors.DARK,
              borderRadius: 8,
              paddingBottom: 10,
            }}
          >
            <View style={{ flex: 1, paddingHorizontal: 10, marginTop: 10 }}>
              <Text style={{ color: Colors.DARK_GRAY, fontSize: 16 }}>
                Income
              </Text>
            </View>
            <PieChart
              data={incomeData}
              width={WIDTH}
              height={200}
              chartConfig={chartConfig}
              accessor={"numAmount"}
              absolute={isEnabled === true ? true : false}
              avoidFalseZero={true}
            />
          </View>

          <View
            style={{
              flex: 0.325,
              justifyContent: "center",
              backgroundColor: Colors.DARK,
              borderRadius: 8,
              marginTop: 20,
              paddingBottom: 10,
            }}
          >
            <View style={{ flex: 1, paddingHorizontal: 10, marginTop: 10 }}>
              <Text style={{ color: Colors.DARK_GRAY, fontSize: 16 }}>
                Expense
              </Text>
            </View>
            <PieChart
              data={expenseData}
              width={WIDTH}
              height={200}
              chartConfig={chartConfig}
              accessor={"numAmount"}
              absolute={isEnabled === true ? true : false}
              avoidFalseZero={true}
            />
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default Statistics;

const WIDTH = Dimensions.get("window").width;

const chartConfig = {
  backgroundGradientFrom: "#1E2923",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "#08130D",
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  barPercentage: 0.5,
};

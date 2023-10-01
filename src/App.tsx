import { FlatList, Pressable, SafeAreaView, StatusBar, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react';


// Constants
import CurrencyButton from './components/CurrencyButton'
import {currencyByRupee} from './constants'

import Snackbar from 'react-native-snackbar';

export default function App() {
  const [inputValue, setInputValue] = useState('');
  const [resultValue, setResultValue] = useState('');
  const [targetCurrency, setTargetCurrency] = useState('');

  const buttonPressed = (targetValue: Currency) => {
    if (!inputValue) {
     return Snackbar.show({
      text: "Enter a value to convert",
      backgroundColor: "#EA7773",
      textColor: "#000000"
     })
    }

    const inputAmount = parseFloat(inputValue);
    
    if(isNaN(inputAmount)) {
      return Snackbar.show({
        text: "Enter a number to convert",
        backgroundColor: "#EA7773",
        textColor: "#000000"
       })
    }else{
      const convertedValue = inputAmount * targetValue.value;

      const result = `${targetValue.symbol} ${convertedValue.toFixed(2)}`

      setResultValue(result);
      setTargetCurrency(targetValue.name)
    }
  }

  return (
    
      <>
        <StatusBar/>
         <View style={styles.container}>
          <View style={styles.wrapper}>
             <View style={styles.rupeesContainer}>
             <Text style={styles.rupee}>₹</Text>
                <TextInput
                 keyboardType='number-pad'
                 maxLength={14}
                 value={inputValue}
                 onChangeText={setInputValue}
                 placeholder='Enter amount in rupee'
                 style={styles.rupeeText}
                />
             </View>

             {resultValue && (
               <Text style={styles.resultTxt}>
                {resultValue}
               </Text>
             )}
          </View>

            <View style={styles.bottomContainer}>

          <FlatList
          numColumns={3}
          data={currencyByRupee}
          keyExtractor={item => item.name}
          renderItem={({item}) => (
            <Pressable
            onPress={() => buttonPressed(item)}
            style={[
              styles.button, 
              targetCurrency === item.name && styles.selected
            ]}
            >
                 <CurrencyButton {...item} />
              </Pressable>
          )}
          />
         </View>
          </View>
      </>
  
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#c9f29b',
  },
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  resultTxt: {
    fontSize: 32,
    color: '#000000',
    fontWeight: '800',
  },
  rupee: {
    marginRight: 8,
    fontSize: 22,
    color: '#000000',
    fontWeight: '800',
  },
  rupeeText:{
    borderColor: '#000000',
    backgroundColor: '#ffffff',
    borderRadius: 7
  },
  rupeesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
   
  },
  inputAmountField: {
    height: 40,
    width: 200,
    padding: 8,
    borderWidth: 1,
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
  },
  bottomContainer: {
    flex: 3,
  },
  button: {
    flex: 1,

    margin: 12,
    height: 60,

    borderRadius: 12,
    backgroundColor: '#fff',
    elevation: 2,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowColor: '#333',
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  selected: {
    backgroundColor: '#ffeaa7',
  },
});
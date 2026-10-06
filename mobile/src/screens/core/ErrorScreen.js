import React from 'react';
import {View,Text,TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useTheme} from '../../context/ThemeContext';
export default function ErrorScreen({navigation}){const {colors}=useTheme();return <SafeAreaView style={{flex:1,backgroundColor:colors.background}}><View style={{padding:24,gap:20}}><Text style={{color:colors.onSurface,fontSize:28}}>Something went wrong</Text><Text style={{color:colors.onSurface}}>Return to your workspace and try the action again.</Text><TouchableOpacity onPress={()=>navigation.goBack()}><Text style={{color:colors.primary}}>Go back</Text></TouchableOpacity></View></SafeAreaView>;}

import React from 'react';
import {View,Text,ActivityIndicator} from 'react-native';
import {useTheme} from '../../context/ThemeContext';
export default function SplashScreen(){const {colors}=useTheme();return <View style={{flex:1,alignItems:'center',justifyContent:'center',gap:16,backgroundColor:colors.background}}><Text style={{color:colors.onSurface,fontSize:28,fontWeight:'700'}}>Mandate</Text><ActivityIndicator color={colors.primary}/></View>;}

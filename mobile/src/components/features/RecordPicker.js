import React, {useMemo, useState} from 'react';
import {FlatList, KeyboardAvoidingView, Modal, Platform, Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import {useTheme} from '../../context/ThemeContext';

export default function RecordPicker({options, value, onChange, label, multiple=false}) {
  const {colors} = useTheme(), insets = useSafeAreaInsets();
  const [open,setOpen] = useState(false), [query,setQuery] = useState('');
  const names = useMemo(()=>new Map(options.map(item=>[item.value,item.label])),[options]);
  const selected = multiple ? value : value ? [value] : [];
  const filtered = useMemo(()=>options.filter(item=>item.label.toLowerCase().includes(query.trim().toLowerCase())),[options,query]);
  const choose = id => {
    if(multiple)onChange(selected.includes(id)?selected.filter(item=>item!==id):[...selected,id]);
    else {onChange(id);setOpen(false);}
  };
  return <>
    <Pressable accessibilityRole="button" accessibilityLabel={label} onPress={()=>{setQuery('');setOpen(true);}} style={[styles.trigger,{borderColor:colors.outlineVariant}]}><Text numberOfLines={1} style={{flex:1,color:colors.onSurface}}>{multiple?selected.length+' selected':names.get(value)||'None'}</Text><MaterialIcons name="expand-more" size={22} color={colors.onSurfaceVariant}/></Pressable>
    <Modal visible={open} transparent animationType="fade" onRequestClose={()=>setOpen(false)}>
      <KeyboardAvoidingView behavior={Platform.OS==='ios'?'padding':'height'} style={[styles.overlay,{paddingTop:insets.top+12,paddingBottom:insets.bottom+12}]}>
        <Pressable accessibilityRole="button" accessibilityLabel="Close record picker" onPress={()=>setOpen(false)} style={StyleSheet.absoluteFillObject}/>
        <View accessibilityViewIsModal style={[styles.panel,{backgroundColor:colors.surfaceContainerLowest}]}>
          <View style={styles.heading}><Text style={{flex:1,color:colors.onSurface,fontSize:18,fontFamily:'HankenGrotesk-SemiBold'}}>{label}</Text><Pressable accessibilityRole="button" accessibilityLabel="Close record picker" onPress={()=>setOpen(false)} style={styles.close}><MaterialIcons name="close" size={23} color={colors.onSurface}/></Pressable></View>
          <TextInput accessibilityLabel={'Find '+label.toLowerCase()} value={query} onChangeText={setQuery} placeholder="Find a record" placeholderTextColor={colors.onSurfaceVariant} style={[styles.input,{color:colors.onSurface,backgroundColor:colors.surfaceContainerLow}]} autoCorrect={false}/>
          <FlatList style={{flex:1}} data={filtered} keyExtractor={item=>item.value} initialNumToRender={8} maxToRenderPerBatch={8} windowSize={5} keyboardShouldPersistTaps="handled"
            ListHeaderComponent={!multiple?<Pressable accessibilityRole="button" onPress={()=>choose('')} style={styles.option}><Text style={{color:colors.onSurface}}>None</Text></Pressable>:null}
            ListEmptyComponent={<Text style={[styles.option,{color:colors.onSurfaceVariant}]}>No matching records</Text>}
            renderItem={({item})=><Pressable accessibilityRole={multiple?'checkbox':'button'} accessibilityState={multiple?{checked:selected.includes(item.value)}:{selected:selected.includes(item.value)}} onPress={()=>choose(item.value)} style={[styles.option,{backgroundColor:selected.includes(item.value)?colors.surfaceContainer:'transparent'}]}><Text numberOfLines={2} style={{flex:1,color:colors.onSurface,fontSize:15}}>{item.label}</Text>{selected.includes(item.value)&&<MaterialIcons name="check" size={22} color={colors.primary}/>}</Pressable>}/>
          {multiple&&<Pressable accessibilityRole="button" onPress={()=>setOpen(false)} style={[styles.done,{backgroundColor:colors.primary}]}><Text style={{color:colors.onPrimary}}>Done · {selected.length} selected</Text></Pressable>}
        </View>
      </KeyboardAvoidingView>
    </Modal>
  </>;
}
const styles=StyleSheet.create({
  trigger:{minHeight:48,paddingHorizontal:12,borderWidth:1,borderRadius:12,flexDirection:'row',alignItems:'center',gap:10},
  overlay:{flex:1,backgroundColor:'rgba(0,0,0,0.4)',paddingHorizontal:16},panel:{flex:1,borderRadius:24,overflow:'hidden',padding:16},
  heading:{flexDirection:'row',alignItems:'center',gap:12},close:{width:44,height:44,alignItems:'center',justifyContent:'center'},
  input:{minHeight:48,paddingHorizontal:12,borderRadius:12,marginVertical:12},option:{minHeight:48,padding:12,flexDirection:'row',alignItems:'center',gap:12,borderRadius:12},done:{padding:16,borderRadius:16,alignItems:'center',marginTop:12},
});

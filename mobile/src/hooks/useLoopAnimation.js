import {useEffect, useState} from 'react';
import {AccessibilityInfo, Animated, AppState, Easing} from 'react-native';
import {useIsFocused} from '@react-navigation/native';

export default function useLoopAnimation(value, duration) {
  const focused = useIsFocused();
  const [active,setActive] = useState(AppState.currentState === 'active');
  const [reduceMotion,setReduceMotion] = useState(true);
  useEffect(() => {
    let mounted = true;
    AccessibilityInfo.isReduceMotionEnabled().then(result=>{if(mounted)setReduceMotion(result);});
    const motion = AccessibilityInfo.addEventListener('reduceMotionChanged',setReduceMotion);
    const app = AppState.addEventListener('change',state=>setActive(state==='active'));
    return ()=>{mounted=false;motion.remove();app.remove();};
  }, []);
  useEffect(() => {
    if (!focused || !active || reduceMotion) return;
    const loop = Animated.loop(Animated.timing(value,{toValue:1,duration,easing:Easing.linear,useNativeDriver:true,isInteraction:false}));
    loop.start();
    return ()=>loop.stop();
  }, [focused,active,reduceMotion,value,duration]);
}

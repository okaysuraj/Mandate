import React, {useEffect, useRef, useState, useMemo} from 'react';
import {AccessibilityInfo, Animated, Easing, Modal, PanResponder, Pressable, StyleSheet, useWindowDimensions, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useDrawer} from '../../context/DrawerContext';
import RightSidebarDrawer from './RightSidebarDrawer';

// This overlay owns its animation state; opening it does not rerender the navigator.
export default function SidebarOverlay() {
  const {isOpen, closeDrawer} = useDrawer();
  const {width} = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const panelWidth = Math.min(width - 56, 360);
  const progress = useRef(new Animated.Value(0)).current;
  const [visible, setVisible] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  useEffect(() => {
    let active = true;
    AccessibilityInfo.isReduceMotionEnabled().then(value => {if (active) setReduceMotion(value);});
    const listener = AccessibilityInfo.addEventListener('reduceMotionChanged', setReduceMotion);
    return () => {active = false; listener.remove();};
  }, []);
  useEffect(() => {
    if (isOpen) setVisible(true);
    const animation = Animated.timing(progress, {
      toValue: isOpen ? 1 : 0, duration: reduceMotion ? 0 : isOpen ? 240 : 180,
      easing: Easing.bezier(0.32, 0.72, 0, 1), useNativeDriver: true,
    });
    animation.start(({finished}) => {if (finished && !isOpen) setVisible(false);});
    return () => animation.stop();
  }, [isOpen, progress, reduceMotion]);
  const gesture = useMemo(() => PanResponder.create({
    onMoveShouldSetPanResponder: (_, state) => state.numberActiveTouches === 1 && state.dx < -10 && Math.abs(state.dx) > Math.abs(state.dy) * 1.5,
    onPanResponderGrant: () => progress.stopAnimation(),
    onPanResponderMove: (_, state) => progress.setValue(Math.max(0, Math.min(1, 1 + state.dx / panelWidth))),
    onPanResponderRelease: (_, state) => {
      if (state.dx < -panelWidth * 0.25 || state.vx < -0.5) closeDrawer();
      else Animated.timing(progress, {toValue: 1, duration: reduceMotion ? 0 : 180, useNativeDriver: true}).start();
    },
    onPanResponderTerminate: () => Animated.timing(progress, {toValue: 1, duration: reduceMotion ? 0 : 180, useNativeDriver: true}).start(),
  }), [closeDrawer, panelWidth, progress, reduceMotion]);
  return <Modal transparent visible={visible} animationType="none" onRequestClose={closeDrawer} statusBarTranslucent navigationBarTranslucent>
    <View style={styles.overlay}>
      <Animated.View style={[StyleSheet.absoluteFillObject, {backgroundColor: '#000', opacity: progress.interpolate({inputRange:[0,1],outputRange:[0,0.38]})}]}>
        <Pressable accessibilityRole="button" accessibilityLabel="Close navigation" onPress={closeDrawer} style={StyleSheet.absoluteFillObject}/>
      </Animated.View>
      <Animated.View {...gesture.panHandlers} accessibilityViewIsModal onAccessibilityEscape={closeDrawer} style={[styles.panel, {
        width: panelWidth, top: insets.top + 12, bottom: Math.max(insets.bottom, 12) + 12,
        opacity: reduceMotion ? progress : 1,
        transform: [{translateX: reduceMotion ? 0 : progress.interpolate({inputRange:[0,1],outputRange:[-panelWidth-24,0]})}],
      }]}><RightSidebarDrawer/></Animated.View>
    </View>
  </Modal>;
}
const styles = StyleSheet.create({
  overlay: {flex:1},
  panel: {position:'absolute',left:12,borderRadius:28,overflow:'hidden',elevation:12,shadowColor:'#000',shadowOffset:{width:0,height:8},shadowOpacity:0.16,shadowRadius:24},
});

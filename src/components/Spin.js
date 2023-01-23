import React, { useEffect, useRef } from 'react'
import { StyleSheet, View, ColorValue, Animated, Easing } from 'react-native'

const startRotationAnimation = (durationMs, rotationDegree) => {
  Animated.loop(Animated.timing(rotationDegree,
    {
        toValue: 360,
        duration: durationMs,
        easing: Easing.linear,
        useNativeDriver: true
    }
  )).start();
}

const Spin = () => {
  const rotationDegree = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    startRotationAnimation(1000, rotationDegree)
  }, [ rotationDegree])

  return (
    <View style={styles.block}>
      <View style={styles.container} accessibilityRole='progressbar'>
        <View style={[styles.background, { borderColor: 'green' }]} />
        <Animated.View
          style={[styles.progress, { borderTopColor: 'green' }, {
            transform: [{
              rotateZ: rotationDegree.interpolate({
                inputRange: [0, 360],
                outputRange: ['0deg', '360deg']
              })
            }]
          }]}
        />
      </View>
    </View>
  )
}

const height = 48;

const styles = StyleSheet.create({
  block: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.2)'
  },
  container: {
    width: height,
    height: height,
  },
  background: {
    width: '100%',
    height: '100%',
    borderRadius: height / 2,
    borderWidth: 5,
    opacity: 0.5
  },
  progress: {
    width: '100%',
    height: '100%',
    borderRadius: height / 2,
    borderLeftColor: '#ffffff',
    borderRightColor: '#ffffff',
    borderBottomColor: '#ffffff',
    borderWidth: 5,
    position: 'absolute'
  }
})

export default Spin;
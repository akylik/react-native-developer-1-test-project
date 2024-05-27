import React, { useState } from 'react'
import {
  Animated,
  LayoutAnimation,
  Platform,
  Pressable,
  StyleSheet,
  UIManager,
  View
} from 'react-native'
import { colors } from '../colors'
import Text from './Text'

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true)
}

export const ExpandableSection: React.FC<any> = ({ title, description, children }) => {
  const [expanded, setExpanded] = useState(false)
  const [animation] = useState(new Animated.Value(0))
  const [rotateAnim] = useState(new Animated.Value(0))
  const [contentHeight, setContentHeight] = useState(0)

  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    setExpanded(!expanded)
    Animated.timing(animation, {
      toValue: expanded ? 0 : contentHeight,
      duration: 300,
      useNativeDriver: false
    }).start()
  
    Animated.timing(rotateAnim, {
      toValue: expanded ? 0 : 1,
      duration: 300,
      useNativeDriver: false
    }).start()
  }

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg']
  })

  return (
    <View style={styles.container}>
      <Pressable onPress={toggleExpand} style={styles.header}>
        <Text style={styles.headerText}>{title}</Text>
        <Animated.Image
          source={require('../../assets/caret_down.png')}
          style={[styles.caret, { transform: [{ rotate }] }]}
        />
      </Pressable>
      <Animated.View style={{ height: animation, overflow: 'hidden' }}>
        <View
          style={styles.content}
          onLayout={event => {
            const height = event.nativeEvent.layout.height
            setContentHeight(height)
            animation.setValue(expanded ? height : 0) // Set initial height
          }}
        >
          {description && <Text style={styles.description}>{description}</Text>}
          {children}
        </View>
      </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    marginHorizontal: 20,
    borderRadius: 10,
    backgroundColor: colors.surface.disable
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5
  },
  headerText: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  content: {
    padding: 10
  },
  caret: {
    width: 20,
    height: 20,
    marginLeft: 8
  },
  description: {
    marginBottom: 20
  }
})

export default ExpandableSection

import React from 'react'
import { Pressable, StyleSheet, Text } from 'react-native'
import { colors } from '../colors'

type TagProps = {
  text: string
  onPress: () => void
}

export const Tag: React.FC<TagProps> = ({ text, onPress }) => {
  const trimmedText = text.length > 15 ? `${text.substring(0, 15)}...` : text

  if (!text) {
    return null
  }
  return (
    <Pressable style={styles.tag} onPress={onPress}>
      <Text style={styles.tagText}>{trimmedText}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  tag: {
    backgroundColor: colors.surface.accent,
    borderRadius: 15,
    paddingVertical: 5,
    paddingHorizontal: 10,
    alignSelf: 'flex-start'
  },
  tagText: {
    color: '#fff',
    fontSize: 14
  }
})

export default Tag

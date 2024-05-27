import { StatusBar } from 'expo-status-bar'
import { ScrollView, StyleSheet, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { colors } from './ds/colors'
import { Text } from './ds/components/Text'
import ExpandableSection from './ds/components/ExpandableSection'
import Tag from './ds/components/Tag'
import mockData from './data/mock.json'

export const Screen1: React.FC<{}> = () => {
  const { section, sectionWithDescription } = mockData
  const insets = useSafeAreaInsets()

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.surface.primary
      }}
    >
      <StatusBar style='light' />
      <ScrollView
        style={{
          flex: 1
        }}
        alwaysBounceVertical={false}
        contentContainerStyle={{
          paddingTop: insets.top,
          paddingBottom: insets.bottom
        }}
      >
        <Text typeface='H4'>Hello</Text>
        <ExpandableSection title={section.title}>
          <View style={styles.tags}>
            {sectionWithDescription.tags.map((tag, index) => (
              <Tag
                key={index}
                text={tag}
                onPress={() => {
                  alert(tag)
                }}
              />
            ))}
          </View>
        </ExpandableSection>
        <ExpandableSection
          title={sectionWithDescription.title}
          description={sectionWithDescription.description}
        >
          <View style={styles.tags}>
            {sectionWithDescription.tags.map((tag, index) => (
              <Tag
                key={index}
                text={tag}
                onPress={() => {
                  alert(tag)
                }}
              />
            ))}
          </View>
        </ExpandableSection>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  text: {
    fontSize: 14
  },
  tags: {
    flex: 1,
    flexDirection: 'row',
    gap: 10,
    flexWrap: 'wrap',
    marginTop: 10
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    margin: 10
  }
})
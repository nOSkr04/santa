import { StyleSheet, Text, View } from 'react-native'
import React, { memo } from 'react'

const DrawerContent = memo(() => {
    return (
      <View>
        <Text>DrawerContent</Text>
      </View>
    )
  })

  DrawerContent.displayName="DrawerContent"

export {DrawerContent}

const styles = StyleSheet.create({})
import React from 'react';
import { Text } from '@gluestack-ui/themed';
import { View, StyleSheet } from 'react-native';

const QuizScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Quiz Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default QuizScreen;
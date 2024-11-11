import { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native-web'

export default class Post extends Component {
  render() {
    return (
      <View style ={styles.container}>
      <Text>Post</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
  },
});
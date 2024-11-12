import React, { Component } from "react";
import { Text, View, FlatList, StyleSheet, Button } from "react-native";
import Post from "../components/Post";
import { auth, db } from "../firebase/config";

export default class HomeMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
      logueado: false,
    };
  }

  componentDidMount() {
    
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ logueado: true });
        
        db.collection("posts").onSnapshot((docs) => {
          let posts = [];
          docs.forEach((doc) => {
            posts.push({ id: doc.id, data: doc.data() });
          });
          this.setState({ posts: posts });
        });
      } else {
        this.setState({ logueado: false });
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.logueado ? (
          <>
            <Text>Home</Text>
            <View style={styles.postContainer}>
              {this.state.posts.length != 0 && (
                <FlatList
                  data={this.state.posts}
                  keyExtractor={(post) => post.id}
                  renderItem={({ item }) => (
                    <Post
                      content={item.data.msg}
                      userName={item.data.user}
                      likes={`${item.data.likes}`}
                    />
                  )}
                />
              )}
            </View>
          </>
        ) : (
          <>
            <Text>Bienvenido a la app</Text>
            <Button title="Login" onPress={() => this.props.navigation.navigate("Login")} />
            <Button title="Register" onPress={() => this.props.navigation.navigate("Register")} />
          </>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  postContainer: {
    flex: 1,
    flexDirection: "row",
    width: "90%",
  },
});

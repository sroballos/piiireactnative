import { Component } from "react";
import { Text, View, FlatList } from "react-native-web";
import Post from "../components/Post";
import { auth, db } from "../firebase/config";

export default class HomeMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
    };
  }

  componentDidMount() {
    db.collection("posts").onSnapshot((docs) => {
      let posts = [];
      docs.forEach((doc) => {
        posts.push({ id: doc.id, data: doc.data() });
      });
      console.log(posts);
      this.setState({
        posts: posts,
      });
    });
  }

  render() {
    return (
      <View>
        <Text>Home</Text>
        <Post />
        {this.state.posts.length != 0 && (
          <FlatList
            data={this.state.posts}
            keyExtractor={(post) => post.id}
            renderItem={({ item }) => <Text>{item.data.msg}</Text>}
          />
        )}
      </View>
    );
  }
}

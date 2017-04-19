import React, { Component } from "react";
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView,
  Image,
  TouchableOpacity
} from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import MangaItem from '../MangaNotifier/components/manga-item';

const gradientColorCode = ['#61a1ff', '#c821ff', '#61a1ff'];

export default class MangaNotifier extends Component {
  getMangaList() {
    let search = "https://doodle-manga-scraper.p.mashape.com/mangareader.net/search?&cover=1&info=1&l=10&q=";
    let fullList = "https://doodle-manga-scraper.p.mashape.com/mangareader.net?cover=1&info=1"
    return fetch(
      fullList,
      {
        headers: {
          "X-Mashape-Key": "4DqElW2NGYmshT05MZX7HAf0vFKop1mGedpjsnNT6FIF5yPHyk",
          Accept: "text/json"
        }
      }
    ).then(result => result.json())
      .then(result => {
        const ds = new ListView.DataSource({
          rowHasChanged: (r1, r2) => r1 !== r2
        });
        this.setState({
          dataSource: ds.cloneWithRows(
            result.map(item => {
              item.cover = item.cover.replace("http", "https");
              if (item.info) {
                item.info = `${item.info.substring(0, 90)}...`;
              }
              return item;
          })),
          loading: false
        });
      }).catch(error => {
        console.warn(error);
      });
  }

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      dataSource: []
    };
  }

  componentDidMount() {
    this.getMangaList();
  }

  render() {
    if (this.state.loading) {
      return (
         <LinearGradient start={{x: 0.0, y: 0.1}} end={{x: 0.1, y: 1.0}} colors={gradientColorCode} style={styles.startup}>
           <View>
            <Text style={styles.app_name}>
              Manga Notifier
            </Text>
            <Text style={{ fontSize: 16, color: "#fff", backgroundColor: "transparent", fontWeight: "300", textAlign: "center" }}>
              Loading . . .
            </Text>
          </View>
        </LinearGradient>
      );
    } else {
      return (
        <LinearGradient start={{x: 0.0, y: 0.15}} end={{x: 0.2, y: 1.0}} colors={gradientColorCode}>
          <View>
            <Text style={styles.app_header}>
              Manga Notifier
            </Text>
            <ListView
              style={styles.mangaitems_container}
              dataSource={this.state.dataSource}
              renderRow={data => (
                <MangaItem data={data} />
              )}
            />
          </View>
        </LinearGradient>
      );
    }
  }
}

const styles = StyleSheet.create({
  startup: {
    flex: 1,
    justifyContent: "center", 
    alignItems: "center"
  },

  app_header: {
    backgroundColor: 'transparent',
    padding: 20,
    textAlign: "center",
    color: "#fff" ,
    fontSize: 25,
    fontWeight: "500",
  },

  app_name: {
    backgroundColor: 'transparent',
    textAlign: "center",
    color: "#fff" ,
    fontSize: 25,
    fontWeight: "500",
    marginBottom: 10
  },

  mangaitems_container: {
    marginLeft: 10,
    backgroundColor: "transparent",
  }
});

AppRegistry.registerComponent("MangaNotifier", () => MangaNotifier);

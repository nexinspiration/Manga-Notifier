import React, { Component } from "react";
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView,
  Image
} from "react-native";
import LinearGradient from 'react-native-linear-gradient';

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
         <LinearGradient start={{x: 0.0, y: 0.1}} end={{x: 0.1, y: 1.0}} colors={['#61a1ff', '#c821ff', '#61a1ff']} style={styles.startup}>
           <View>
            <Text style={styles.app_name}>
              Manga Notifier
            </Text>
            <Text style={{ fontSize: 16, color: "#fff", backgroundColor: "transparent", fontWeight: "300", textAlign: "center" }}>Loading . . .</Text>
          </View>
        </LinearGradient>
      );
    } else {
      return (
        <LinearGradient start={{x: 0.0, y: 0.15}} end={{x: 0.2, y: 1.0}} colors={['#61a1ff', '#c821ff', '#61a1ff']}>
          <View>
            <Text style={styles.app_header}>
              Manga Notifier
            </Text>
            <ListView
              style={styles.lineitems_container}
              dataSource={this.state.dataSource}
              renderRow={data => (
                <View style={styles.lineitem}>
                  <Image
                    style={styles.lineitem_image}
                    source={{ uri: data.cover, cache: "force-cache" }}
                  />
                  <View style={styles.lineitem_data}>
                    <Text style={styles.lineitem_title}>{data.name}</Text>
                    <Text style={styles.lineitem_info}>{data.info}</Text>
                  </View>
                </View>
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
    justifyContent: "space-around", 
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

  lineitems_container: {
    marginLeft: 10,
    backgroundColor: "transparent",
  },

  lineitem: {
    flex: 1,
    padding: 10,
    marginBottom: 20,
    flexDirection: "row",
  },

  lineitem_image: {
    height: 50,
    width: 50,
    padding: 10,
  },

  lineitem_data: {
    paddingLeft: 10,
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },

  lineitem_title: {
    fontWeight: "600",
    color: "#fff",
    fontSize: 14,
    flexWrap: "wrap"
  },

  lineitem_info: {
    paddingTop: 5,
    fontSize: 10,
    color: "#fff",
  }
});

AppRegistry.registerComponent("MangaNotifier", () => MangaNotifier);

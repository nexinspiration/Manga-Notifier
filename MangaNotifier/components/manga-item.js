import React, { Component } from "react";

import { TouchableOpacity, Image, View, Text, StyleSheet } from "react-native";

export default class MangaItem extends Component {
  render() {
    return (
      <TouchableOpacity style={styles.container} onPress={this._selectManga}>
        <Image
          style={styles.cover}
          source={{ uri: this.props.data.cover, cache: "force-cache" }}
        />
        <View style={styles.info_container}>
          <Text style={styles.title}>{this.props.data.name}</Text>
          <Text style={styles.info}>{this.props.data.info}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginBottom: 20,
    flexDirection: "row"
  },

  cover: {
    height: 50,
    width: 50,
    padding: 10,
  },

  info_container: {
    flex: 1,
    paddingLeft: 10,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start'
  },

  title: {
    fontWeight: "600",
    color: "#fff",
    fontSize: 14,
    flexWrap: "wrap"
  },

  info: {
    paddingTop: 5,
    fontSize: 10,
    color: "#fff",
  }
});
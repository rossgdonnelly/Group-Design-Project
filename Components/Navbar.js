import React, { Component, useState, useContext } from "react";
import {
  StyleSheet,
  View,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import {
  Card,
  List,
  Text,
  ListItem,
  Icon,
  Button,
  CheckBox,
  Divider,
} from "@ui-kitten/components";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { SelectList } from "react-native-dropdown-select-list";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";

const Navbar = ({ route, navigation }) => {
  const { userID } = route.params;

  const [starred, setStarred] = React.useState(false);
  const navigateAddDeal = () => {
    navigation.navigate("AddDeal", { userID: userID });
  };
  const navigateProfile = () => {
    navigation.navigate("Profile", { userID: userID });
  };
  const navigateMap = () => {
    navigation.navigate("MapPage", { userID: userID });
  };
  const navigateSaved = () => {
    navigation.navigate("SavedDeals", { userID: userID });
  };
  return (
    <>
      <View style={styles.containernav}>
        <View style={styles.rowContainer}>
         
        </View>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  container: {},
  contentContainer: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  mainContainer: {
    flex: 1,
    paddingTop: 40,
  },
  textStyle: {
    alignSelf: "center",
    fontSize: 20,
  },
  iconStyle: {
    alignSelf: "center",
    fontSize: 70,
    color: "#7B4900",
    opacity: 1,
  },
  containernav: {
    height: 200,
    opacity: 0.8,
    padding: 0,
    flex: 0.12,
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  item: {
    marginVertical: 4,
  },
  buttonStyle: {
    alignSelf: "center",
    width: 80,
    height: 250,
    margin: 10,
    backgroundColor: "#F1C200",
    padding: 5,
    border: 0,
    borderRadius: 5,
    textAlign: "center",
    justifyContent: "space-between",
  },
  icon: {
    width: 32,
    height: 32,
  },
});

export default Navbar;

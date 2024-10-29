import React from "react";
import { View, StyleSheet } from "react-native";
import UserHeader from "./parts/UserHeader";
import ReceiveTipsCard from "./parts/ReceiveTipsCard";
import TipsBanner from "./parts/TipsBanner";

const UserScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <UserHeader />
      <ReceiveTipsCard/>
      <View style={styles.tipwrapper}>
      <TipsBanner />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#fff",
    width:'100%'
  },
  tipwrapper:{
    flex: 1,
    justifyContent: 'flex-end',
  }
});

export default UserScreen;

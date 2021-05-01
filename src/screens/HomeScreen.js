import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import "react-native-gesture-handler";
import {
  StyleSheet,
  Text,
  View,
  Animated,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import { useFonts } from "expo-font";
import Constants from "expo-constants";

//import Button from './src/components/Button';
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const statusBarHeight = Constants.statusBarHeight;

const HomeScreen = () => {
  const [minute, setMinute] = useState(0.1);
  const [playing, setPlaying] = useState(false);
  const [start, setStart] = useState(false);
  const [key, setKey] = useState(0);
  const [complated, setComplated] = useState(0);
  const [notcomplated, setNotComplated] = useState(0);

  let [fontsLoaded] = useFonts({
    "Merriweather-Black": require("../../assets/fonts/Merriweather-Black.ttf"),
    "Merriweather-Bold": require("../../assets/fonts/Merriweather-Bold.ttf"),
  });

  const Button = ({ title, onPress }) => {
    return (
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.title}>{title}</Text>
      </TouchableOpacity>
    );
  };

  console.log(minute);

  useEffect(() => {}, [minute]);

  const children = ({ remainingTime }) => {
    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;

    return `${minutes < 10 ? "0" + minutes : minutes} : ${
      seconds < 10 ? "0" + seconds : seconds
    }`;
  };

  const onComplete = () => {
    setPlaying(false);
    setStart(false);
    setMinute(1);
    setKey(key + 1);
    setComplated(complated + 1);
    return [true, 1500]; // repeat animation in 1.5 seconds
  };

  const onRefresh = () => {
    setPlaying(false);
    setStart(false);
    setMinute(0.1);
    setKey(key + 1);
  };
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text style={{ fontSize: 28, fontFamily: "Merriweather-Bold" }}>
        Pomodoro Timer
      </Text>
      <Text
        style={{
          marginVertical: 20,
          marginTop: 30,
          fontSize: 20,
          fontFamily: "Merriweather-Bold",
        }}
      >
        Complated activities: {complated}
      </Text>

      <View style={styles.countDownContainer}>
        <CountdownCircleTimer
          key={key}
          onComplete={() => onComplete()}
          isPlaying={playing}
          duration={minute * 60}
          //initialRemainingTime={15}
          colors={[["#ee5436", 0.4]]}
        >
          {({ remainingTime }) => (
            <>
              <Animated.Text
                style={{
                  color: "#031b44",
                  fontWeight: "bold",
                  fontSize: 32,
                  fontFamily: "Merriweather-Bold",
                }}
              >
                {children({ remainingTime })}
              </Animated.Text>
            </>
          )}
        </CountdownCircleTimer>
      </View>
      <View style={{ flexDirection: "row", margin: 10, padding: 10 }}>
        {start ? (
          <>
            <Button
              onPress={() => onRefresh()}
              title="Reset"
              style={{ margin: 10 }}
            />
            {playing ? (
              <Button
                onPress={() => setPlaying(false)}
                title="Pause"
                style={{ margin: 10 }}
              />
            ) : (
              <Button
                onPress={() => setPlaying(true)}
                title="Resume"
                style={{ margin: 10 }}
              />
            )}
          </>
        ) : (
          <>
            <Button
              onPress={() => {
                setPlaying(true);
                setStart(true);
              }}
              title="Start"
              style={{ margin: 10 }}
            />
          </>
        )}
      </View>
      <View style={styles.tasksContainer}>
        <Text>All Tasks</Text>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: "#114e60",
    alignItems: "center",
    //marginTop: windowHeight * 0.05,
    paddingTop: statusBarHeight,
  },

  button: {
    borderWidth: 2,
    margin: 10,
    borderRadius: 10,
    width: windowWidth * 0.3,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    backgroundColor: "#fff",
    borderColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.43,
    shadowRadius: 9.51,
    elevation: 15,
  },
  title: {
    fontSize: 20,
    fontFamily: "Merriweather-Bold",
  },
  countDownContainer: {
    borderWidth: 1,
    width: windowWidth * 0.8,
    backgroundColor: "#fff",
    borderColor: "#fff",
    paddingVertical: 20,
    alignItems: "center",
    borderRadius: 40,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.43,
    shadowRadius: 9.51,
    elevation: 15,
  },
});

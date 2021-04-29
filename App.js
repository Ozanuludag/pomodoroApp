import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Animated, Button } from "react-native";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";

export default function App() {
  const [minute, setMinute] = useState(0.1);
  const [playing, setPlaying] = useState(false);
  const [start, setStart] = useState(false);
  const [key, setKey] = useState(0);
  const [complated, setComplated] = useState(0);
  const [notcomplated, setNotComplated] = useState(0);
  console.log(minute);

  useEffect(() => {}, [minute]);

  const children = ({ remainingTime }) => {
    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;

    return `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
  };

  const onComplete = () => {
    setPlaying(false);
    setStart(false);
    setMinute(1);
    setKey(key+1);
    setComplated(complated+1)
    return [true, 1500]; // repeat animation in 1.5 seconds
  };

  const onRefresh = () => {
    setPlaying(false);
    setStart(false);
    setMinute(5);
    setKey(key+1);
    
  }

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 32 }}>Pomodoro App</Text>
      <Text style={{marginVertical:20, fontSize:24}}>Complated activities: {complated}</Text>
      <CountdownCircleTimer
        key={key}
        onComplete={() => onComplete()}
        isPlaying={playing}
        duration={minute * 60}
        //initialRemainingTime={15}
        colors={[
          ["#004777", 0.4],
          ["#F7B801", 0.4],
          ["#A30000", 0.2],
        ]}
      >
        {({ remainingTime, animatedColor }) => (
          <>
            <Animated.Text style={{ color: animatedColor, fontSize: 30 }}>
              {children({ remainingTime })}
            </Animated.Text>
          </>
        )}
      </CountdownCircleTimer>
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
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

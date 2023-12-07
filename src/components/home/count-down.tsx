import { StyleSheet, Text,  } from "react-native";
import React, { memo, useCallback, useEffect, useState } from "react";
import { Colors } from "../../constants/colors";

const CountDown = memo(({ targetDateTime }: {targetDateTime: Date}) => {
    const calculateTimeRemaining = useCallback(() => {
      const now = new Date();
      const targetDate = new Date(targetDateTime);
      const difference = targetDate - now;
  
      if (difference <= 0) {
        // Target time has passed, handle accordingly
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }
  
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);
  
      return { days, hours, minutes, seconds };
    }, [targetDateTime]);
    
      const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining);
    
      useEffect(() => {
        const intervalId = setInterval(() => {
          setTimeRemaining(calculateTimeRemaining);
        }, 1000);
    
        // Clean up the interval when the component unmounts
        return () => clearInterval(intervalId);
      }, [calculateTimeRemaining]);
    
      const { days, hours, minutes, seconds } = timeRemaining;
    
      return (
        <Text style={styles.title}>{`${days} өдөр ${hours} цаг ${minutes} мин ${seconds}с`}</Text>
      );
  });

  CountDown.displayName="CountDown";

export { CountDown };

const styles = StyleSheet.create({
    title: {
        fontFamily: "MonBold",
        fontSize  : 18,
        textAlign : "center",
        color     : Colors.white,
        position  : "absolute",
        zIndex    : 2,
        top       : 40,
        left      : 44
    }
});
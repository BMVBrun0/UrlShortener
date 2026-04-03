import React from "react";
import { Animated, Easing, StyleSheet, View } from "react-native";
import { colors } from "../../theme/colors";

type Props = {
  size?: number;
  strokeWidth?: number;
};

export const LoadingRing: React.FC<Props> = ({
  size = 20,
  strokeWidth = 3
}) => {
  const rotate = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.loop(
      Animated.timing(rotate, {
        toValue: 1,
        duration: 900,
        easing: Easing.linear,
        useNativeDriver: true
      })
    ).start();
  }, [rotate]);

  const spin = rotate.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"]
  });

  return (
    <Animated.View
      style={[
        styles.ring,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          borderWidth: strokeWidth,
          borderTopColor: colors.nubankPurple,
          borderRightColor: colors.nubankPurple,
          borderBottomColor: "#E0E0E0",
          borderLeftColor: "#E0E0E0",
          transform: [{ rotate: spin }]
        }
      ]}
    />
  );
};

const styles = StyleSheet.create({
  ring: {
    borderColor: "#E0E0E0"
  }
});

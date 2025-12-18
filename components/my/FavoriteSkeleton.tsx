import { useRouter } from "expo-router";
import React, { useEffect, useRef } from "react";
import {
  Animated,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { moderateScale } from "react-native-size-matters";

export default function FavoriteSkeleton() {
  const router = useRouter();
  const shimmerAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(shimmerAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(shimmerAnim, {
          toValue: 0,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [shimmerAnim]);

  const opacity = shimmerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.4, 1],
  });

  const renderSkeletonCard = () => (
    <View style={styles.card}>
      <View style={styles.quoteContainer}>
        <Animated.View
          style={[styles.skeletonLine, { width: moderateScale(260), opacity }]}
        />
        <Animated.View
          style={[
            styles.skeletonLine,
            {
              width: moderateScale(260),
              marginTop: moderateScale(18),
              opacity,
            },
          ]}
        />
        <Animated.View
          style={[
            styles.skeletonLine,
            {
              width: moderateScale(180),
              height: moderateScale(18),
              marginTop: moderateScale(22),
              opacity,
            },
          ]}
        />
      </View>
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Due card preferiti */}
      {[0, 1].map((_, index) => (
        <React.Fragment key={index}>{renderSkeletonCard()}</React.Fragment>
      ))}

      {/* bottone aggiungi */}
      <View style={styles.messageContainer}>
        <TouchableOpacity
          style={styles.buttonAdd}
          onPress={() => router.push("/")}
        >
          <Text style={styles.textAdd}>Aggiungi Citazione!</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: moderateScale(10),
  },
  card: {
    marginBottom: moderateScale(12),
    width: moderateScale(340),
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  quoteContainer: {
    backgroundColor: "#999999",
    borderRadius: moderateScale(18),
    padding: moderateScale(20),
    alignItems: "center",
    width: moderateScale(340),
    minHeight: moderateScale(120),
    justifyContent: "center",
    marginBottom: moderateScale(10),
  },
  skeletonLine: {
    height: moderateScale(22),
    borderRadius: moderateScale(8),
    backgroundColor: "#e6e6e6",
  },
  messageContainer: {
    marginTop: moderateScale(20),
    width: moderateScale(340),
    alignItems: "center",
    justifyContent: "center",
  },
  buttonAdd: {
    backgroundColor: "#43aa8b",
    borderRadius: moderateScale(24),
    paddingVertical: moderateScale(14),
    paddingHorizontal: moderateScale(32),
    alignItems: "center",
    justifyContent: "center",
    marginVertical: moderateScale(18),
    marginHorizontal: moderateScale(24),
    shadowColor: "#22223b",
    shadowOffset: { width: 0, height: moderateScale(2) },
    shadowOpacity: 0.12,
    shadowRadius: moderateScale(6),
    elevation: 3,
    borderWidth: 1,
    borderColor: "#ececec",
  },
  textAdd: {
    color: "#fff",
    fontSize: moderateScale(18),
    fontWeight: "700",
    letterSpacing: 0.5,
    textTransform: "uppercase",
    textAlign: "center",
  },
});

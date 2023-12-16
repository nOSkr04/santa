import { Dimensions, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import React, { memo, useCallback } from "react";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { Colors } from "../../constants/colors";
import { useNavigation } from "@react-navigation/native";
import { NavigationRoutes } from "../../navigation/types";
import Animated, { useAnimatedStyle, withTiming } from "react-native-reanimated";
import { SingleLoader } from "../common/solo-loader";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
const width = Dimensions.get("window").width;

export type ISignUpForm = {
  phone: string;
  privacy: boolean;
}

type Props = {
  control: Control<ISignUpForm, any>;
  errors: FieldErrors<ISignUpForm>;
  onSubmit: any
  loading: boolean
}

const SignUpForm = memo(({ control, errors, onSubmit, loading }: Props) => {

  const navigation = useNavigation();

  const sf = useSafeAreaInsets();

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: loading ? withTiming(0.5, {
        duration: 200,
      }) : withTiming(1, {
        duration: 200,

      }),
    };
  });

  const top = useCallback(() => {
    return {
      top: sf.top + 10
    };
  }, [sf.top]);

  return (
    <>
      <TouchableOpacity onPress={() => navigation.goBack()} style={[styles.backButton, top()]}><AntDesign color={Colors.white} name="left" size={24} /></TouchableOpacity>
      <View
        style={styles.root}
      >

        <View style={styles.h24} />
        <View style={styles.rowLabel}>
          <Text style={styles.label}>Утас</Text>
        </View>
        <Controller
          control={control}
          name="phone"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              keyboardType='number-pad'
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              placeholder="Утасны дугаар"
              style={styles.input}
              value={value}
            />
          )}
          rules={{ required: "Заавал бөглөнө" }}
        />
        {errors.phone &&
          <Text style={styles.errorText}>{errors.phone.message}</Text>
        }
        <Controller
          control={control}
          name="privacy"
          render={({ field: { onChange, value } }) => (
            <Pressable onPress={() => onChange(!value)} style={styles.privacy} >
              <Text style={styles.privacyTitle}>Үйлчилгээний нөхцөл </Text>
              <Text onPress={() => navigation.navigate(NavigationRoutes.PrivacyScreen)} style={[styles.privacyTitle, styles.black]}>зөвшөөрөх</Text>
              <View style={styles.w5} />
              {!value ? <MaterialIcons color={Colors.white} name="check-box-outline-blank" size={24} /> : <MaterialIcons color={Colors.white} name="check-box" size={24} />}
            </Pressable>
          )}
          rules={{ required: "Үйлчилгээний нөхцөл заавал зөвшөөрнө үү" }}
        />
        {errors.privacy &&
          <Text style={styles.errorText}>{errors.privacy.message}</Text>
        }

        <View style={styles.h32} />
        <Animated.View style={animatedStyle}>
          <TouchableOpacity disabled={loading} onPress={onSubmit} style={styles.button}>
            {loading ? <SingleLoader /> : <Text style={styles.buttonLabel}>Бүртгүүлэх</Text>}
          </TouchableOpacity>
        </Animated.View>
        <View style={styles.h24} />
      </View>
    </>

  );
});

SignUpForm.displayName = "SignUpForm";

export { SignUpForm };

const styles = StyleSheet.create({
  root: {
    width          : width - 46,
    backgroundColor: Colors.rgbaBg,
    borderRadius   : 44,
    paddingVertical: 24
  },
  input: {
    backgroundColor  : Colors.white,
    borderRadius     : 10,
    marginHorizontal : 24,
    marginTop        : 10,
    paddingVertical  : 14,
    paddingHorizontal: 8
  },
  rowLabel: {
    flexDirection   : "row",
    alignItems      : "center",
    justifyContent  : "space-between",
    marginHorizontal: 24
  },
  errorText: {
    color     : Colors.danger2,
    fontSize  : 14,
    fontFamily: "MonMedium",
    marginTop : 8,
    marginLeft: 24
  },
  label: {
    fontFamily: "MonMedium",
    fontSize  : 14,
    color     : Colors.white,

  },
  button: {
    marginHorizontal: 24,
    alignItems      : "center",
    justifyContent  : "center",
    backgroundColor : Colors.primary,
    borderRadius    : 10
  },
  h32: {
    height: 32
  },
  buttonLabel: {
    fontSize       : 16,
    fontFamily     : "MonBold",
    color          : Colors.white,
    paddingVertical: 12,
  },

  h24: {
    height: 24
  },
  backButton: {
    padding : 16,
    position: "absolute",
    left    : 10
  },
  privacy: {
    flexDirection   : "row",
    alignItems      : "center",
    marginHorizontal: 20,
    marginTop       : 10,
    width           : "90%",
  },
  w5: {
    width: 5
  },
  privacyTitle: {
    fontSize       : 14,
    fontFamily     : "MonMedium",
    color          : Colors.white,
    paddingVertical: 4,
    paddingLeft    : 4
  },
  black: {
    color     : Colors.white,
    fontFamily: "MonBold",
    padding   : 4
  }
});
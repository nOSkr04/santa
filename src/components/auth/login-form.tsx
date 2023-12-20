import { Dimensions, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import React, { memo } from "react";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { Colors } from "../../constants/colors";
import { useNavigation } from "@react-navigation/native";
import { NavigationRoutes } from "../../navigation/types";
import Animated, { useAnimatedStyle, withTiming } from "react-native-reanimated";
import { Loading } from "../common/loading";

const width = Dimensions.get("window").width;

export type ILoginForm = {
  phone: string;
}

type Props = {
  control: Control<ILoginForm, any>;
  errors: FieldErrors<ILoginForm>;
  onSubmit: any;
  loading: boolean
}

const LoginForm = memo(({ control, errors, onSubmit, loading }: Props) => {
  const navigation = useNavigation();
  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: loading ? withTiming(0.5, {
        duration: 200,
      }) : withTiming(1, {
        duration: 200,

      }),
    };
  });
  return (
    <View
      style={styles.root}
    >
      <View style={styles.h24} />
      <Text style={styles.title}>Шинэ оны мэнд хүргэе!.</Text>
      <Text style={styles.description}>Хүсэн хүлээсэн шинэ он хаяанд ирж Santa.mn хүн бүрд бэлэгтэй өндөг авчирлаа.
      </Text>
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
      <View style={styles.h32} />
      <TouchableOpacity disabled={loading} onPress={onSubmit} style={styles.button}>
        <Animated.View style={animatedStyle}>
          {loading ?  <Loading height={18} width={18} /> : <Text style={styles.buttonLabel}>Нэвтрэх  </Text>}
        </Animated.View>
      </TouchableOpacity>
      <Text style={styles.description2}>Бүртгэлгүй бол бүртгүүлэх</Text>
    
      <TouchableOpacity disabled={loading} onPress={() => navigation.navigate(NavigationRoutes.SignUpScreen)} style={styles.button} >
        <Animated.View style={animatedStyle}>
          {loading ?  <Loading height={18} width={18} /> : <Text style={styles.buttonLabel}>Бүртгүүлэх  </Text>}
        </Animated.View>
      </TouchableOpacity>
      <View style={styles.h24} />
    </View>
  );
});

LoginForm.displayName = "LoginForm";

export { LoginForm };

const styles = StyleSheet.create({
  root: {
    width          : width - 46,
    backgroundColor: Colors.rgbaBg,
    borderRadius   : 44,
  },
  title: {
    color           : Colors.white,
    fontFamily      : "MonBold",
    fontSize        : 18,
    textAlign       : "center",
    marginHorizontal: 24
  },
  description: {
    fontSize        : 14,
    fontFamily      : "MonMedium",
    lineHeight      : 21,
    color           : Colors.white80,
    textAlign       : "center",
    marginHorizontal: 36,
    marginTop       : 12,
    marginBottom    : 16
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
    borderRadius    : 10,
    flexDirection   : "row",
    paddingVertical : 4
  },
  h32: {
    height: 32
  },
  buttonLabel: {
    fontSize       : 16,
    fontFamily     : "MonBold",
    color          : Colors.white,
    paddingVertical: 8
  },
  description2: {
    fontSize        : 14,
    fontFamily      : "MonMedium",
    color           : Colors.white80,
    textAlign       : "center",
    marginHorizontal: 48,
    marginVertical  : 16
  },
  h24: {
    height: 24
  }
});
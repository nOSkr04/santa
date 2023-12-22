import React, { memo, useCallback } from "react";
import { Dimensions, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Control, Controller, FieldErrors,  UseFormSetValue, UseFormWatch } from "react-hook-form";
import AntDesign from "@expo/vector-icons/AntDesign";
import { IUser } from "../../interfaces/user";
import { Colors } from "../../constants/colors";
export type UserEggForm = {
  egg: number,
  message: string,
}

type Props = {
  onSubmit: (e?: React.BaseSyntheticEvent<object, any, any> | undefined) => Promise<void>;
  control: Control<UserEggForm, any>;
  errors: FieldErrors<UserEggForm>
  watch: UseFormWatch<UserEggForm>
  setValue: UseFormSetValue<UserEggForm>
  user: IUser
  detail: {
    phone: string;
    isUser: boolean;
  }
}

const width = Dimensions.get("window").width;

const EggForm = memo(({ onSubmit, control, errors,  watch, setValue, user, detail }: Props) => {
  const egg = watch("egg");
  const minusEgg = useCallback(() => {

    if (egg <= 1) {
      return;
    }
    setValue("egg", egg - 1);
  }, [egg, setValue]);

  const plusEgg = useCallback(() => {
    if ((user?.eggCount || 0) < egg) {
      return;
    }
    setValue("egg", egg + 1);
  }, [egg, setValue, user?.eggCount]);

  const setPlusButton = useCallback((plusEggs: string) => {
    if ((user?.eggCount || 0) < egg) {
      return setValue("egg", user.eggCount);
    }
    const plusEgg = parseInt(plusEggs, 10);
    if (!egg) {
      setValue("egg", plusEgg);
      return;
    }
    const sumEgg = egg + plusEgg;
    setValue("egg", sumEgg);
  }, [egg, setValue, user.eggCount]);

  return (
    <View style={styles.contentContainer}>
      <Text style={styles.description}>{detail.phone} - дугаартай хэрэглэгчэд өндөг бэлэглэх</Text>
      <Text style={styles.eggTitle}>{egg} өндөг = {(egg * 20000 || 0).toLocaleString()} ₮</Text>
      <View style={styles.eggContainer}>
        <TouchableOpacity onPress={minusEgg} style={styles.sumButton}>
          <AntDesign color={Colors.white} name="minus" size={24} />
        </TouchableOpacity>
        <Controller
        control={control}
        name="egg"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
          keyboardType="numeric"
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            placeholder="Өндөг"
            placeholderTextColor={Colors.white40}
            style={styles.input}
            value={value.toLocaleString()}
          />
        )}
      />
        <TouchableOpacity onPress={plusEgg} style={styles.sumButton}>
          <AntDesign color={Colors.white} name="plus" size={24} />
        </TouchableOpacity>
      </View>
      <Text style={styles.messageLabel}>Хэлэх үг</Text>
      <Controller
        control={control}
        name="message"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            placeholder="Хэлэх үг"
            placeholderTextColor={Colors.white40}
            
            style={styles.messageInput}
            value={value}
          />
        )}
        rules={{ required: "Заавал бөглөнө" }}
      />
      {errors.message &&
        <Text style={styles.errorText}>{errors.message.message}</Text>
      }
      <View style={styles.buttonRow}>
        <TouchableOpacity onPress={() => setPlusButton("7")} style={styles.rowButton}>
          <Text style={styles.rowButtonTitle}>7 ширхэг</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setPlusButton("27")} style={styles.rowButton}>
          <Text style={styles.rowButtonTitle}>27 ширхэг</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setPlusButton("247")} style={styles.rowButton}>
          <Text style={styles.rowButtonTitle}>247 ширхэг</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={onSubmit} style={styles.submit}>
        <Text style={styles.primaryButton}>Илгээх</Text>
      </TouchableOpacity>
      <View style={styles.h32} />

    </View>
  );
});

EggForm.displayName = "EggForm";

export { EggForm };

const styles = StyleSheet.create({
  contentContainer: {
    backgroundColor: Colors.white,
    width,
    paddingVertical: 40,
  },
  eggTitle: {
    color         : Colors.black,
    fontFamily    : "MonBold",
    fontSize      : 20,
    textAlign     : "center",
    marginVertical: 20
  },
  eggContainer: {
    flexDirection   : "row",
    alignItems      : "center",
    justifyContent  : "space-between",
    marginHorizontal: 30
  },
  sumButton: {
    padding        : 8,
    backgroundColor: Colors.primary,
    borderRadius   : 8
  },
  input: {
    backgroundColor: Colors.primary,
    padding        : 12,
    borderRadius   : 8,
    width          : width / 2.2,
    color          : Colors.white,
    textAlign      : "center"
  },
  buttonRow: {
    flexDirection : "row",
    justifyContent: "space-around",
    alignItems    : "center",
    marginTop     : 28
  },
  rowButton: {
    borderRadius   : 8,
    padding        : 8,
    backgroundColor: Colors.white,
    borderWidth    : 1,
    borderColor    : Colors.black
  },
  rowButtonTitle: {
    fontSize  : 14,
    fontFamily: "MonSemiBold",
    color     : Colors.black,

  },
  submit: {
    borderRadius     : 8,
    padding          : 12,
    backgroundColor  : Colors.primary,
    alignSelf        : "flex-end",
    marginRight      : 15,
    marginTop        : 50,
    paddingHorizontal: 40,
    right            : 10
  },
  h32: {
    height: 32
  },

  primaryButton: {
    fontSize  : 14,
    fontFamily: "MonSemiBold",
    color     : Colors.white,
  },
  description: {
    fontFamily: "MonMedium",
    fontSize  : 12,
    color     : Colors.text2,
    textAlign : "center"
  },
  messageInput: {
    backgroundColor: Colors.primary,
    padding        : 12,
    borderRadius   : 8,
    width          : width - 56,
    color          : Colors.white,
    textAlign      : "center",
    alignSelf      : "center"
  },
  messageLabel: {
    fontFamily  : "MonMedium",
    fontSize    : 12,
    color       : Colors.text2,
    marginLeft  : 24,
    marginTop   : 16,
    marginBottom: 8,
  },
  errorText: {
    color     : Colors.danger2,
    fontSize  : 14,
    fontFamily: "MonMedium",
    marginTop : 8,
    marginLeft: 24
  },
});
import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { memo } from "react";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { Colors } from "../../constants/colors";

export type ILoginForm = {
  phone: string;
}

type Props = {
  control: Control<ILoginForm, any>;
  errors: FieldErrors<ILoginForm>
}

const LoginForm = memo(({ control, errors }: Props) => {
  return (
    <View>
      <View>
        <View style={styles.rowLabel}>
          <Text style={styles.label}>Утас</Text>
          {errors.phone &&
            <Text style={styles.errorText}>{errors.phone.message}</Text>
        }
        </View>
        <Controller
          control={control}
          name="phone"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              keyboardType='number-pad'
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              style={styles.input}
              value={value}
            />
          )}
          rules={{ required: "Заавал бөглөнө" }}
        />
      </View>
    </View>
  );
});

LoginForm.displayName = "LoginForm";

export { LoginForm };

const styles = StyleSheet.create({
  input: {
    backgroundColor  : Colors.white,
    borderRadius     : 10,
    marginHorizontal : 26,
    marginTop        : 10,
    paddingVertical  : 8,
    paddingHorizontal: 8
  },
  errorText: {
    color      : Colors.danger,
    textAlign  : "right",
    marginRight: 26,
    fontSize   : 12,
  },
  label: {
    fontFamily: "MonMedium",
    fontSize  : 16,
    color     : Colors.black75,
    marginLeft: 26
  },
  rowLabel: {
    flexDirection : "row",
    alignItems    : "center",
    justifyContent: "space-between",
  }
});
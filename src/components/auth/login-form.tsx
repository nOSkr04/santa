import { StyleSheet, Text, TextInput, View } from 'react-native'
import React, { memo } from 'react'
import { Control, Controller, FieldErrors } from 'react-hook-form';
import { Colors } from '../../constants/colors';

export type ILoginForm = {
    phone: string;
    password: string;
}

type Props = {
    control: Control<ILoginForm, any>;
    errors: FieldErrors<ILoginForm>
}

const LoginForm = memo(({control, errors}: Props) => {
    return (
      <View>
        <View>
        <Text style={styles.label}>Утас</Text>
        <Controller
        control={control}
        name="phone"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            style={styles.input}
            value={value}
            keyboardType='number-pad'
          />
        )}
        rules={{ required: true,  }}
      />
      {errors.phone && 
      <Text style={styles.errorText}>{errors.phone.message}</Text>
      }
      </View>
      <View>
        <Text style={styles.label}>Нууц үг</Text>
        <Controller
        control={control}
        name="password"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            style={styles.input}
            value={value}
            secureTextEntry
          />
        )}
        rules={{ required: true,  }}
      />
      {errors.password && 
      <Text style={styles.errorText}>{errors.password.message}</Text>
      }
      </View>
      </View>
    )
  })

  LoginForm.displayName="LoginForm"

export {LoginForm}

const styles = StyleSheet.create({
    input:{
        borderWidth:1,
    },
    errorText:{
        color:Colors.danger
    },
    label:{

    }
})
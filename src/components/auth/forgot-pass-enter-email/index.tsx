// src/components/auth/forgot-pass-enter-email/index.tsx
import React from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import styles from './style';

const schema = z.object({
  email: z.string().email('Email không hợp lệ'),
});

type FormData = z.infer<typeof schema>;

interface EnterEmailScreenProps {
  onSubmit: (email: string) => void;
  isLoading: boolean;
  error: string | null;
}

const EnterEmailScreen: React.FC<EnterEmailScreenProps> = ({ onSubmit, isLoading, error }) => {
  const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const handleFormSubmit = (data: FormData) => {
    onSubmit(data.email);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nhập Email của bạn</Text>
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            value={value}
            onChangeText={onChange}
          />
        )}
      />
      {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}
      {error && <Text style={styles.errorText}>{error}</Text>}
      <TouchableOpacity 
        style={styles.button} 
        onPress={handleSubmit(handleFormSubmit)}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Gửi mã xác nhận</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default EnterEmailScreen;
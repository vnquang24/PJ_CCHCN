import React from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import styles from './style';

const schema = z.object({
  code: z.string().length(6, 'Mã xác nhận phải có 6 ký tự'),
});

type FormData = z.infer<typeof schema>;
interface VerifyCodeScreenProps {
    onSubmit: (code: string) => void;
    email: string;
    isLoading: boolean;
    error: string | null;
}

const VerifyCodeScreen: React.FC<VerifyCodeScreenProps> = ({ onSubmit, email, isLoading, error }) => {
  const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const handleFormSubmit = (data: FormData) => {
    onSubmit(data.code);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nhập mã xác nhận</Text>
      <Text style={styles.subtitle}>Mã xác nhận đã được gửi đến email: {email}</Text>
      <Controller
        control={control}
        name="code"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Mã xác nhận"
            keyboardType="number-pad"
            maxLength={6}
            value={value}
            onChangeText={onChange}
          />
        )}
      />
      {errors.code && <Text style={styles.errorText}>{errors.code.message}</Text>}
      {error && <Text style={styles.errorText}>{error}</Text>}
      <TouchableOpacity 
        style={styles.button} 
        onPress={handleSubmit(handleFormSubmit)}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Xác nhận</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default VerifyCodeScreen;
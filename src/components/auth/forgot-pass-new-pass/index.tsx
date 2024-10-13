import React from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import styles from './style';

const schema = z.object({
  password: z.string()
    .min(8, 'Mật khẩu phải có ít nhất 8 ký tự')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 
      'Mật khẩu phải chứa ít nhất một chữ hoa, một chữ thường, một số và một ký tự đặc biệt'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Mật khẩu không khớp",
  path: ["confirmPassword"],
});

type FormData = z.infer<typeof schema>;
interface NewPasswordScreenProps {
    onSubmit: (newPassword: string) => void;
    isLoading: boolean;
    error: string | null;
}

const NewPasswordScreen: React.FC<NewPasswordScreenProps> = ({ onSubmit, isLoading, error }) => {
  const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const handleFormSubmit = (data: FormData) => {
    onSubmit(data.password);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tạo mật khẩu mới</Text>
      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Mật khẩu mới"
            secureTextEntry
            value={value}
            onChangeText={onChange}
          />
        )}
      />
      {errors.password && <Text style={styles.errorText}>{errors.password.message}</Text>}
      <Controller
        control={control}
        name="confirmPassword"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Xác nhận mật khẩu"
            secureTextEntry
            value={value}
            onChangeText={onChange}
          />
        )}
      />
      {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword.message}</Text>}
      {error && <Text style={styles.errorText}>{error}</Text>}
      <TouchableOpacity 
        style={styles.button} 
        onPress={handleSubmit(handleFormSubmit)}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Cập nhật mật khẩu</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default NewPasswordScreen;
import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, Button, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import * as Yup from 'yup';
import styles from './style';

interface LoginFormProps {
  onSubmit: (email: string, password: string) => void;
}

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Email không hợp lệ').required('Email là bắt buộc'),
  password: Yup.string().min(8, 'Mật khẩu phải có ít nhất 8 ký tự').required('Mật khẩu là bắt buộc'),
});

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    validateForm();
  }, [email, password]);

  const validateForm = async () => {
    try {
      await validationSchema.validate({ email, password }, { abortEarly: false });
      setErrors({ email: '', password: '' });
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const newErrors = { email: '', password: '' };
        error.inner.forEach((err) => {
          if (err.path) {
            newErrors[err.path as keyof typeof newErrors] = err.message;
          }
        });
        setErrors(newErrors);
      }
    }
  };

  const handleSubmit = () => {
    if (!errors.email && !errors.password) {
      onSubmit(email, password);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đăng nhập</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}
      
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Mật khẩu"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity onPress={toggleShowPassword} style={styles.eyeIcon}>
          <Icon name={showPassword ? 'eye-off' : 'eye'} size={24} color="gray" />
        </TouchableOpacity>
      </View>
      {errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}
      
      <Button title="Đăng nhập" onPress={handleSubmit} />
    </View>
  );
};

export default LoginForm;
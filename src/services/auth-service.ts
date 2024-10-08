export const login = async (email: string, password: string): Promise<boolean> => {
  // Giả lập gọi API, luôn trả về true sau 1 giây
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 1000);
  });
};

export const sendResetPasswordEmail = async (email: string): Promise<boolean> => {
  // Giả lập gọi API, luôn trả về true sau 1 giây
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 1000);
  });
};

export const verifyResetCode = async (code: string): Promise<boolean> => {
  // Giả lập xác minh mã, chỉ chấp nhận mã '123456'
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(code === '123456');
    }, 1000);
  });
};

export const resetPassword = async (newPassword: string): Promise<boolean> => {
  // Giả lập đặt lại mật khẩu, luôn trả về true sau 1 giây
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 1000);
  });
};
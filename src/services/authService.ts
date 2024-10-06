export const login = async (email: string, password: string): Promise<boolean> => {
    // Giả lập gọi API, luôn trả về true sau 1 giây
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, 1000);
    });
  };
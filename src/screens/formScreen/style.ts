import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  mediaContent: {
    width: '100%',
    minHeight: 400, // Đảm bảo có đủ không gian để hiển thị ảnh
  },
  noMediaText: {
    marginBottom: 10,
    color: '#666',
  },
  webviewContainer: {
    width: '100%',
    height: height * 0.7, // Sử dụng 70% chiều cao màn hình
   // overflow: 'hidden', // Thêm dòng này
  },
});

export default styles;
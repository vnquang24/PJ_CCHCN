import { NavigationContainerRef } from '@react-navigation/native';
import { RootStackParamList } from '../types/navigation';

let navigator: NavigationContainerRef<RootStackParamList> | null = null;
// Biến này lưu trữ tham chiếu đến đối tượng NavigationContainerRef

// Nó được sử dụng để thực hiện các thao tác điều hướng trong ứng dụng
export function setNavigator(navigatorRef: NavigationContainerRef<RootStackParamList>) {
  navigator = navigatorRef;
}
// Hàm này được sử dụng để thực hiện điều hướng đến một màn hình cụ thể
export function navigate(name: keyof RootStackParamList, params?: any) {
  if (navigator) {
    navigator.navigate(name as any, params as any);
  }
}
// Hàm này được sử dụng để thực hiện điều hướng đến một màn hình cụ thể
export function goBack() {
  if (navigator) {
    navigator.goBack();
  }
}

export function canGoBack(): boolean {
  return navigator ? navigator.canGoBack() : false;
}

export function getCurrentRoute(): string | undefined {
  if (navigator) {
    const route = navigator.getCurrentRoute();
    return route?.name;
  }
  return undefined;
}
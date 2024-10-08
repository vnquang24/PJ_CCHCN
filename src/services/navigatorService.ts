import { NavigationContainerRef } from '@react-navigation/native';
import { RootStackParamList } from '../types/navigation';

let navigator: NavigationContainerRef<RootStackParamList> | null = null;

export function setNavigator(navigatorRef: NavigationContainerRef<RootStackParamList>) {
  navigator = navigatorRef;
}
export function navigate(name: keyof RootStackParamList, params?: any) {
  if (navigator) {
    navigator.navigate(name as any, params as any);
  }
}
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
import { Redirect } from "expo-router";
import { ImageBackground, Platform } from "react-native";
import { styles } from "@/styles/auth.styles";

export default function Index() {
  return <Redirect href="./(tabs)"></Redirect>;
}

import { Redirect } from "expo-router";
import { ImageBackground, Platform } from "react-native";
import { styles } from "@/styles/auth.styles";
import "react-native-reanimated";
import { useContext, useEffect, useState } from "react";
import { storage } from "../utils/storage";
import FavoritesContext from "../contexts/FavoritesContext";

export default function Index() {
  return <Redirect href="./(tabs)"></Redirect>;
}

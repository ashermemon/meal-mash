import { Redirect } from "expo-router";
import "react-native-reanimated";
import { shouldShowTutorial } from "@/utils/tutorial";

export default function Index() {
  return (
    <Redirect href={shouldShowTutorial() ? "/tutorial" : "./(tabs)"}></Redirect>
  );
}

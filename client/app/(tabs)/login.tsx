import {
  View,
  Text,
  TextInput,
  TouchableHighlight,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Switch,
  Dimensions,
} from "react-native";
import { useState, useCallback, useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import httpClient from "../httpClient";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState("");

  const logoutUser = async () => {
    try {
      await AsyncStorage.removeItem("token");
      setUser("none");
    } catch (error) {
      console.error("Failed to logout:", error);
    }
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
    setIsValid(validateEmail(value));
  };

  const registerUser = async () => {
    try {
      const resp = await httpClient.post("/register", {
        email,
        password,
      });
      // Store token for authenticated requests
      await AsyncStorage.setItem("token", resp.data.access_token);
      Alert.alert("Success", "Account created and logged in");
      setUser(resp.data);
      setIsSignup(false);
      setEmail("");
      setPassword("");
      setShowPassword(false);
    } catch (e: any) {
      if (e.message.includes("409")) {
        Alert.alert("Error", "This user already exists");
      } else {
        Alert.alert("Error", "Registration failed");
      }
    }
  };

  const logInUser = async () => {
    try {
      const resp = await httpClient.post("/login", {
        email,
        password,
      });
      await AsyncStorage.setItem("token", resp.data.access_token);
      setUser(resp.data);
      setIsLogin(false);
      setEmail("");
      setPassword("");
      setShowPassword(false);

      Alert.alert("Success", "Logged In");
    } catch (e: any) {
      //console.log(e.message);

      //kinda hacky solution here
      console.log(e.message);
      if (e.message == "Request failed with status code 401") {
        alert("Invalid Credentials");
      }
    }
  };

  const backButton = () => {
    setIsLogin(false);
    setIsSignup(false);
    setEmail("");
    setPassword("");
    setShowPassword(false);
  };

  useFocusEffect(
    useCallback(() => {
      const checkUser = async () => {
        try {
          const resp = await httpClient.get("/@me");
          setUser(resp.data);
        } catch (error: any) {
          console.log("Not authenticated:", error.message);
          setUser("none");
        }
      };

      checkUser();

      return () => {
        backButton();
      };
    }, [])
  );

  if (user != "none") {
    return (
      <View style={styles.container}>
        <Text>{user.email}</Text>

        <TouchableHighlight
          onPress={() => logoutUser()}
          underlayColor="#3f3f3f"
          style={styles.button}
        >
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableHighlight>
      </View>
    );
  }

  if (isLogin) {
    return (
      <View style={styles.container}>
        <TouchableHighlight
          onPress={() => backButton()}
          underlayColor="#3f3f3f"
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableHighlight>

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#aaa"
          onChangeText={handleEmailChange}
          value={email}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#aaa"
          secureTextEntry={!showPassword}
          onChangeText={setPassword}
          value={password}
        />

        <View style={styles.toggleContainer}>
          <Text style={styles.toggleLabel}>View Password</Text>
          <Switch value={showPassword} onValueChange={setShowPassword} />
        </View>

        {!isValid && (
          <Text style={styles.errorText}>Please enter a valid email</Text>
        )}

        <TouchableOpacity
          onPress={logInUser}
          disabled={!isValid}
          style={[styles.button, !isValid && styles.disabledButton]}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
    );
  } else if (isSignup) {
    return (
      <View style={styles.container}>
        <TouchableHighlight
          onPress={() => backButton()}
          underlayColor="#3f3f3f"
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableHighlight>

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#aaa"
          onChangeText={handleEmailChange}
          value={email}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#aaa"
          secureTextEntry={!showPassword}
          onChangeText={setPassword}
          value={password}
        />

        <View style={styles.toggleContainer}>
          <Text style={styles.toggleLabel}>View Password</Text>
          <Switch value={showPassword} onValueChange={setShowPassword} />
        </View>

        {!isValid && (
          <Text style={styles.errorText}>Please enter a valid email</Text>
        )}

        <TouchableOpacity
          onPress={registerUser}
          disabled={!isValid}
          style={[styles.button, !isValid && styles.disabledButton]}
        >
          <Text style={styles.buttonText}>Create Account</Text>
        </TouchableOpacity>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <TouchableHighlight
          onPress={() => setIsLogin(true)}
          underlayColor="#3f3f3f"
          style={styles.button}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableHighlight>

        <TouchableHighlight
          onPress={() => setIsSignup(true)}
          underlayColor="#3f3f3f"
          style={styles.button}
        >
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const { width } = Dimensions.get("window");
const isMobile = width < 500;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: isMobile ? 20 : 40,
  },
  button: {
    padding: 10,
    backgroundColor: "#1d1d1d",
    borderRadius: 5,
    width: 150,
    alignItems: "center",
    marginVertical: 5,
  },
  disabledButton: {
    backgroundColor: "#666",
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
  },
  backButton: {
    padding: 10,
    backgroundColor: "#1d1d1d",
    borderRadius: 50,
    width: 48,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    maxWidth: 400,
    padding: 15,
    backgroundColor: "#1d1d1d",
    color: "#fff",
    borderRadius: 5,
    marginBottom: 15,
  },
  toggleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  toggleLabel: {
    fontSize: 16,
    marginRight: 10,
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
});

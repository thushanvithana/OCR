import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  Button,
  Text,
  Alert,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import axios from "axios";

import { useNavigation } from "expo-router";

export default function TabOneScreen() {
  const navigation = useNavigation();

  const [formData, setFormData] = useState({
    pregnancies: "",
    glucose: "",
    bloodPressure: "",
    skinThickness: "",
    insulin: "",
    bmi: "",
    diabetesPedigree: "",
    age: "",
  });
  const [predValue, setPredValue] = useState(null);
  const [loading, setLoading] = useState(false);
  const [responseData, setResponseData] = useState(null);
  const handleInputChange = (name, value) => {
    // Remove any non-numeric characters from the input value
    const sanitizedValue = value.replace(/[^0-9.-]/g, "");

    // Check if the input value is a valid number (integer or float)
    const numericValue =
      sanitizedValue === "" ? "" : parseFloat(sanitizedValue);

    if (!isNaN(numericValue)) {
      setFormData({ ...formData, [name]: numericValue });
    }
  };

  useEffect(() => {
    console.log(formData); // Logging user input whenever it changes
  }, [formData]);

  const handleSubmit = async () => {
    setLoading(true);
    const formattedData = [
      formData.pregnancies,
      formData.glucose,
      formData.bloodPressure,
      formData.skinThickness,
      formData.insulin,
      formData.bmi,
      formData.diabetesPedigree,
      formData.age,
    ];
    try {
      const response = await axios.post(
        "http://172.28.27.255:5000/predict-diabetes",
        { data: formattedData }
      );
      console.log(response.data);
      setPredValue(response.data.prediction);
      setResponseData(response.data);
      
    } catch (error) {
      console.error("Error:", error);
      Alert.alert(
        "Error",
        "Failed to fetch data from server. Please check your network connection."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <View style={styles.container}>
        <Text style={styles.sectionTitle}>Enter Your Details </Text>
        <View style={styles.inputContainer}>
          <View>
            <Text style={styles.label}>Pregnancies</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Pregnancies"
              keyboardType="numeric"
              onChangeText={(text) => handleInputChange("pregnancies", text)}
              value={formData.pregnancies.toString()} // Convert number to string for TextInput value
            />
          </View>

          <View>
            <Text style={styles.label}>Glucose</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Glucose"
              keyboardType="numeric"
              onChangeText={(text) => handleInputChange("glucose", text)}
              value={formData.glucose.toString()} // Convert number to string for TextInput value
            />
          </View>

          <View>
            <Text style={styles.label}>Blood Pressure</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Blood Pressure"
              keyboardType="numeric"
              onChangeText={(text) => handleInputChange("bloodPressure", text)}
              value={formData.bloodPressure.toString()} // Convert number to string for TextInput value
            />
          </View>

          <View>
            <Text style={styles.label}>Skin Thickness</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Skin Thickness"
              keyboardType="numeric"
              onChangeText={(text) => handleInputChange("skinThickness", text)}
              value={formData.skinThickness} // Convert number to string for TextInput value
            />
          </View>

          <View>
            <Text style={styles.label}>Insulin</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Insulin"
              keyboardType="numeric"
              onChangeText={(text) => handleInputChange("insulin", text)}
              value={formData.insulin.toString()} // Convert number to string for TextInput value
            />
          </View>

          <View>
            <Text style={styles.label}>BMI</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter BMI"
              keyboardType="numeric"
              onChangeText={(text) => handleInputChange("bmi", text)}
              value={formData.bmi} // Convert number to string for TextInput value
            />
          </View>

          <View>
            <Text style={styles.label}>Diabetes Pedigree</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Diabetes Pedigree"
              keyboardType="numeric"
              onChangeText={(text) =>
                handleInputChange("diabetesPedigree", text)
              }
              value={formData.diabetesPedigree} // Convert number to string for TextInput value
            />
          </View>

          <View>
            <Text style={styles.label}>Age</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Age"
              keyboardType="numeric"
              onChangeText={(text) => handleInputChange("age", text)}
              value={formData.age.toString()} // Convert number to string for TextInput value
            />
          </View>
        </View>

        {loading && (
          <ActivityIndicator
            style={styles.loadingIndicator}
            size="large"
            color="#0000ff"
          />
        )}
        {responseData && (
    <Text style={styles.responseText}>
      Response Data: {JSON.stringify(responseData)}
    </Text>
  )}
        <View style={styles.buttonContainer}>
          <Button title="Predict" onPress={handleSubmit} />
        </View>





        
        
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#FFFFFF",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  inputContainer: {
    width: "100%",
    marginBottom: 20,
  },
  input: {
    height: 47,
    borderColor: "#F4F6F9",
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: "#F4F6F9",
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },

  label: {
    fontWeight: "bold",
    marginTop: 5,
    marginBottom: 5,
  },
  predictionText: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: "bold",
  },
  responseText: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  loadingIndicator: {
    position: "absolute",
    zIndex: 1,
  },
});

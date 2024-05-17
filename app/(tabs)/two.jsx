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
import ResultModal from "../modal2";
export default function TabTwoScreen() {
  const [gender, setGender] = useState("");
  const [diabetesType, setDiabetesType] = useState("Type 2");
  const [systolicBP, setSystolicBP] = useState("");
  const [diastolicBP, setDiastolicBP] = useState("");
  const [hbA1c, setHbA1c] = useState("");
  const [avgGlucose, setAvgGlucose] = useState("");
  const [diagnosisYear, setDiagnosisYear] = useState("");
  const [prediction, setPrediction] = useState("");
  const [form, setForm] = useState({
    "Diabetes Type": ["Type 2"],
  });

  useEffect(() => {
    console.log("Form Data:", {
      Gender: gender,
      "Diabetes Type": diabetesType,
      "Systolic BP": systolicBP,
      "Diastolic BP": diastolicBP,
      "HbA1c (mmol/mol)": hbA1c,
      "Estimated Avg Glucose (mg/dL)": avgGlucose,
      "Diagnosis Year": diagnosisYear,
    });
  }, [
    gender,
    diabetesType,
    systolicBP,
    diastolicBP,
    hbA1c,
    avgGlucose,
    diagnosisYear,
  ]);

  const handlePrediction = async () => {
    try {
      const formData = {
        Gender: [gender],
        "Diabetes Type": [diabetesType],
        "Systolic BP": [parseFloat(systolicBP)],
        "Diastolic BP": [parseFloat(diastolicBP)],
        "HbA1c (mmol/mol)": [parseFloat(hbA1c)],
        "Estimated Avg Glucose (mg/dL)": [parseFloat(avgGlucose)],
        "Diagnosis Year": [parseInt(diagnosisYear)],
      };
      console.log("Form Data:", formData); // Logging form data for debugging

      const response = await axios.post(
        "http://172.28.27.255:5000/predict-retinopathy",
        { data: form }
      );
      console.log("Response:", response.data); // Logging response data for debugging
      setPrediction(response.data.prediction.toString());
      setPredValue(response.data.prediction.toString()); // Set the predValue state
      setModalVisible(true); // Show the modal
    } catch (error) {
      console.error("Error:", error);
      setPrediction("Error occurred while predicting retinopathy");
      Alert.alert("Error", "An error occurred while predicting retinopathy");
    }
  };

  const [predValue, setPredValue] = useState(null);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false); // State for controlling modal visibility

  const handleFormChange = (event, name) => {
    let list = [];
    list.push(event);
    setForm({
      ...form,
      [`${name}`]: list,
    });
    console.log(form);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <View style={styles.container}>
        <Text style={styles.sectionTitle}>Enter Your Details </Text>
        <View style={styles.inputContainer}>
          <View>
            <Text style={styles.label}>Gender</Text>
            <TextInput
              style={styles.input}
              placeholder="Gender"
              onChangeText={(e) => handleFormChange(e, "Gender")}
            />
          </View>

          <View>
            <Text style={styles.label}>Diabetes Type</Text>
            <TextInput
              style={styles.input}
              placeholder="Diabetes Type"
              value={diabetesType}
              onChangeText={setDiabetesType}
              editable={false} // Make it non-editable
            />
          </View>

          <View>
            <Text style={styles.label}>Systolic BP</Text>
            <TextInput
              style={styles.input}
              placeholder="Systolic BP"
              onChangeText={(e) => handleFormChange(parseInt(e), "Systolic BP")}
              keyboardType="numeric"
            />
          </View>

          <View>
            <Text style={styles.label}>Diastolic BP</Text>
            <TextInput
              style={styles.input}
              placeholder="Diastolic BP"
              onChangeText={(e) =>
                handleFormChange(parseInt(e), "Diastolic BP")
              }
              keyboardType="numeric"
            />
          </View>

          <View>
            <Text style={styles.label}>HbA1c (mmol/mol)</Text>
            <TextInput
              style={styles.input}
              placeholder="HbA1c (mmol/mol)"
              onChangeText={(e) =>
                handleFormChange(parseInt(e), "HbA1c (mmol/mol)")
              }
              keyboardType="numeric"
            />
          </View>

          <View>
            <Text style={styles.label}>Avg. Glucose (mmol/mol)</Text>
            <TextInput
              style={styles.input}
              placeholder="Glucose"
              onChangeText={(e) =>
                handleFormChange(parseInt(e), "Estimated Avg Glucose (mg/dL)")
              }
              keyboardType="numeric"
            />
          </View>

          <View>
            <Text style={styles.label}>Diagnosis Year</Text>
            <TextInput
              style={styles.input}
              placeholder="Diagnosis Year"
              onChangeText={(e) =>
                handleFormChange(parseInt(e), "Diagnosis Year")
              }
              keyboardType="numeric"
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

        <View style={styles.buttonContainer}>
          <Button title="Predict Retinopathy" onPress={handlePrediction} />
          <View style={styles.predictionContainer}>
            <Text style={styles.predictionText}>Prediction: {prediction}</Text>
          </View>
        </View>

        <ResultModal
          visible={modalVisible}
          predValue={predValue}
          onClose={() => setModalVisible(false)} // Close modal when the close button is pressed
        />
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
  loadingIndicator: {
    position: "absolute",
    zIndex: 1,
  },
});

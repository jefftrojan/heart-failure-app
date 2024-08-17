import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
} from 'react-native';

interface PatientData {
  age: string;
  anaemia: number;
  creatinine_phosphokinase: string;
  diabetes: number;
  ejection_fraction: number;
  high_blood_pressure: number;
  platelets: string;
  serum_creatinine: string;
  serum_sodium: string;
  sex: number;
  smoking: number;
  time: string;
}

interface PredictionResult {
  death_probability: number;
  death_risk: string;
}

const GradientBackground: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <View style={styles.gradientBackground}>
    {children}
  </View>
);

const HeartFailurePredictionScreen: React.FC = () => {
  const [patientData, setPatientData] = useState<PatientData>({
    age: '',
    anaemia: 0,
    creatinine_phosphokinase: '',
    diabetes: 0,
    ejection_fraction: 50,
    high_blood_pressure: 0,
    platelets: '',
    serum_creatinine: '',
    serum_sodium: '',
    sex: 0,
    smoking: 0,
    time: '',
  });

  const [prediction, setPrediction] = useState<PredictionResult | null>(null);

  const handleInputChange = (name: keyof PatientData, value: string | number) => {
    setPatientData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePredict = async () => {
    try {
      const response = await fetch('https://heart-failure-prediction-ktzo.onrender.com/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          age: parseInt(patientData.age),
          anaemia: patientData.anaemia,
          creatinine_phosphokinase: parseInt(patientData.creatinine_phosphokinase),
          diabetes: patientData.diabetes,
          ejection_fraction: patientData.ejection_fraction,
          high_blood_pressure: patientData.high_blood_pressure,
          platelets: parseFloat(patientData.platelets),
          serum_creatinine: parseFloat(patientData.serum_creatinine),
          serum_sodium: parseInt(patientData.serum_sodium),
          sex: patientData.sex,
          smoking: patientData.smoking,
          time: parseInt(patientData.time),
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result: PredictionResult = await response.json();
      setPrediction(result);

      // Show alert with the prediction result
      Alert.alert(
        'Prediction Result',
        `Death Probability: ${(result.death_probability).toFixed(2)}\nDeath Risk: ${result.death_risk}`,
        [
          {
            text: 'Clear',
            onPress: () => setPrediction(null),
            style: 'cancel',
          },
          { text: 'OK' },
        ]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to get prediction. Please try again.');
    }
  };

  return (
    <ScrollView>
      <GradientBackground>
        <View style={styles.glassMorphicBox}>
          <Text style={styles.cardTitle}>Heart Failure Prediction</Text>
          <Text style={styles.cardDescription}>
            Enter patient data to predict heart failure risk
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Age"
            placeholderTextColor="#ccc"
            value={patientData.age}
            onChangeText={(text) => handleInputChange('age', text)}
            keyboardType="numeric"
          />
           <TextInput
            style={styles.input}
            placeholder="Sexually active"
            placeholderTextColor="#ccc"
            value={patientData.sex}
            onChangeText={(text) => handleInputChange('sex', text)}
            keyboardType="numeric"
          />
          <Text style={styles.label}>Anaemia: {patientData.anaemia ? 'Yes' : 'No'}</Text>
          <TouchableOpacity
            style={styles.toggleButton}
            onPress={() => handleInputChange('anaemia', patientData.anaemia ? 0 : 1)}
          >
            <Text style={styles.toggleButtonText}>Toggle Anaemia</Text>
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            placeholder="Creatinine Phosphokinase"
            placeholderTextColor="#ccc"
            value={patientData.creatinine_phosphokinase}
            onChangeText={(text) => handleInputChange('creatinine_phosphokinase', text)}
            keyboardType="numeric"
          />
          <Text style={styles.label}>Diabetes: {patientData.diabetes ? 'Yes' : 'No'}</Text>
          <TouchableOpacity
            style={styles.toggleButton}
            onPress={() => handleInputChange('diabetes', patientData.diabetes ? 0 : 1)}
          >
            <Text style={styles.toggleButtonText}>Toggle Diabetes</Text>
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            placeholder="Platelets"
            placeholderTextColor="#ccc"
            value={patientData.platelets}
            onChangeText={(text) => handleInputChange('platelets', text)}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Serum Creatinine"
            placeholderTextColor="#ccc"
            value={patientData.serum_creatinine}
            onChangeText={(text) => handleInputChange('serum_creatinine', text)}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Serum Sodium"
            placeholderTextColor="#ccc"
            value={patientData.serum_sodium}
            onChangeText={(text) => handleInputChange('serum_sodium', text)}
            keyboardType="numeric"
          />
          <Text style={styles.label}>High Blood Pressure: {patientData.high_blood_pressure ? 'Yes' : 'No'}</Text>
          <TouchableOpacity
            style={styles.toggleButton}
            onPress={() => handleInputChange('high_blood_pressure', patientData.high_blood_pressure ? 0 : 1)}
          >
            <Text style={styles.toggleButtonText}>Toggle High Blood Pressure</Text>
          </TouchableOpacity>
          <Text style={styles.label}>Smoking: {patientData.smoking ? 'Yes' : 'No'}</Text>
          <TouchableOpacity
            style={styles.toggleButton}
            onPress={() => handleInputChange('smoking', patientData.smoking ? 0 : 1)}
          >
            <Text style={styles.toggleButtonText}>Toggle Smoking</Text>
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            placeholder="Ejection Fraction"
            placeholderTextColor="#ccc"
            value={patientData.ejection_fraction.toString()}
            onChangeText={(text) => handleInputChange('ejection_fraction', parseInt(text))}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Time"
            placeholderTextColor="#ccc"
            value={patientData.time}
            onChangeText={(text) => handleInputChange('time', text)}
            keyboardType="numeric"
          />
          <TouchableOpacity style={styles.predictButton} onPress={handlePredict}>
            <Text style={styles.predictButtonText}>Predict</Text>
          </TouchableOpacity>
        </View>
      </GradientBackground>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  gradientBackground: {
    flex: 1,
    padding: 8,
    backgroundColor: '#874f41',
  },
  glassMorphicBox: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 5,
    backdropFilter: 'blur(10px)',
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#fff',
  },
  cardDescription: {
    fontSize: 16,
    color: '#ddd',
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 15,
    padding: 8,
    marginBottom: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    color: '#fff',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#fff',
  },
  toggleButton: {
    backgroundColor: '#8a2387',
    padding: 10,
    borderRadius: 15,
    marginBottom: 16,
    alignItems: 'center',
  },
  toggleButtonText: {
    color: '#fff',
    textAlign: 'center',
  },
  predictButton: {
    backgroundColor: '#8a2387',
    padding: 16,
    borderRadius: 15,
    alignItems: 'center',
  },
  predictButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default HeartFailurePredictionScreen;

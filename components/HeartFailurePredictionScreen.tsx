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
      // Simulating API call
      const mockPrediction: PredictionResult = {
        death_probability: Math.random(),
        death_risk: Math.random() > 0.5 ? 'High' : 'Low',
      };
      setPrediction(mockPrediction);
    } catch (error) {
      Alert.alert('Error', 'Failed to get prediction. Please try again.');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Heart Failure Prediction</Text>
        <Text style={styles.cardDescription}>
          Enter patient data to predict heart failure risk
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Age"
          value={patientData.age}
          onChangeText={(text) => handleInputChange('age', text)}
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
        <Text style={styles.label}>Ejection Fraction: {patientData.ejection_fraction}%</Text>
        <View style={styles.sliderContainer}>
          <TouchableOpacity
            style={styles.sliderButton}
            onPress={() => handleInputChange('ejection_fraction', Math.max(0, patientData.ejection_fraction - 1))}
          >
            <Text style={styles.sliderButtonText}>-</Text>
          </TouchableOpacity>
          <View style={styles.slider}>
            <View style={[styles.sliderFill, { width: `${patientData.ejection_fraction}%` }]} />
          </View>
          <TouchableOpacity
            style={styles.sliderButton}
            onPress={() => handleInputChange('ejection_fraction', Math.min(100, patientData.ejection_fraction + 1))}
          >
            <Text style={styles.sliderButtonText}>+</Text>
          </TouchableOpacity>
        </View>
        {/* Add more inputs for other fields */}
        <TouchableOpacity style={styles.predictButton} onPress={handlePredict}>
          <Text style={styles.predictButtonText}>Predict</Text>
        </TouchableOpacity>
      </View>

      {prediction && (
        <View style={styles.resultCard}>
          <Text style={styles.resultTitle}>Prediction Result</Text>
          <Text style={styles.resultText}>
            Death Probability: {(prediction.death_probability * 100).toFixed(2)}%
          </Text>
          <Text style={styles.resultText}>Death Risk: {prediction.death_risk}</Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  toggleButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 4,
    marginBottom: 16,
  },
  toggleButtonText: {
    color: '#fff',
    textAlign: 'center',
  },
  sliderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sliderButton: {
    backgroundColor: '#007AFF',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sliderButtonText: {
    color: '#fff',
    fontSize: 20,
  },
  slider: {
    flex: 1,
    height: 10,
    backgroundColor: '#ddd',
    marginHorizontal: 10,
    borderRadius: 5,
  },
  sliderFill: {
    height: '100%',
    backgroundColor: '#007AFF',
    borderRadius: 5,
  },
  predictButton: {
    backgroundColor: '#4CAF50',
    padding: 16,
    borderRadius: 4,
    alignItems: 'center',
  },
  predictButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  resultCard: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
    marginTop: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  resultTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  resultText: {
    fontSize: 16,
    marginBottom: 8,
  },
});

export default HeartFailurePredictionScreen;
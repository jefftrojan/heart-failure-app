import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  TextInput, 
  ScrollView, 
  Animated,
  SafeAreaView,
  Platform,
  StatusBar,
  Alert,
  ActivityIndicator
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import HeartFailurePredictionScreen from '@/components/HeartFailurePredictionScreen';
import React, { useState, useRef, useEffect } from 'react';
import * as DocumentPicker from 'expo-document-picker';

type TabType = 'about' | 'prediction' | 'retrain';

const GradientBackground: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <View style={styles.gradientBackground}>
    {children}
  </View>
);

const GlassMorphicBox: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <View style={styles.glassMorphicBox}>
    {children}
  </View>
);

const Button: React.FC<{ onPress: () => void; children: React.ReactNode }> = ({ onPress, children }) => (
  <TouchableOpacity onPress={onPress} style={styles.button}>
    <View style={styles.buttonGradient}>
      {children}
    </View>
  </TouchableOpacity>
);

const NavItem: React.FC<{ icon: string; label: string; isActive: boolean; onPress: () => void }> = ({ icon, label, isActive, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.navItem}>
    <Ionicons name={icon as keyof typeof Ionicons | undefined} size={24} color={isActive ? '#8a2387' : '#999'} />
    <Text style={[styles.navLabel, isActive && styles.navLabelActive]}>{label}</Text>
    {isActive && <View style={styles.navItemActiveIndicator} />}
  </TouchableOpacity>
);

const Header: React.FC = () => (
  <View style={styles.header}>
   
  </View>
);

const About: React.FC = () => (
  <GlassMorphicBox>
    <Text style={styles.sectionTitle}>About Heart Failure Prediction</Text>
    <Text style={styles.sectionText}>
      Cardiovascular diseases are the leading cause of death globally, with heart failure being a common and serious condition. Our AI-powered application uses advanced machine learning to predict the risk of heart failure based on clinical data.
    </Text>
    <View style={styles.featuresGrid}>
      <View style={styles.featureItem}>
        <Text style={styles.featureTitle}>Early Detection</Text>
        <Text style={styles.featureText}>Identify potential risks before they become critical.</Text>
      </View>
      <View style={styles.featureItem}>
        <Text style={styles.featureTitle}>Data-Driven Insights</Text>
        <Text style={styles.featureText}>Utilize machine learning for accurate predictions.</Text>
      </View>
    </View>
    <Button onPress={() => console.log('Learn More')}>
      <Text style={styles.buttonText}>View Data Source</Text>
      <Ionicons name="chevron-forward" size={16} color="#fff" />
    </Button>
  </GlassMorphicBox>
);

const Prediction: React.FC = () => (
  <GlassMorphicBox>
    <Text style={styles.sectionTitle}>AI-Powered Prediction</Text>
    <View style={styles.inputContainer}>
      <TextInput
        placeholder="Enter data for prediction"
        style={styles.input}
        placeholderTextColor="#999"
      />
      <View style={styles.inputIndicators}>
        <Animated.View style={[styles.inputIndicator, { backgroundColor: '#8a2387' }]} />
        <Animated.View style={[styles.inputIndicator, { backgroundColor: '#e94057' }]} />
        <Animated.View style={[styles.inputIndicator, { backgroundColor: '#f27121' }]} />
      </View>
    </View>
    <View style={styles.buttonRow}>
      <Button onPress={() => console.log('Quick Predict')}>
        <Text style={styles.buttonText}>Quick Predict</Text>
      </Button>
      <Button onPress={() => console.log('Advanced Options')}>
        <Text style={styles.buttonText}>Advanced Options</Text>
      </Button>
    </View>
    <View style={styles.predictionResult}>
      <Text style={styles.predictionTitle}>Latest Prediction</Text>
      <View style={styles.predictionRow}>
        <Text style={styles.predictionLabel}>Stock Price Forecast:</Text>
        <Text style={styles.predictionValue}>+2.5%</Text>
      </View>
    </View>
  </GlassMorphicBox>
);

const Retrain: React.FC = () => {
  const [retrainProgress, setRetrainProgress] = useState(0);
  const [retrainResult, setRetrainResult] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [fileUri, setFileUri] = useState<string | null>(null);

  const handleFilePick = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['application/json'], // Specify file types here
      });
      if (result.type === 'success') {
        setFileUri(result.uri);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to pick file. Please try again.');
    }
  };

  const handleRetrain = async () => {
    if (!fileUri) {
      Alert.alert('Error', 'Please select a file to upload.');
      return;
    }
    
    setIsLoading(true);

    try {
      // Simulate file upload and retraining process
      for (let i = 0; i <= 100; i += 10) {
        setRetrainProgress(i);
        await new Promise(resolve => setTimeout(resolve, 500));
      }

      const response = await fetch('https://heart-failure-prediction-ktzo.onrender.com/retrain', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ /* Replace with actual data from file */ }),
      });

      if (!response.ok) {
        throw new Error('Failed to retrain model');
      }

      const result = await response.json();
      setRetrainResult(result);
    } catch (error) {
      Alert.alert('Error', 'Failed to retrain model. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <GlassMorphicBox>
      <Text style={styles.sectionTitle}>Retrain AI Model</Text>
      <Text style={styles.sectionText}>
        Improve our heart failure prediction model by uploading new patient data. This process adapts the model to the latest clinical trends and patterns.
      </Text>
      <TouchableOpacity style={styles.fileUpload} onPress={handleFilePick}>
        <Text style={styles.fileUploadText}>{fileUri ? 'File Selected' : 'Choose file to upload'}</Text>
      </TouchableOpacity>
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${retrainProgress}%` }]} />
        </View>
        <Text style={styles.progressLabel}>Progress: {retrainProgress}%</Text>
      </View>
      <Button onPress={handleRetrain}>
        <Text style={styles.buttonText}>Start Retraining</Text>
        <Ionicons name="refresh" size={16} color="#fff" />
      </Button>
      {isLoading && <ActivityIndicator size="large" color="#8a2387" />}
      {retrainResult && (
        <View style={styles.retrainResult}>
          <Text style={styles.resultText}>Model Accuracy: {(retrainResult.accuracy * 100).toFixed(2)}%</Text>
          <Text style={styles.resultText}>Loss: {retrainResult.loss.toFixed(4)}</Text>
        </View>
      )}
    </GlassMorphicBox>
  );
};


export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('prediction');
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
      <GradientBackground>
        <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
          <Header />
          <ScrollView contentContainerStyle={styles.scrollContent}>
            {activeTab === 'about' && <About />}
            {activeTab === 'prediction' && <HeartFailurePredictionScreen />}
            {activeTab === 'retrain' && <Retrain />}
          </ScrollView>
        </Animated.View>
        <View style={styles.navBar}>
          <NavItem icon="book" label="About" isActive={activeTab === 'about'} onPress={() => setActiveTab('about')} />
          <NavItem 
            icon="heart" 
            label="Predict" 
            isActive={activeTab === 'prediction'} 
            onPress={() => setActiveTab('prediction')} 
          />
          <NavItem icon="refresh" label="Retrain" isActive={activeTab === 'retrain'} onPress={() => setActiveTab('retrain')} />
        </View>
      </GradientBackground>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,


  },
  gradientBackground: {
    flex: 1,
    padding: 10,
    backgroundColor: '#874f41',
    
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 50,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    marginLeft: 10,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#f1f1f1',
  },
  glassMorphicBox: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#f1f1f1',
  },
  sectionText: {
    fontSize: 16,
    marginBottom: 20,
    color: '#f1f1f1',
  },
  featuresGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  featureItem: {
    width: '48%',
    backgroundColor: '#f5f5f5',
    borderRadius: 15,
    padding: 10,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  featureText: {
    fontSize: 14,
    color: '#666',
  },
  button: {
    marginTop: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonGradient: {
    flex: 1,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 15,
    padding: 10,
  },
  navItem: {
    alignItems: 'center',
  },
  navLabel: {
    fontSize: 14,
    color: '#999',
  },
  navLabelActive: {
    color: '#8a2387',
    fontWeight: 'bold',
  },
  navItemActiveIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#8a2387',
    marginTop: 5,
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    borderWidth: 1,
    borderRadius: 15,
    paddingHorizontal: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    color: '#fff',
  },
  inputIndicators: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  inputIndicator: {
    flex: 1,
    height: 2,
    marginHorizontal: 1,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  predictionResult: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 15,
    padding: 15,
  },
  predictionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  predictionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  predictionLabel: {
    fontSize: 16,
    color: '#666',
  },
  predictionValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#8a2387',
  },
  fileUpload: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
  },
  fileUploadText: {
    fontSize: 16,
    color: '#fff',
  },
  progressContainer: {
    marginBottom: 20,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#8a2387',
  },
  progressLabel: {
    marginTop: 10,
    fontSize: 14,
    color: '#fff',
  },
  retrainResult: {
    marginTop: 20,
  },
  resultText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
});

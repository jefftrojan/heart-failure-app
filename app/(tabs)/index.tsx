import React, { useState, useRef, useEffect } from 'react';
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
  StatusBar
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import HeartFailurePredictionScreen from '@/components/HeartFailurePredictionScreen';

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

const NavItem: React.FC<{ icon: any; label: string; isActive: boolean; onPress: () => void }> = ({ icon, label, isActive, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.navItem}>
    <Ionicons name={icon} size={24} color={isActive ? '#8a2387' : '#999'} />
    <Text style={[styles.navLabel, isActive && styles.navLabelActive]}>{label}</Text>
    {isActive && <View style={styles.navItemActiveIndicator} />}
  </TouchableOpacity>
);

const Header: React.FC = () => (
  <View style={styles.header}>
    <View style={styles.headerLeft}>
      <Ionicons name="person" size={24} color="#8a2387" />
      <Text style={styles.headerText}>John Doe</Text>
    </View>
    <View style={styles.headerRight}>
      <Ionicons name="notifications" size={24} color="#666" />
      <Ionicons name="settings" size={24} color="#666" />
    </View>
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
      <Text style={styles.buttonText}>Learn More</Text>
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
  const [retrainResult, setRetrainResult] = useState(null);

  const handleRetrain = async () => {
    try {
      // Simulating file upload and retraining process
      for (let i = 0; i <= 100; i += 10) {
        setRetrainProgress(i);
        await new Promise(resolve => setTimeout(resolve, 500));
      }

      const response = await fetch('http://your-api-url/retrain', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ /* training data */ }),
      });
      const result = await response.json();
      setRetrainResult(result);
    } catch (error) {
      Alert.alert('Error', 'Failed to retrain model. Please try again.');
    }
  };

  return (
    <GlassMorphicBox>
      <Text style={styles.sectionTitle}>Retrain AI Model</Text>
      <Text style={styles.sectionText}>
        Improve our heart failure prediction model by uploading new patient data. This process adapts the model to the latest clinical trends and patterns.
      </Text>
      <TouchableOpacity style={styles.fileUpload}>
        <Text style={styles.fileUploadText}>Choose file to upload</Text>
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
    <SafeAreaView style={styles.safeArea}>
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
/>          <NavItem icon="refresh" label="Retrain" isActive={activeTab === 'retrain'} onPress={() => setActiveTab('retrain')} />
        </View>
      </GradientBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  gradientBackground: {
    flex: 1,
    backgroundColor: '#8a2387', // Fallback color
  },
  content: {
    flex: 1,
    paddingTop: 20,
  },
  scrollContent: {
    padding: 20,
  },
  glassMorphicBox: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  headerRight: {
    flexDirection: 'row',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  sectionText: {
    fontSize: 16,
    color: '#f0f0f0',
    marginBottom: 20,
  },
  featuresGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  featureItem: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 5,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  featureText: {
    fontSize: 14,
    color: '#f0f0f0',
  },
  button: {
    borderRadius: 25,
    overflow: 'hidden',
  },
  buttonGradient: {
    backgroundColor: '#e94057',
    paddingVertical: 12,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 5,
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 12,
    fontSize: 16,
    color: '#fff',
  },
  inputIndicators: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 5,
  },
  inputIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 5,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  predictionResult: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 10,
    padding: 15,
  },
  predictionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  predictionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  predictionLabel: {
    fontSize: 16,
    color: '#f0f0f0',
  },
  predictionValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4caf50',
  },
  fileUpload: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  fileUploadText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  progressContainer: {
    marginBottom: 20,
  },
  progressBar: {
    height: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 5,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4caf50',
  },
  progressLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  progressLabel: {
    fontSize: 14,
    color: '#f0f0f0',
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  navItem: {
    alignItems: 'center',
  },
  navLabel: {
    fontSize: 12,
    color: '#999',
    marginTop: 5,
  },
  navLabelActive: {
    color: '#8a2387',
    fontWeight: 'bold',
  },
  navItemActiveIndicator: {
    position: 'absolute',
    bottom: -10,
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: '#8a2387',
  },
});
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const App: React.FC = () => {
  const [peso, setPeso] = useState<string>('');
  const [altura, setAltura] = useState<string>('');
  const [resultadoIMC, setResultadoIMC] = useState<string>('');
  const [categoriaIMC, setCategoriaIMC] = useState<string>('');

  const calcularIMC = () => {
    const alturaMetros = parseFloat(altura.replace(',', '.'));
    const pesoKg = parseFloat(peso.replace(',', '.'));

    if (isNaN(alturaMetros) || isNaN(pesoKg) || alturaMetros <= 0 || pesoKg <= 0) {
      alert('Por favor, insira valores válidos e positivos para peso e altura.');
      resetIMC();
      return;
    }

    const imc = (pesoKg / (alturaMetros * alturaMetros)).toFixed(2);
    setResultadoIMC(imc);
    setCategoriaIMC(getCategoriaIMC(parseFloat(imc)));
  };

  const resetIMC = () => {
    setResultadoIMC('');
    setCategoriaIMC('');
  };

  const getCategoriaIMC = (imc: number): string => {
    if (imc < 18.5) return 'Abaixo do peso';
    if (imc >= 18.5 && imc <= 24.9) return 'Peso normal';
    if (imc >= 25 && imc <= 29.9) return 'Sobrepeso';
    if (imc >= 30 && imc <= 34.9) return 'Obesidade grau I';
    if (imc >= 35 && imc <= 39.9) return 'Obesidade grau II';
    return 'Obesidade grau III ou mórbida';
  };

  return (
    <View style={styles.container}>
      <Text style={styles.resultText}>Calculadora de IMC</Text>

      <TextInput
        style={styles.input}
        placeholder="Peso (kg)"
        value={peso}
        onChangeText={(text) => setPeso(text)}
        keyboardType="numeric"
      />

      <TextInput
        style={styles.input}
        placeholder="Altura (metros)"
        value={altura}
        onChangeText={(text) => setAltura(text)}
        keyboardType="numeric"
      />

      <TouchableOpacity style={styles.button} onPress={calcularIMC}>
        <Text style={styles.buttonText}>Calcular IMC</Text>
      </TouchableOpacity>

      {resultadoIMC && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>Resultado do IMC:</Text>
          <Text style={styles.resultText}>IMC: {resultadoIMC}</Text>
          <Text style={styles.resultText}>Categoria: {categoriaIMC}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#d3d3d3',
    padding: 12,
    width: '100%',
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'green',
    padding: 15,
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  resultContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  resultText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'green',
    marginBottom: 25,
  },
});

export default App;

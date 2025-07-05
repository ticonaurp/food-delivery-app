"use client"

import { useContext, useState } from "react"
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native"
import { StatusBar } from "expo-status-bar"
import { Ionicons } from "@expo/vector-icons"
import { AuthContext } from "../context/AuthContext"

const PantallaLogin = ({ navigation }) => {
  const { login, loginAsGuest } = useContext(AuthContext)
  const [isLoading, setIsLoading] = useState(false)

  const manejarLogin = async () => {
    setIsLoading(true)
    try {
      await login()
    } catch (error) {
      Alert.alert("Error", "Error al iniciar sesión. Por favor, inténtalo de nuevo.")
    } finally {
      setIsLoading(false)
    }
  }

  const manejarLoginComoInvitado = async () => {
    setIsLoading(true)
    try {
      await loginAsGuest("Dirección Predeterminada", null)
      navigation.replace("MainTabs")
    } catch (error) {
      Alert.alert("Error", "Error al continuar como invitado. Por favor, inténtalo de nuevo.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <View style={estilos.contenedor}>
      <StatusBar style="light" />

      <View style={estilos.encabezado}>
        <Text style={estilos.titulo}>Bienvenido a</Text>
        <Text style={estilos.nombreApp}>FoodieGo</Text>
        <Text style={estilos.subtitulo}>Comida deliciosa entregada a tu puerta</Text>
      </View>

      <View style={estilos.contenido}>
        <TouchableOpacity style={[estilos.boton, estilos.botonLogin]} onPress={manejarLogin} disabled={isLoading}>
          <Ionicons name="log-in" size={20} color="white" style={estilos.iconoBoton} />
          <Text style={estilos.textoBotonLogin}>{isLoading ? "Iniciando sesión..." : "Iniciar sesión con Auth0"}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[estilos.boton, estilos.botonInvitado]} onPress={manejarLoginComoInvitado} disabled={isLoading}>
          <Ionicons name="person" size={20} color="#E94864" style={estilos.iconoBoton} />
          <Text style={estilos.textoBotonInvitado}>{isLoading ? "Por favor espera..." : "Continuar como Invitado"}</Text>
        </TouchableOpacity>
      </View>

      <View style={estilos.pie}>
        <Text style={estilos.textoPie}>Al continuar, aceptas nuestros Términos de Servicio y Política de Privacidad</Text>
      </View>
    </View>
  )
}

const estilos = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: "#E94864",
    justifyContent: "space-between",
  },
  encabezado: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
  },
  titulo: {
    fontSize: 24,
    color: "white",
    marginBottom: 8,
  },
  nombreApp: {
    fontSize: 36,
    fontWeight: "bold",
    color: "white",
    marginBottom: 16,
    textAlign: "center",
  },
  subtitulo: {
    fontSize: 16,
    color: "rgba(255,255,255,0.8)",
    textAlign: "center",
    lineHeight: 24,
  },
  contenido: {
    paddingHorizontal: 40,
    paddingBottom: 40,
  },
  boton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  botonLogin: {
    backgroundColor: "rgba(255,255,255,0.2)",
    borderWidth: 2,
    borderColor: "white",
  },
  botonInvitado: {
    backgroundColor: "white",
  },
  iconoBoton: {
    marginRight: 8,
  },
  textoBotonLogin: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  textoBotonInvitado: {
    color: "#E94864",
    fontSize: 16,
    fontWeight: "600",
  },
  pie: {
    paddingHorizontal: 40,
    paddingBottom: 40,
  },
  textoPie: {
    fontSize: 12,
    color: "rgba(255,255,255,0.7)",
    textAlign: "center",
    lineHeight: 18,
  },
})

export default PantallaLogin
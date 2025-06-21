import React, { useEffect, useState } from "react";
import { View, Text, Image, Pressable } from "react-native";
import * as Animatable from "react-native-animatable";
import * as AuthSession from "expo-auth-session";
import { authConfig } from "../authConfig";

const redirectUri = AuthSession.makeRedirectUri({ useProxy: true });

const discovery = {
  authorizationEndpoint: `https://${authConfig.domain}/authorize`,
  tokenEndpoint: `https://${authConfig.domain}/oauth/token`,
  userInfoEndpoint: `https://${authConfig.domain}/userinfo`,
};

export default function ProfileScreen() {
  const [userInfo, setUserInfo] = useState(null);

  const [request, response, promptAsync] = AuthSession.useAuthRequest(
    {
      clientId: authConfig.clientId,
      redirectUri,
      responseType: "token",
      scopes: ["openid", "profile", "email"],
    },
    discovery
  );

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (response?.type === "success" && response.params?.access_token) {
        try {
          const res = await fetch(discovery.userInfoEndpoint, {
            headers: {
              Authorization: `Bearer ${response.params.access_token}`,
            },
          });
          const data = await res.json();
          console.log("Datos del usuario:", data);
          setUserInfo(data);
        } catch (err) {
          console.error("Error obteniendo perfil:", err);
        }
      }
    };

    fetchUserInfo();
  }, [response]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 24, backgroundColor: "#fff" }}>
      {userInfo ? (
        <Animatable.View animation="fadeInUp" duration={800} style={{ alignItems: "center" }}>
          {userInfo.picture && (
            <Image
              source={{ uri: userInfo.picture }}
              style={{ width: 100, height: 100, borderRadius: 50, marginBottom: 16 }}
            />
          )}
          <Text style={{ fontSize: 22, fontWeight: "bold", marginBottom: 4 }}>
            ¡Hola, {userInfo.name}!
          </Text>
          <Text style={{ fontSize: 16, color: "#555" }}>{userInfo.email}</Text>
        </Animatable.View>
      ) : (
        <Animatable.View animation="fadeIn" duration={800}>
          <Pressable
            onPress={() => promptAsync({ useProxy: true })}
            disabled={!request}
            style={{
              backgroundColor: "#556de8",
              paddingVertical: 14,
              paddingHorizontal: 32,
              borderRadius: 12,
              elevation: 3,
            }}
          >
            <Text style={{ color: "#fff", fontSize: 16, fontWeight: "600" }}>
              Iniciar sesión con Auth0
            </Text>
          </Pressable>
        </Animatable.View>
      )}
    </View>
  );
}

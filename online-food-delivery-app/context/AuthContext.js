"use client";

import { createContext, useCallback, useEffect, useState } from "react";
import * as AuthSession from "expo-auth-session";
import Constants from "expo-constants";
import { db } from "../firebase/firebaseConfig";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

const discovery = {
  authorizationEndpoint: `https://${
    Constants.expoConfig?.extra?.auth0Domain || "demo.auth0.com"
  }/authorize`,
  tokenEndpoint: `https://${
    Constants.expoConfig?.extra?.auth0Domain || "demo.auth0.com"
  }/oauth/token`,
  revocationEndpoint: `https://${
    Constants.expoConfig?.extra?.auth0Domain || "demo.auth0.com"
  }/v2/logout`,
};

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [wallet, setWallet] = useState(0);
  const [coins, setCoins] = useState(0);
  const [guestAddress, setGuestAddress] = useState(null);
  const [favoriteRestaurants, setFavoriteRestaurants] = useState([]);
  const [orderHistory, setOrderHistory] = useState([]);

  // Reactivar Auth0 si está configurado
  const [request, result, promptAsync] = AuthSession.useAuthRequest(
    {
      clientId: Constants.expoConfig?.extra?.auth0ClientId || "demo-client-id",
      redirectUri: AuthSession.makeRedirectUri({ useProxy: true }),
      scopes: ["openid", "profile", "email"],
      responseType: "token",
    },
    discovery
  );

  const login = useCallback(() => {
    // Si Auth0 está configurado, usar Auth0, sino login como guest
    if (
      Constants.expoConfig?.extra?.auth0Domain &&
      Constants.expoConfig?.extra?.auth0ClientId
    ) {
      promptAsync({ useProxy: true });
    } else {
      loginAsGuest("Default Address");
    }
  }, [promptAsync]);

  const logout = () => {
    setUser(null);
    setWallet(0);
    setCoins(0);
    setGuestAddress(null);
    setFavoriteRestaurants([]);
    setOrderHistory([]);
  };

  const loginAsGuest = async (address = "", coords = null) => {
    const guestEmail = `guest_${Date.now()}@guest.com`;
    const guestUser = {
      email: guestEmail,
      guest: true,
      name: "Guest User",
    };

    setUser(guestUser);
    setGuestAddress({ address, coords });

    // Usar valores locales por defecto
    setWallet(100);
    setCoins(50);
    setFavoriteRestaurants([]);
    setOrderHistory([]);

    // Intentar Firebase pero no fallar si no funciona
    try {
      const userRef = doc(db, "users", guestEmail);
      const snapshot = await getDoc(userRef);

      if (!snapshot.exists()) {
        await setDoc(userRef, {
          email: guestEmail,
          guest: true,
          wallet: 100,
          coins: 50,
          address,
          coords,
          favoriteRestaurants: [],
          orderHistory: [],
          createdAt: new Date().toISOString(),
        });
      } else {
        const data = snapshot.data();
        setWallet(data.wallet || 100);
        setCoins(data.coins || 50);
        setFavoriteRestaurants(data.favoriteRestaurants || []);
        setOrderHistory(data.orderHistory || []);
      }
    } catch (error) {
      console.log("Firebase not available, using local state");
    }
  };

  // Función para actualizar wallet en Firebase
  const updateWalletInFirebase = async (newWalletAmount) => {
    if (!user) return;

    try {
      const userRef = doc(db, "users", user.email);
      await updateDoc(userRef, {
        wallet: newWalletAmount,
      });
    } catch (error) {
      console.log("Firebase update failed, using local state");
    }
  };

  // Función para actualizar coins en Firebase
  const updateCoinsInFirebase = async (newCoinsAmount) => {
    if (!user) return;

    try {
      const userRef = doc(db, "users", user.email);
      await updateDoc(userRef, {
        coins: newCoinsAmount,
      });
    } catch (error) {
      console.log("Firebase update failed, using local state");
    }
  };

  const toggleFavoriteRestaurant = async (restaurantId) => {
    if (!user) return;

    const isFavorite = favoriteRestaurants.includes(restaurantId);
    let updatedFavorites;

    if (isFavorite) {
      updatedFavorites = favoriteRestaurants.filter(
        (id) => id !== restaurantId
      );
    } else {
      updatedFavorites = [...favoriteRestaurants, restaurantId];
    }

    setFavoriteRestaurants(updatedFavorites);

    try {
      const userRef = doc(db, "users", user.email);
      await updateDoc(userRef, {
        favoriteRestaurants: updatedFavorites,
      });
    } catch (error) {
      console.log("Firebase update failed, using local state");
    }
  };

  const addToOrderHistory = async (order) => {
    if (!user) return;

    const newOrder = {
      id: `order_${Date.now()}`,
      ...order,
      timestamp: new Date().toISOString(),
      status: "pending",
    };

    const updatedHistory = [newOrder, ...orderHistory];
    setOrderHistory(updatedHistory);

    try {
      const userRef = doc(db, "users", user.email);
      await updateDoc(userRef, {
        orderHistory: updatedHistory,
      });
    } catch (error) {
      console.log("Firebase update failed, using local state");
    }

    return newOrder.id;
  };

  const updateWalletAfterPurchase = async (amount) => {
    if (!user || wallet < amount) return false;

    const newWalletAmount = wallet - amount;
    setWallet(newWalletAmount);
    await updateWalletInFirebase(newWalletAmount);
    return true;
  };

  const useCoinsAsDiscount = async (coinsToUse) => {
    if (!user || coins < coinsToUse) return false;

    const newCoinsAmount = coins - coinsToUse;
    setCoins(newCoinsAmount);
    await updateCoinsInFirebase(newCoinsAmount);
    return true;
  };

  const earnCoins = async (coinsEarned) => {
    if (!user) return;

    const newCoinsAmount = coins + coinsEarned;
    setCoins(newCoinsAmount);
    await updateCoinsInFirebase(newCoinsAmount);
  };

  // Efecto para manejar Auth0 login
  useEffect(() => {
    const fetchOrCreateUser = async (userInfo) => {
      try {
        const userRef = doc(db, "users", userInfo.email);
        const snapshot = await getDoc(userRef);

        if (snapshot.exists()) {
          const data = snapshot.data();
          setWallet(data.wallet || 0);
          setCoins(data.coins || 0);
          setFavoriteRestaurants(data.favoriteRestaurants || []);
          setOrderHistory(data.orderHistory || []);
          if (data.address) {
            setGuestAddress({ address: data.address, coords: data.coords });
          }
        } else {
          await setDoc(userRef, {
            email: userInfo.email,
            name: userInfo.name || userInfo.email,
            wallet: 200,
            coins: 100,
            favoriteRestaurants: [],
            orderHistory: [],
            createdAt: new Date().toISOString(),
          });
          setWallet(200);
          setCoins(100);
          setFavoriteRestaurants([]);
          setOrderHistory([]);
        }
      } catch (error) {
        console.log("Firebase error, using defaults:", error.message);
        setWallet(200);
        setCoins(100);
        setFavoriteRestaurants([]);
        setOrderHistory([]);
      }
    };

    if (result?.type === "success") {
      const { access_token } = result.params;
      const authDomain = Constants.expoConfig?.extra?.auth0Domain;

      if (authDomain) {
        fetch(`https://${authDomain}/userinfo`, {
          headers: { Authorization: `Bearer ${access_token}` },
        })
          .then((res) => res.json())
          .then(async (userInfo) => {
            setUser(userInfo);
            await fetchOrCreateUser(userInfo);
          })
          .catch((err) => {
            console.log("Auth0 error:", err.message);
            loginAsGuest("Default Address");
          });
      }
    }
  }, [result]);

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        loginAsGuest,
        logout,
        wallet,
        coins,
        setWallet: (amount) => {
          setWallet(amount);
          updateWalletInFirebase(amount);
        },
        setCoins: (amount) => {
          setCoins(amount);
          updateCoinsInFirebase(amount);
        },
        guestAddress,
        favoriteRestaurants,
        orderHistory,
        toggleFavoriteRestaurant,
        addToOrderHistory,
        updateWalletAfterPurchase,
        useCoinsAsDiscount,
        earnCoins,
        loading: !request,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

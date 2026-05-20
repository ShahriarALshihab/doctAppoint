"use client";

import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  updateProfile,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import axiosInstance from "@/lib/axios";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const googleProvider = new GoogleAuthProvider();

 
  const register = async (name, email, photoURL, password) => {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(result.user, { displayName: name, photoURL });
    return result;
  };


  const login = async (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

 
  const googleLogin = async () => {
    return signInWithPopup(auth, googleProvider);
  };

 
  const logout = async () => {
    localStorage.removeItem("token");
    return signOut(auth);
  };


  const updateUserProfile = async (name, photoURL) => {
    await updateProfile(auth.currentUser, { displayName: name, photoURL });
    setUser({ ...auth.currentUser });
  };

  
 const getAndStoreToken = async (currentUser) => {
  try {
    const { data } = await axiosInstance.post("/auth/jwt", {
      email: currentUser.email,
    });

    console.log("JWT response:", data);

    if (data.token) {
      localStorage.setItem("token", data.token);
      console.log("Token saved");
    }
  } catch (error) {
    console.log(error);
  }
};

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        await getAndStoreToken(currentUser);
      } else {
        localStorage.removeItem("token");
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const value = {
    user,
    loading,
    register,
    login,
    googleLogin,
    logout,
    updateUserProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}

"use client";

import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { useAuthState } from 'react-firebase-hooks/auth';
import { signOut } from "firebase/auth";
import { firebaseAuth } from "./lib/firebase";
import MyCard from "./components/MyCard";
import MyButton from "./components/MyButton";
import { useNavigation } from "@react-navigation/native";
import { Heading, ButtonText, Button } from "@gluestack-ui/themed";

const HomeScreen = () => {
  const navigation = useNavigation();
  let auth;
  try {
    auth = firebaseAuth;
  } catch (e) {
    console.error('Firebase initialization error:', e);
    return <View style={styles.container}><Text style={styles.errorText}>Firebase Initialization Failed. Check console</Text></View>;
  }
  const [user, loading, error] = useAuthState(auth);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigation.navigate('Login');
    } catch (error) {
      console.error("Sign out failed:", error.message);
    }
  };

  const goToQuiz = () => {
    navigation.navigate('Quiz');
  };

  if (loading) {
    return <View style={styles.container}><Text style={styles.loadingText}>Loading...</Text></View>;
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Welcome to <Text style={styles.blueText}>DriveWise</Text>!</Text>
        <Text style={styles.subtitle}>Learn and test your driving knowledge with our interactive tutorial and quiz.



        </Text>

        <View style={styles.cardsContainer}>
          {user ? (
            <>
              <MyCard heading="Account">
                <Text style={styles.cardContent}>
                  Logged in as: {user.email}.
                </Text>
                <MyButton onPress={handleSignOut} title="Sign Out"/>
              </MyCard>

              <MyCard heading="Rules of the Road">
                <Text style={styles.cardContent}>
                  Learn essential rules for safe and responsible driving
                </Text>
                <MyButton onPress={() => navigation.navigate('Rules')} title="Explore Rules"/>
              </MyCard>

              <MyCard heading="Driving Tutorial">
                <Text style={styles.cardContent}>
                  Interactive driving tutorial with multiple pages, each detailing a specific driving concept
                </Text>
                <MyButton onPress={() => navigation.navigate('Tutorial')} title="Start Tutorial"/>
              </MyCard>

              <MyCard heading="Driving Quiz">
                <Text style={styles.cardContent}>
                  Test your driving knowledge with our multiple-choice quiz
                </Text>
                <MyButton onPress={() => navigation.navigate('Quiz')} title="Take the Quiz"/>
              </MyCard>

            </>
          ) : (
            <MyCard heading="Authentication">
              <Text style={styles.cardContent}>
                Login or signup to start learning and testing your driving skills
              </Text>
              <View style={styles.authButtonsContainer}>
                <MyButton onPress={() => navigation.navigate('Login')} title="Login"/>
                <MyButton onPress={() => navigation.navigate('Signup')} title="Signup"/>
              </View>
            </MyCard>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 10,
    backgroundColor: '#f0f0f0',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
    maxWidth: 500,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  blueText: {
    color: 'blue',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  cardsContainer: {
    width: '100%',
  },
  authButtonsContainer: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  cardContent: {
    marginBottom: 10,
    textAlign: 'left',
  },
  loadingText: {
    textAlign: 'center',
    fontSize: 18,
  },
  errorText: {
    textAlign: 'center',
    color: 'red',
    fontSize: 16,
  },
});

export default HomeScreen;
import { StatusBar } from 'expo-status-bar';


import * as SplashScreen from "expo-splash-screen"
 import {useFonts,Roboto_400Regular, Roboto_700Bold} from "@expo-google-fonts/roboto";
import { Loading } from './src/components/loading';

import { Routes } from './src/routes';
import { AppRoutes } from './src/routes/app.routes';
import { AuthRoutes } from './src/routes/auth.routes';


//SplashScreen.preventAutoHideAsync()

export default function App() {
  const [isLoaded] = useFonts({
    Roboto_400Regular, 
    Roboto_700Bold
  });

  if(!isLoaded) {
    return <Loading/>
  }
 
  return (
    <>
      <StatusBar style='light' backgroundColor='transparent' translucent/>
      <Routes/>
    </>
  );
}



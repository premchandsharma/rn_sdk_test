import React, { useEffect } from 'react';
import { AppStorys } from '@appstorys/appstorys-react-native';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import type { PropsWithChildren } from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({ children, title }: SectionProps): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [userId, setUserId] = React.useState<string>();

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  useEffect(() => {
    setUserId('nameisprem');
  }, []);

  useEffect(() => {
    async function initializeAppStorys() {
      if (!userId) {
        return;
      }
      await AppStorys.initialize(
        "5c45be58-85df-4651-9a66-6c10754e7f54",
        "e3c8ee76-a90c-4673-a9e6-2e49f14425f2",
        userId,
        // attributes,
      );
      await AppStorys.trackScreen("Home Screen React", {
        overlayPadding: {
          pip: 40
        }
      });
    }

    if (userId) {
      initializeAppStorys();
    }
  }, [userId]);

  return (
    <GestureHandlerRootView>
      <SafeAreaProvider>
        <AppStorys.Container>
          <SafeAreaView style={backgroundStyle}>
            <StatusBar
              barStyle={isDarkMode ? 'light-content' : 'dark-content'}
              backgroundColor={backgroundStyle.backgroundColor}
            />
            <ScrollView
              contentInsetAdjustmentBehavior="automatic"
              style={backgroundStyle}>
              <Header />
              <View
                style={{
                  backgroundColor: isDarkMode ? Colors.black : Colors.white,
                }}>
                <Section title="Step One">
                  Edit <Text style={styles.highlight}>App.tsx</Text> to change this screen and then come back to see your edits.
                </Section>
                <Section title="See Your Changes">
                  <ReloadInstructions />
                </Section>
                <Section title="Debug">
                  <DebugInstructions />
                </Section>
                <Section title="Learn More">
                  Read the docs to discover what to do next:
                </Section>
                <LearnMoreLinks />
              </View>
            </ScrollView>
          </SafeAreaView>
        </AppStorys.Container>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;

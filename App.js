import React from "react";
import * as eva from "@eva-design/eva";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { AppNavigator } from "./navigation.component";

const navigateProfile = () => {
  navigation.navigate("Profile");
};


const App = () => {

  return (
    <ApplicationProvider {...eva} theme={eva.light}>
        <IconRegistry icons={EvaIconsPack} />
        <AppNavigator></AppNavigator>
    </ApplicationProvider>

  );

}

export default App;


// export default () => (
//   <>
//     <IconRegistry icons={EvaIconsPack} />
//     <ApplicationProvider {...eva} theme={eva.light}>
//       <AppNavigator></AppNavigator>
//     </ApplicationProvider>
//   </>
// );

import React, { memo,  } from "react";
import { ActivityIndicator } from "react-native";
import { Colors } from "../../constants/colors";



const SingleLoader = memo(() => {
    

    return (
      <ActivityIndicator color={Colors.white} size={"large"}   />
    );
});

SingleLoader.displayName = "SingleLoader";

export { SingleLoader };




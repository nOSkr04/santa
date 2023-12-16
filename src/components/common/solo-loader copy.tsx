import React, { memo, useCallback, useRef } from "react";
import LottieView from "lottie-react-native";

type Props = {
    width?: number,
    height?: number,
}

const SingleLoader = memo(({ width, height, }: Props) => {
    const animation = useRef(null);

    const dimension = useCallback(() => {
        return {
            width : width || 100,
            height: height || 100,
        };
    }, [height, width]);

    return (
      <LottieView
            autoPlay
            ref={animation}
            source={require("../../assets/lottie/loading.json")}
            style={dimension()}
        />
    );
});

SingleLoader.displayName = "SingleLoader";

export { SingleLoader };




import * as React from "react";

import Animated, {
  ComplexAnimationBuilder,
  FadeInDown,
  FadeOutDown,
  Layout,
} from "react-native-reanimated";
import type { ViewStyle } from "react-native";

export type StaggerProps = React.PropsWithChildren<{
  stagger?: number;
  enterDirection?: -1 | 1;
  exitDirection?: -1 | 1;
  duration?: number;
  style?: ViewStyle;
  entering?: () => ComplexAnimationBuilder;
  exiting?: () => ComplexAnimationBuilder;
  initialEnteringDelay?: number;
  initialExitingDelay?: number;
}>;

const Stagger = React.memo(({
    children,
    stagger = 50,
    enterDirection = 1,
    exitDirection = -1,
    duration = 400,
    style,
    entering = () => FadeInDown.duration(400),
    exiting = () => FadeOutDown.duration(400),
    initialEnteringDelay = 0,
    initialExitingDelay = 0,
  }: StaggerProps) => {
    if (!children) {
      return null;
    }
  
    return (
      <Animated.View layout={Layout} style={style}>
        {React.Children.map(children, (child, index) => {
          if (!React.isValidElement(child)) {
            return null;
          }
          return (
            <Animated.View
              entering={entering()
                .delay(
                  initialEnteringDelay +
                    (enterDirection === 1
                      ? index * stagger
                      : (React.Children.count(children) - index) * stagger)
                )
                .duration(duration)}
              exiting={exiting()
                .delay(
                  initialExitingDelay +
                    (exitDirection === 1
                      ? index * stagger
                      : (React.Children.count(children) - index) * stagger)
                )
                .duration(duration)}
              key={child.key ?? index}
              layout={Layout}
            >
              {child}
            </Animated.View>
          );
        })}
      </Animated.View>
    );
  });

  Stagger.displayName="Stagger";

export { Stagger };
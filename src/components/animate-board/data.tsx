import { AnimationObject } from "lottie-react-native";

export interface OnboardingData {
  _id: string;
  animation: AnimationObject;
  text: string;
  textColor: string;
  backgroundColor: string;
}

const data: OnboardingData[] = [
  {
    _id: "1",
    animation: require("./animate1.json"),
    text: "Lorem Ipsum dolor sit amet",
    textColor: "#005b4f",
    backgroundColor: "#ffa3ce",
  },
  {
    _id: "2",
    animation: require("./animate2.json"),
    text: "Lorem Ipsum dolor sit amet",
    textColor: "#1e2169",
    backgroundColor: "#bae4fd",
  },
  {
    _id: "3",
    animation: require("./animate3.json"),
    text: "Lorem Ipsum dolor sit amet",
    textColor: "#f15937",
    backgroundColor: "#faeb8a",
  },
];

export { data };

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
    _id            : "1",
    animation      : require("../../assets/lottie/animate2.json"),
    text           : "Та өндгөн шоколаданд дуртай юу?",
    textColor      : "#005b4f",
    backgroundColor: "#ffa3ce",
  },
  {
    _id            : "2",
    animation      : require("../../assets/lottie/animate1.json"),
    text           : "Дотроос нь юу гарч ирээсэй гэж хүсэж байна?",
    textColor      : "#1e2169",
    backgroundColor: "#bae4fd",
  },
  {
    _id            : "3",
    animation      : require("../../assets/lottie/animate3.json"),
    text           : "2024 онд Санта танд бэлэгтэй иржээ. Өндгөө аваарай!",
    textColor      : "#f15937",
    backgroundColor: "#faeb8a",
  },
];

export { data };

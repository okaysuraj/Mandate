import { Image } from "react-native";

export default function BrandLogo({ size = 40, style, decorative = false }) {
  return (
    <Image
      source={require("../../../assets/logo.png")}
      resizeMode="contain"
      accessible={!decorative}
      accessibilityLabel={decorative ? undefined : "Mandate"}
      style={[
        { width: size, height: size, borderRadius: 6, flexShrink: 0 },
        style,
      ]}
    />
  );
}

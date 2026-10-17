import BrandSplash from "../../components/common/BrandSplash";
import { useTheme } from "../../context/ThemeContext";
export default function SplashScreen() {
  const { colors, isDark } = useTheme();
  return <BrandSplash colors={colors} isDark={isDark} />;
}

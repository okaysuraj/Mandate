// Static screen layout; theme colors are applied by the component.
import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 48,
    paddingHorizontal: 24,
    paddingBottom: 48,
    maxWidth: 500,
    alignSelf: "center",
    width: "100%",
  },
  headerSection: {
    marginBottom: 48,
  },
  backButton: {
    alignSelf: "flex-start",
    padding: 8,
    marginLeft: -8,
  },
  contentArea: {
    gap: 24,
  },
  bentoCard: {
    borderWidth: 1,
    borderRadius: 12,
    borderColor: "transparent",
  },
  successContainer: {
    alignItems: "center",
    paddingVertical: 32,
  },
  formContainer: {
    gap: 32,
  },
  inputGroup: {
    gap: 4,
  },
  inputUnderline: {
    borderBottomWidth: 1,
    paddingHorizontal: 0,
  },
  primaryButton: {
    flexDirection: "row",
    height: 56,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  sidebarContent: {
    gap: 16,
  },
  imageModule: {
    height: 192,
    position: "relative",
    overflow: "hidden",
  },
  footer: {
    alignItems: "center",
  },
  footerLinks: {
    flexDirection: "row",
    gap: 24,
  },
});
export default styles;

import axios from "axios";
import { auth } from "../config/firebase";
import { apiOrigin, createApiClient } from "../../../shared/apiClient";

const defaultOrigin = import.meta.env.DEV
  ? "http://localhost:5001"
  : window.location.origin;
export const API_ORIGIN = apiOrigin(
  import.meta.env.VITE_API_BASE_URL || defaultOrigin,
);
export default createApiClient(axios, auth, API_ORIGIN);

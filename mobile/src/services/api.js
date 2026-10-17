import axios from "axios";
import { auth } from "../config/firebase";
import { API_URL } from "../config";
import { apiOrigin, createApiClient } from "../../../shared/apiClient";

export const API_ORIGIN = apiOrigin(API_URL);
export default createApiClient(axios, auth, API_ORIGIN);

import * as React from "react";
import { useIsFocused } from "@react-navigation/native";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import { useWorkspace } from "../context/WorkspaceContext";
import { createFeatureHook } from "../../../shared/createFeatureHook";

export const { useFeature, featureClient } = createFeatureHook(React, {
  api,
  useAuth,
  useWorkspace,
  useIsFocused,
});

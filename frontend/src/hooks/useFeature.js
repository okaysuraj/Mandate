import * as React from "react";
import api from "../lib/axios";
import { useAuth } from "../context/AuthContext";
import { useWorkspace } from "../context/WorkspaceContext";
import { createFeatureHook } from "../../../shared/createFeatureHook";

export const { useFeature, featureClient } = createFeatureHook(React, {
  api,
  useAuth,
  useWorkspace,
});

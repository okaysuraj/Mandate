import React, { useEffect, useState } from "react";
import AppLayout from "../components/AppLayout";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

const TeamWorkspacePage = () => {
  const { user } = useAuth();
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const { data } = await axios.get("/api/users", { params: { workspaceId: user?.activeWorkspace } });
        setMembers(Array.isArray(data) ? data : []);
      } catch (error) {
        toast.error("Failed to load team workspace");
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchMembers();
  }, [user]);

  return (
    <AppLayout>
      <div className="space-y-lg">
        <div>
          <p className="font-label-caps text-label-caps text-on-surface-variant uppercase">Team Layer</p>
          <h1 className="font-headline-lg text-headline-lg text-primary">Team Workspace</h1>
        </div>

        <div className="bg-surface-container-lowest border border-outline-variant p-lg">
          <h2 className="font-headline-lg text-primary mb-md">Workspace Members</h2>
          {loading ? (
            <p className="text-on-surface-variant">Loading members…</p>
          ) : members.length === 0 ? (
            <p className="text-on-surface-variant">No team members found.</p>
          ) : (
            <div className="space-y-sm">
              {members.map((member) => (
                <div key={member._id || member.id} className="flex items-center justify-between border border-outline-variant p-md">
                  <div>
                    <p className="font-body-md font-bold text-primary">{member.name || member.email}</p>
                    <p className="text-sm text-on-surface-variant">{member.role || "Member"}</p>
                  </div>
                  <span className="text-label-sm text-on-surface-variant">Active</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default TeamWorkspacePage;

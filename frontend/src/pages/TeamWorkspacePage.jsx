import React, { useState } from "react";
import AppLayout from "../components/AppLayout";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router";

const DEFAULT_TEAM_MEMBERS = [
  { id: "m1", name: "Alex Chen", email: "alex.chen@mandate.internal", role: "Frontend Lead", status: "Active", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80" },
  { id: "m2", name: "Sarah Jenkins", email: "sarah.j@mandate.internal", role: "DevOps Specialist", status: "Active", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80" },
  { id: "m3", name: "David Miller", email: "david.m@mandate.internal", role: "Product Manager", status: "Away", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80" },
  { id: "m4", name: "Elena Rostova", email: "elena.r@mandate.internal", role: "Backend Architect", status: "Active", avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80" },
];

const TeamWorkspacePage = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");

  const currentUserMember = {
    id: user?._id || user?.id || "current-user",
    name: user?.name || "Team Lead",
    email: user?.email || "user@mandate.app",
    role: "Workspace Manager (You)",
    status: "Active",
    avatar: user?.avatar || "",
  };

  const allMembers = [currentUserMember, ...DEFAULT_TEAM_MEMBERS];

  const filteredMembers = allMembers.filter(
    (m) =>
      m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AppLayout>
      <div className="space-y-xl pb-2xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-md border-b border-outline-variant/30 pb-lg">
          <div>
            <p className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest mb-xs">
              Organization & Workspace
            </p>
            <h1 className="font-headline-lg text-headline-lg md:text-[36px] text-primary uppercase font-black tracking-tight">
              Team Workspace
            </h1>
            <p className="font-body-md text-on-surface-variant max-w-xl mt-xs">
              View active team members, roles, permissions, and workspace resource distribution.
            </p>
          </div>
          <div className="flex gap-md">
            <Link
              to="/team"
              className="px-6 py-2.5 border border-outline-variant rounded-full font-label-caps text-label-caps hover:bg-surface-container-low transition-colors block text-center"
            >
              Team Analytics
            </Link>
            <Link
              to="/settings"
              className="px-6 py-2.5 bg-primary text-on-primary rounded-full font-label-caps text-label-caps shadow-md hover:opacity-90 transition-all block text-center"
            >
              Manage Workspace
            </Link>
          </div>
        </div>

        {/* Member Roster & Controls */}
        <div className="bg-surface-container-lowest border border-outline-variant p-xl space-y-lg">
          <div className="flex flex-col md:flex-row justify-between md:items-center gap-md">
            <div>
              <h2 className="font-headline-lg text-headline-lg text-primary font-bold uppercase">
                Workspace Roster ({allMembers.length} Members)
              </h2>
              <p className="text-xs text-on-surface-variant">Core Productivity & Engineering Workspace</p>
            </div>
            <div className="w-full md:w-72">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search team members or roles..."
                className="w-full bg-surface border border-outline-variant p-md rounded-sm text-xs font-body-md text-on-surface outline-none focus:border-primary"
              />
            </div>
          </div>

          <div className="space-y-md pt-md">
            {filteredMembers.map((member) => (
              <div
                key={member.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between border border-outline-variant/60 p-md rounded hover:border-primary transition-all gap-md bg-surface-container-lowest"
              >
                <div className="flex items-center gap-md">
                  <div className="w-12 h-12 rounded-full bg-surface-container-high border border-outline-variant overflow-hidden flex items-center justify-center flex-shrink-0">
                    {member.avatar ? (
                      <img src={member.avatar} alt={member.name} className="w-full h-full object-cover" />
                    ) : (
                      <span className="font-display-lg text-headline-lg font-bold text-primary">
                        {member.name.charAt(0).toUpperCase()}
                      </span>
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-xs">
                      <p className="font-body-md font-bold text-primary">{member.name}</p>
                      {member.id === currentUserMember.id && (
                        <span className="bg-primary/10 text-primary font-label-caps text-[10px] px-2 py-0.5 rounded uppercase font-bold">
                          You
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-on-surface-variant">{member.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-lg">
                  <div className="text-right">
                    <span className="font-label-caps text-xs text-primary font-bold uppercase block">{member.role}</span>
                    <span className="text-[10px] text-on-surface-variant font-label-caps uppercase">{member.status}</span>
                  </div>
                  <span className="material-symbols-outlined text-outline text-lg cursor-pointer hover:text-primary">
                    more_vert
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default TeamWorkspacePage;

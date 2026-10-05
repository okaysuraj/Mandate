import React, { useState } from "react";
import AppLayout from "../../components/layout/AppLayout";
import { useAuth } from "../../context/AuthContext";
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
      <div className="space-y-6 sm:space-y-8 pb-16 px-4 sm:px-6 md:px-8 py-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-outline-variant/40 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-primary inline-block"></span>
              <span className="font-mono text-xs uppercase font-bold text-on-surface-variant tracking-widest">
                ORGANIZATION &amp; COLLABORATION
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-on-surface uppercase tracking-tight">
              Team Workspace
            </h1>
            <p className="text-sm text-on-surface-variant max-w-xl mt-1">
              View active team members, roles, permissions, and workspace resource distribution.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/team"
              className="px-5 py-2.5 border border-outline-variant rounded-xl font-mono text-xs font-bold text-on-surface hover:bg-surface-container transition-colors block text-center"
            >
              TEAM ANALYTICS
            </Link>
            <Link
              to="/settings"
              className="px-5 py-2.5 bg-primary text-on-primary rounded-xl font-mono text-xs font-bold shadow-md hover:opacity-90 active:scale-95 transition-all block text-center uppercase"
            >
              MANAGE WORKSPACE
            </Link>
          </div>
        </div>

        {/* Member Roster & Controls */}
        <div className="bg-surface-container-lowest border border-outline-variant/60 p-6 sm:p-8 rounded-2xl shadow-sm space-y-6">
          <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-on-surface">
                Workspace Roster ({allMembers.length} Members)
              </h2>
              <p className="text-xs text-on-surface-variant mt-0.5">Core Engineering &amp; Operations Distribution</p>
            </div>
            <div className="w-full md:w-80 relative">
              <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant text-base">
                search
              </span>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name, role, email..."
                className="w-full bg-surface-container-low border border-outline-variant pl-10 pr-4 py-2.5 rounded-xl text-xs font-medium text-on-surface outline-none focus:border-primary transition-colors"
              />
            </div>
          </div>

          <div className="space-y-3 pt-2">
            {filteredMembers.map((member) => (
              <div
                key={member.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between border border-outline-variant/60 p-4 rounded-xl hover:border-primary/50 transition-all gap-4 bg-surface-container-low"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-full bg-surface-container-high border border-outline-variant/80 overflow-hidden flex items-center justify-center flex-shrink-0 shadow-sm">
                    {member.avatar ? (
                      <img src={member.avatar} alt={member.name} className="w-full h-full object-cover" />
                    ) : (
                      <span className="font-mono text-base font-bold text-primary">
                        {member.name.charAt(0).toUpperCase()}
                      </span>
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-bold text-on-surface">{member.name}</p>
                      {member.id === currentUserMember.id && (
                        <span className="bg-primary/10 text-primary font-mono text-[10px] px-2 py-0.5 rounded-full uppercase font-bold border border-primary/20">
                          YOU
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-on-surface-variant">{member.email}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-6 pt-2 sm:pt-0 border-t sm:border-t-0 border-outline-variant/30">
                  <div className="sm:text-right">
                    <span className="font-mono text-xs text-primary font-bold uppercase block">{member.role}</span>
                    <div className="flex items-center sm:justify-end gap-1.5 mt-0.5">
                      <span className={`w-1.5 h-1.5 rounded-full ${member.status === 'Active' ? 'bg-primary' : 'bg-on-surface-variant/40'}`}></span>
                      <span className="text-[10px] text-on-surface-variant font-mono uppercase">{member.status}</span>
                    </div>
                  </div>
                  <button className="p-1.5 text-on-surface-variant hover:text-primary hover:bg-surface-container rounded-lg transition-colors cursor-pointer">
                    <span className="material-symbols-outlined text-xl">
                      more_vert
                    </span>
                  </button>
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

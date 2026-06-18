import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { useWorkspace } from "../context/WorkspaceContext";
import { Users, Mail, Settings, Shield, Plus } from "lucide-react";
import { Button } from "../components/ui/Button";

const TeamSettingsPage = () => {
  const { activeWorkspace } = useWorkspace();
  const [inviteEmail, setInviteEmail] = useState("");

  if (!activeWorkspace) {
    return (
      <div className="min-h-screen bg-[#F3F3F5] dark:bg-black font-['Inter']">
        <Navbar />
        <div className="flex items-center justify-center h-[80vh]">
          <p className="text-gray-500">Loading workspace...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F3F3F5] dark:bg-black font-['Inter'] flex flex-col">
      <Navbar />
      
      <main className="flex-1 max-w-4xl w-full mx-auto p-8 mt-8">
        <div className="bg-white dark:bg-[#1A1A1A] rounded-xl border border-[#EDEDF0] dark:border-gray-800 shadow-sm overflow-hidden">
          <div className="p-8 border-b border-[#EDEDF0] dark:border-gray-800">
            <h1 className="text-2xl font-bold font-['Space_Grotesk'] text-[#1A1A1A] dark:text-white">
              Team Settings
            </h1>
            <p className="text-gray-500 mt-2">
              Manage members and permissions for {activeWorkspace.name}
            </p>
          </div>

          <div className="p-8 space-y-8">
            <section>
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Users size={20} className="text-blue-500" />
                Invite Members
              </h2>
              <div className="flex gap-4">
                <div className="flex-1 relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="email"
                    placeholder="Enter email address"
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-[#EDEDF0] dark:border-gray-800 rounded-lg focus:outline-none focus:border-blue-500 bg-transparent"
                  />
                </div>
                <Button className="flex items-center gap-2">
                  <Plus size={16} />
                  Send Invite
                </Button>
              </div>
            </section>

            <div className="h-px bg-[#EDEDF0] dark:bg-gray-800 w-full" />

            <section>
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Shield size={20} className="text-green-500" />
                Active Members
              </h2>
              <div className="space-y-4">
                {activeWorkspace.members?.map((member, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 rounded-lg border border-[#EDEDF0] dark:border-gray-800 hover:bg-[#F9F9FB] dark:hover:bg-[#111] transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                        {member.user?.name ? member.user.name.charAt(0) : "U"}
                      </div>
                      <div>
                        <p className="font-semibold text-[#1A1A1A] dark:text-white">
                          {member.user?.name || "Unknown User"}
                        </p>
                        <p className="text-sm text-gray-500">
                          {member.user?.email || "email@example.com"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <select 
                        defaultValue={member.role}
                        className="bg-transparent border border-[#EDEDF0] dark:border-gray-800 rounded px-2 py-1 text-sm focus:outline-none focus:border-blue-500"
                      >
                        <option value="Admin">Admin</option>
                        <option value="Editor">Editor</option>
                        <option value="Viewer">Viewer</option>
                      </select>
                      <Button variant="ghost" className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 px-3 py-1 text-sm">
                        Remove
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TeamSettingsPage;

import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { FileText, Plus, ArrowLeft, Loader2, Save } from 'lucide-react';
import { useNavigate } from 'react-router';
import toast from 'react-hot-toast';

const DocsPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [docs, setDocs] = useState([]);
  const [activeDoc, setActiveDoc] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Form states for active doc
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const fetchDocs = useCallback(async () => {
    if (!user?.activeWorkspace) return;
    try {
      const { data } = await axios.get(`/api/documents`, {
        params: { workspaceId: user.activeWorkspace, parentDocId: 'null' }
      });
      setDocs(data);
      if (data.length > 0 && !activeDoc) {
        selectDoc(data[0]);
      }
    } catch (error) {
      toast.error('Failed to load documents');
    } finally {
      setLoading(false);
    }
  }, [user, activeDoc]);

  useEffect(() => {
    fetchDocs();
  }, [fetchDocs]);

  const selectDoc = (doc) => {
    setActiveDoc(doc);
    setTitle(doc.title);
    setContent(doc.content || '');
  };

  const createDoc = async () => {
    try {
      const { data } = await axios.post('/api/documents', {
        title: 'Untitled Document',
        workspaceId: user.activeWorkspace,
      });
      setDocs([data, ...docs]);
      selectDoc(data);
    } catch (error) {
      toast.error('Failed to create document');
    }
  };

  const saveDoc = async () => {
    if (!activeDoc) return;
    setSaving(true);
    try {
      const { data } = await axios.put(`/api/documents/${activeDoc._id}`, { title, content });
      setDocs(docs.map(d => d._id === data._id ? data : d));
      setActiveDoc(data);
      toast.success('Saved successfully');
    } catch (error) {
      toast.error('Failed to save document');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen bg-zinc-50 dark:bg-[#050505]"><Loader2 className="w-8 h-8 animate-spin" /></div>;
  }

  return (
    <div className="flex h-screen bg-zinc-50 dark:bg-[#050505] text-black dark:text-white transition-colors duration-300">
      {/* Sidebar */}
      <div className="w-64 border-r border-zinc-200 dark:border-white/10 bg-white dark:bg-[#0a0a0a] flex flex-col h-full">
        <div className="p-4 border-b border-zinc-200 dark:border-white/10 flex items-center justify-between">
          <button onClick={() => navigate(-1)} className="flex items-center text-sm font-semibold text-zinc-500 hover:text-black dark:hover:text-white transition">
            <ArrowLeft className="w-4 h-4 mr-1" /> Home
          </button>
          <button onClick={createDoc} className="p-1.5 bg-black text-white dark:bg-white dark:text-black rounded-md">
            <Plus className="w-4 h-4" />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto py-2 custom-scrollbar">
          {docs.length === 0 ? (
            <div className="px-4 py-8 text-center text-zinc-500 text-sm">
              No documents found. Create one!
            </div>
          ) : (
            docs.map(doc => (
              <button 
                key={doc._id}
                onClick={() => selectDoc(doc)}
                className={`w-full flex items-center px-4 py-2 text-sm text-left transition-colors ${activeDoc?._id === doc._id ? 'bg-zinc-100 dark:bg-white/10 font-bold' : 'hover:bg-zinc-50 dark:hover:bg-white/5 text-zinc-600 dark:text-zinc-400'}`}
              >
                <FileText className="w-4 h-4 mr-2 opacity-70" />
                <span className="truncate">{doc.title}</span>
              </button>
            ))
          )}
        </div>
      </div>

      {/* Main Editor Area */}
      <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full h-full">
        {activeDoc ? (
          <div className="flex flex-col h-full py-12 px-8 md:px-16">
            <div className="flex items-center justify-between mb-8 group">
              <input 
                type="text" 
                value={title}
                onChange={e => setTitle(e.target.value)}
                onBlur={saveDoc}
                placeholder="Document Title"
                className="text-4xl font-bold bg-transparent border-none outline-none w-full placeholder:text-zinc-300 dark:placeholder:text-zinc-700"
              />
              <button 
                onClick={saveDoc}
                disabled={saving}
                className={`flex items-center p-2 rounded-lg transition-opacity ${saving ? 'opacity-50' : 'opacity-0 group-hover:opacity-100 bg-zinc-100 dark:bg-white/10'}`}
              >
                {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
              </button>
            </div>
            
            <textarea 
              value={content}
              onChange={e => setContent(e.target.value)}
              onBlur={saveDoc}
              placeholder="Start typing your knowledge base here... (Markdown supported in future)"
              className="flex-1 w-full bg-transparent border-none outline-none resize-none text-zinc-700 dark:text-zinc-300 text-lg leading-relaxed custom-scrollbar"
            />
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center flex-col text-zinc-400">
            <FileText className="w-16 h-16 mb-4 opacity-20" />
            <p>Select a document or create a new one to start writing.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DocsPage;

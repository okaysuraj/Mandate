import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import AppLayout from '../components/AppLayout';
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
      console.error('Failed to load documents');
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
        title: 'UNTITLED_DOCUMENT',
        workspaceId: user.activeWorkspace,
      });
      setDocs([data, ...docs]);
      selectDoc(data);
    } catch (error) {
      toast.error('Failed to instantiate document');
    }
  };

  const saveDoc = async () => {
    if (!activeDoc) return;
    setSaving(true);
    try {
      const { data } = await axios.put(`/api/documents/${activeDoc._id}`, { title, content });
      setDocs(docs.map(d => d._id === data._id ? data : d));
      setActiveDoc(data);
    } catch (error) {
      toast.error('Failed to synchronize document');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center min-h-[80vh]">
          <span className="font-label-caps text-label-caps text-on-surface-variant animate-pulse">LOADING_DOCUMENTS...</span>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="flex h-[calc(100vh-64px)] overflow-hidden bg-surface">
        {/* Document List Sidebar */}
        <div className="w-64 border-r border-outline-variant bg-surface-container-lowest flex flex-col h-full flex-shrink-0">
          <div className="p-md border-b border-outline-variant flex items-center justify-between bg-surface-container-low">
            <span className="font-label-caps text-label-caps text-primary uppercase tracking-widest">KNOWLEDGE_BASE</span>
            <button onClick={createDoc} className="material-symbols-outlined text-[18px] text-primary hover:scale-110 transition-transform">
              add_box
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto custom-scrollbar p-sm space-y-1">
            {docs.length === 0 ? (
              <div className="p-md text-center text-on-surface-variant font-label-sm text-label-sm mono">
                NO_RECORDS_FOUND
              </div>
            ) : (
              docs.map(doc => (
                <button 
                  key={doc._id}
                  onClick={() => selectDoc(doc)}
                  className={`w-full flex items-center px-sm py-xs text-left transition-colors border-l-2 ${activeDoc?._id === doc._id ? 'bg-primary-container text-on-primary-container border-primary font-bold' : 'hover:bg-surface-container text-on-surface-variant border-transparent'}`}
                >
                  <span className="material-symbols-outlined text-[16px] mr-2" style={{fontVariationSettings: activeDoc?._id === doc._id ? "'FILL' 1" : "'FILL' 0"}}>description</span>
                  <span className="font-label-sm text-label-sm truncate mono">{doc.title}</span>
                </button>
              ))
            )}
          </div>
        </div>

        {/* Main Editor Area */}
        <div className="flex-1 flex flex-col h-full bg-surface">
          {activeDoc ? (
            <div className="flex flex-col h-full max-w-4xl mx-auto w-full p-xl">
              <div className="flex justify-between items-center mb-lg border-b border-outline-variant pb-sm">
                <input 
                  type="text" 
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  onBlur={saveDoc}
                  placeholder="DOCUMENT_TITLE"
                  className="font-headline-lg text-headline-lg-mobile text-primary bg-transparent border-none outline-none w-full uppercase placeholder:opacity-50 p-0 focus:ring-0"
                />
                <div className="flex items-center gap-sm">
                  {saving && <span className="font-label-caps text-[10px] text-tertiary-fixed-dim animate-pulse">SYNCING...</span>}
                  <button onClick={saveDoc} className="material-symbols-outlined text-primary hover:opacity-80 transition-opacity">
                    save
                  </button>
                </div>
              </div>
              
              <textarea 
                value={content}
                onChange={e => setContent(e.target.value)}
                onBlur={saveDoc}
                placeholder="Start typing your knowledge base here... (Markdown supported in future)"
                className="flex-1 w-full bg-surface-container-lowest border border-outline-variant p-lg outline-none resize-none font-body-md text-on-surface focus:border-primary focus:ring-1 focus:ring-primary custom-scrollbar"
              />
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center flex-col text-on-surface-variant opacity-50">
              <span className="material-symbols-outlined text-display-lg mb-md">article</span>
              <p className="font-label-caps text-label-caps uppercase tracking-widest">AWAITING_DOCUMENT_SELECTION</p>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default DocsPage;

import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import AppLayout from '../../components/layout/AppLayout';
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

  const [mobileShowSidebar, setMobileShowSidebar] = useState(false);

  const selectDoc = (doc) => {
    setActiveDoc(doc);
    setTitle(doc.title);
    setContent(doc.content || '');
    setMobileShowSidebar(false);
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
          <span className="font-mono text-xs uppercase font-bold text-on-surface-variant animate-pulse tracking-widest">
            LOADING DOCUMENTS...
          </span>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="flex h-[calc(100vh-64px)] overflow-hidden bg-surface relative">
        {/* Mobile Backdrop */}
        {mobileShowSidebar && (
          <div 
            onClick={() => setMobileShowSidebar(false)}
            className="fixed inset-0 bg-black/50 z-20 md:hidden backdrop-blur-xs transition-opacity"
          />
        )}

        {/* Document List Sidebar */}
        <div className={`fixed inset-y-0 left-0 z-30 w-72 md:static md:w-64 border-r border-outline-variant/60 bg-surface-container-lowest flex flex-col h-full flex-shrink-0 transition-transform duration-300 md:translate-x-0 ${mobileShowSidebar ? 'translate-x-0 shadow-2xl' : '-translate-x-full md:translate-x-0'}`}>
          <div className="p-4 border-b border-outline-variant/40 flex items-center justify-between bg-surface-container-low">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-base">menu_book</span>
              <span className="font-mono text-xs uppercase font-bold text-on-surface tracking-wider">DOCUMENTS</span>
            </div>
            <div className="flex items-center gap-1">
              <button 
                onClick={createDoc} 
                className="p-1.5 text-primary hover:bg-surface-container rounded-lg transition-colors cursor-pointer"
                title="Create Document"
              >
                <span className="material-symbols-outlined text-xl">add</span>
              </button>
              <button 
                onClick={() => setMobileShowSidebar(false)} 
                className="p-1.5 text-on-surface-variant hover:bg-surface-container rounded-lg transition-colors md:hidden cursor-pointer"
              >
                <span className="material-symbols-outlined text-xl">close</span>
              </button>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto custom-scrollbar p-2 space-y-1">
            {docs.length === 0 ? (
              <div className="p-6 text-center text-on-surface-variant font-mono text-xs">
                NO DOCUMENTS YET
              </div>
            ) : (
              docs.map(doc => (
                <button 
                  key={doc._id}
                  onClick={() => selectDoc(doc)}
                  className={`w-full flex items-center px-3 py-2.5 text-left rounded-xl transition-all cursor-pointer ${activeDoc?._id === doc._id ? 'bg-primary text-on-primary font-bold shadow-xs' : 'hover:bg-surface-container text-on-surface'}`}
                >
                  <span className={`material-symbols-outlined text-base mr-2.5 ${activeDoc?._id === doc._id ? 'text-on-primary' : 'text-primary'}`} style={{fontVariationSettings: activeDoc?._id === doc._id ? "'FILL' 1" : "'FILL' 0"}}>
                    description
                  </span>
                  <span className="text-xs truncate font-mono">{doc.title || "Untitled"}</span>
                </button>
              ))
            )}
          </div>
        </div>

        {/* Main Editor Area */}
        <div className="flex-1 flex flex-col h-full bg-surface overflow-hidden">
          {/* Top Bar on Mobile */}
          <div className="md:hidden flex items-center justify-between p-3 border-b border-outline-variant/40 bg-surface-container-lowest">
            <button 
              onClick={() => setMobileShowSidebar(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-surface-container text-on-surface rounded-lg font-mono text-xs font-bold"
            >
              <span className="material-symbols-outlined text-base">menu</span>
              DOCS ({docs.length})
            </button>
            {saving && <span className="font-mono text-[10px] text-tertiary font-bold animate-pulse">SAVING...</span>}
          </div>

          {activeDoc ? (
            <div className="flex flex-col h-full max-w-4xl mx-auto w-full p-4 sm:p-6 md:p-8 overflow-hidden">
              <div className="flex justify-between items-center mb-4 sm:mb-6 border-b border-outline-variant/40 pb-3 gap-4">
                <input 
                  type="text" 
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  onBlur={saveDoc}
                  placeholder="DOCUMENT TITLE..."
                  className="text-xl sm:text-2xl md:text-3xl font-black text-on-surface bg-transparent border-none outline-none w-full uppercase placeholder:opacity-40 p-0 focus:ring-0"
                />
                <div className="flex items-center gap-3 flex-shrink-0">
                  {saving && <span className="hidden sm:inline font-mono text-xs text-tertiary font-bold animate-pulse">SYNCING...</span>}
                  <button 
                    onClick={saveDoc} 
                    className="p-2 bg-primary text-on-primary rounded-xl hover:opacity-90 active:scale-95 transition-all shadow-sm cursor-pointer"
                    title="Save Document"
                  >
                    <span className="material-symbols-outlined text-lg">save</span>
                  </button>
                </div>
              </div>
              
              <textarea 
                value={content}
                onChange={e => setContent(e.target.value)}
                onBlur={saveDoc}
                placeholder="Start typing your documentation or project notes here..."
                className="flex-1 w-full bg-surface-container-lowest border border-outline-variant/60 p-4 sm:p-6 rounded-2xl outline-none resize-none text-sm font-medium text-on-surface focus:border-primary transition-all custom-scrollbar leading-relaxed shadow-sm"
              />
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center flex-col text-on-surface-variant p-6 text-center">
              <div className="w-16 h-16 rounded-2xl bg-surface-container flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-3xl text-primary">article</span>
              </div>
              <p className="font-mono text-xs uppercase font-bold tracking-widest text-on-surface">NO DOCUMENT SELECTED</p>
              <p className="text-xs text-on-surface-variant max-w-xs mt-1">Select an existing document from the sidebar or initialize a new one.</p>
              <button 
                onClick={createDoc}
                className="mt-4 px-4 py-2 bg-primary text-on-primary rounded-xl font-mono text-xs font-bold uppercase tracking-wider"
              >
                CREATE DOCUMENT
              </button>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default DocsPage;

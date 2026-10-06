import {useEffect,useState} from 'react';
import Navbar from '../layout/Navbar';
import Footer from '../layout/Footer';
import api from '../../lib/axios';
export default function PublicContentPage({slug,title}){
 const [page,setPage]=useState(null),[error,setError]=useState(''),[loading,setLoading]=useState(true);
 useEffect(()=>{const c=new AbortController();setLoading(true);setPage(null);setError('');api.get('/public/pages/'+slug,{signal:c.signal}).then(r=>setPage(r.data)).catch(e=>{if(!c.signal.aborted)setError(e.response?.data?.message||'Could not load this page');}).finally(()=>{if(!c.signal.aborted)setLoading(false);});return()=>c.abort();},[slug]);
 return <div className="min-h-screen bg-background text-on-surface"><Navbar variant="landing"/><main className="max-w-4xl mx-auto px-6 py-28"><h1 className="text-4xl font-bold mb-6">{page?.title||title}</h1>{loading?<p>Loading...</p>:error?<p role="alert">{error}</p>:<><p className="text-sm mb-6">Published {new Date(page.publishedAt).toLocaleDateString()}</p><p className="whitespace-pre-wrap">{page.content}</p></>}</main><Footer/></div>;
}

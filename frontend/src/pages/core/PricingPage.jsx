import {useEffect,useState} from 'react';
import {Link} from 'react-router';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import {useAuth} from '../../context/AuthContext';
import api from '../../lib/axios';
export default function PricingPage(){
 const {user}=useAuth(),[plans,setPlans]=useState(null),[error,setError]=useState(''),[busy,setBusy]=useState(false);
 useEffect(()=>{const c=new AbortController();api.get('/stripe/plans',{signal:c.signal}).then(r=>setPlans(r.data.plans)).catch(e=>{if(!c.signal.aborted)setError(e.response?.data?.message||'Could not load pricing');});return()=>c.abort();},[]);
 const subscribe=async plan=>{setBusy(true);setError('');try{const {data}=await api.post('/stripe/create-checkout-session',{plan});window.location.assign(data.url);}catch(e){setError(e.response?.data?.message||'Checkout unavailable');}finally{setBusy(false);}};
 return <div className="min-h-screen bg-background text-on-surface"><Navbar variant="landing"/><main className="max-w-4xl mx-auto px-6 py-28"><h1 className="text-4xl font-bold mb-8">Plans</h1>{error&&<p role="alert">{error}</p>}{!plans&&!error&&<p>Loading prices?</p>}<div className="grid md:grid-cols-3 gap-6">{plans?.map(p=><article key={p.plan} className="p-6 border border-outline-variant rounded-xl"><h2 className="text-xl font-bold capitalize">{p.plan}</h2><p className="my-5">{p.available?new Intl.NumberFormat(undefined,{style:'currency',currency:p.currency}).format(p.amount/100)+' / '+p.interval:'Billing is not configured for this plan.'}</p>{user?<button disabled={busy||!p.available} onClick={()=>subscribe(p.plan)}>Subscribe</button>:<Link to="/register">Create an account</Link>}</article>)}</div></main><Footer/></div>;
}

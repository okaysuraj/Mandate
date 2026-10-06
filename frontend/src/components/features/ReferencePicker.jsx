import {useId,useMemo,useState} from 'react';

export default function ReferencePicker({options,value,onChange,label,multiple=false}) {
  const [query,setQuery] = useState(''), [open,setOpen] = useState(false), [active,setActive] = useState(0);
  const id = useId();
  const selected = multiple?value:value?[value]:[];
  const names = useMemo(()=>new Map(options.map(item=>[item.value,item.label])),[options]);
  // Keep the DOM bounded while retaining access to every related record through search.
  const matches = useMemo(()=>options.filter(item=>item.label.toLowerCase().includes(query.trim().toLowerCase())).slice(0,20),[options,query]);
  const choose = item => {
    onChange(multiple?selected.includes(item.value)?selected.filter(value=>value!==item.value):[...selected,item.value]:item.value);
    if(!multiple)setOpen(false);
  };
  return <div className="relative space-y-2">
    <p className="text-xs text-on-surface-variant">{multiple?selected.length+' selected':names.get(value)||'None'}</p>
    <input role="combobox" aria-label={'Find '+label.toLowerCase()} aria-controls={id} aria-expanded={open} aria-autocomplete="list" aria-activedescendant={open&&matches[active]?id+'-'+active:undefined} value={query} placeholder="Find a record" className="w-full rounded-lg border border-outline-variant bg-surface-container-low p-3" onFocus={()=>setOpen(true)} onBlur={()=>setOpen(false)} onChange={event=>{setQuery(event.target.value);setActive(0);setOpen(true);}} onKeyDown={event=>{
      if(event.key==='Escape')setOpen(false);
      else if(event.key==='ArrowDown'){event.preventDefault();setOpen(true);setActive(index=>open?Math.max(0,Math.min(index+1,matches.length-1)):0);}
      else if(event.key==='ArrowUp'){event.preventDefault();setActive(index=>Math.max(index-1,0));}
      else if(event.key==='Enter'&&open){event.preventDefault();if(matches[active])choose(matches[active]);}
    }}/>
    {open&&<div id={id} role="listbox" aria-label={label} aria-multiselectable={multiple||undefined} className="absolute top-full left-0 right-0 z-20 max-h-64 overflow-auto rounded-lg border border-outline-variant bg-surface shadow-lg">
      {!matches.length&&<p className="p-3 text-sm">No matching records</p>}
      {matches.map((item,index)=><button id={id+'-'+index} type="button" role="option" aria-selected={selected.includes(item.value)} key={item.value} className={'w-full text-left p-3 text-sm hover:bg-surface-container '+(active===index?'bg-surface-container':'')} onMouseDown={event=>event.preventDefault()} onClick={()=>choose(item)}>{selected.includes(item.value)?'✓ ':''}{item.label}</button>)}
      {options.length>20&&<p className="p-3 text-xs text-on-surface-variant">Showing up to 20 matches. Type to find any record.</p>}
    </div>}
    {!!selected.length&&<button type="button" className="text-xs underline" onClick={()=>onChange(multiple?[]:'')}>Clear selection</button>}
  </div>;
}

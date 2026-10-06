import React from 'react';
export default class ErrorBoundary extends React.Component {
 state={hasError:false};
 static getDerivedStateFromError(){return {hasError:true};}
 componentDidCatch(error){console.error('Application error',error);}
 render(){return this.state.hasError?<main role="alert" className="p-8"><h1>Something went wrong</h1><p>Reload the application to try again.</p><button onClick={()=>window.location.reload()}>Reload</button></main>:this.props.children;}
}

import { useState } from 'react';
import { login, register } from '../services/api';

const FinanceIllustration = () => (
  <svg width="100%" viewBox="0 0 400 360" xmlns="http://www.w3.org/2000/svg">
    {/* Background circles */}
    <circle cx="200" cy="180" r="160" fill="rgba(255,255,255,0.04)"/>
    <circle cx="200" cy="180" r="110" fill="rgba(255,255,255,0.04)"/>

    {/* Bar chart */}
    <g>
      <rect x="60" y="200" width="36" height="80" rx="4" fill="rgba(255,255,255,0.3)"/>
      <rect x="108" y="160" width="36" height="120" rx="4" fill="rgba(255,255,255,0.5)"/>
      <rect x="156" y="120" width="36" height="160" rx="4" fill="rgba(255,255,255,0.7)"/>
      <rect x="204" y="140" width="36" height="140" rx="4" fill="rgba(255,255,255,0.5)"/>
      <rect x="252" y="100" width="36" height="180" rx="4" fill="rgba(255,255,255,0.85)"/>
      <rect x="300" y="130" width="36" height="150" rx="4" fill="rgba(255,255,255,0.6)"/>
      {/* Base line */}
      <line x1="50" y1="285" x2="350" y2="285" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5"/>
    </g>

    {/* Line chart on top */}
    <polyline
      points="78,195 126,155 174,115 222,135 270,95 318,125"
      fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
    />
    {/* Dots on line */}
    {[[78,195],[126,155],[174,115],[222,135],[270,95],[318,125]].map(([x,y],i) => (
      <circle key={i} cx={x} cy={y} r="5" fill="white" opacity="0.9"/>
    ))}

    {/* Coin stack */}
    <g transform="translate(20, 60)">
      <ellipse cx="50" cy="85" rx="28" ry="8" fill="rgba(255,255,255,0.2)"/>
      <ellipse cx="50" cy="75" rx="28" ry="8" fill="rgba(255,255,255,0.25)"/>
      <ellipse cx="50" cy="65" rx="28" ry="8" fill="rgba(255,255,255,0.3)"/>
      <ellipse cx="50" cy="55" rx="28" ry="8" fill="rgba(255,255,255,0.35)"/>
      <ellipse cx="50" cy="45" rx="28" ry="8" fill="rgba(255,255,255,0.4)"/>
      <rect x="22" y="45" width="56" height="40" fill="rgba(255,255,255,0.15)"/>
      <text x="50" y="70" textAnchor="middle" fill="white" fontSize="14" fontWeight="700" opacity="0.7">₹</text>
    </g>

    {/* Pie chart */}
    <g transform="translate(290, 60)">
      <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="20"/>
      <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="20"
        strokeDasharray="75 125" strokeDashoffset="0"/>
      <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="20"
        strokeDasharray="50 125" strokeDashoffset="-75"/>
      <circle cx="50" cy="50" r="25" fill="rgba(255,255,255,0.1)"/>
    </g>

    {/* Floating cards */}
    <g>
      <rect x="110" y="30" width="180" height="52" rx="8" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.2)" strokeWidth="1"/>
      <text x="125" y="52" fill="white" fontSize="11" opacity="0.7">Total Savings</text>
      <text x="125" y="72" fill="white" fontSize="16" fontWeight="700" opacity="0.9">₹24,500</text>
      <text x="260" y="52" fill="rgba(255,255,255,0.6)" fontSize="11">↑ 12%</text>
    </g>

    {/* Small trend arrow */}
    <g transform="translate(155, 300)">
      <rect x="0" y="0" width="90" height="32" rx="6" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.2)" strokeWidth="1"/>
      <text x="12" y="20" fill="white" fontSize="11" opacity="0.8">📈 On track</text>
    </g>
  </svg>
);

export default function Login({ onLogin }) {
  const [isRegister, setIsRegister] = useState(false);
  const [form, setForm] = useState({ username: '', password: '', email: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setError(''); setLoading(true);
    try {
      const res = isRegister ? await register(form) : await login(form);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('username', res.data.username);
      onLogin(res.data.username);
    } catch (e) {
      setError(e.response?.data || 'Something went wrong');
    } finally { setLoading(false); }
  };

  const inputStyle = {
    width:'100%', padding:'10px 14px',
    border:'1px solid #d1d5db', borderRadius: 6,
    fontSize: 14, outline:'none', boxSizing:'border-box',
    transition: 'border-color 0.2s'
  };

  return (
    <div style={{display:'flex', height:'100vh', fontFamily:"'Segoe UI', system-ui, sans-serif"}}>

      {/* Left Panel */}
      <div style={{
        flex: 1,
        background: 'linear-gradient(150deg, #1a2332 0%, #1e3a5f 50%, #2563eb 100%)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '48px 40px',
        color: 'white',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Decorative circles */}
        <div style={{position:'absolute', top:-80, right:-80, width:300, height:300, borderRadius:'50%', background:'rgba(255,255,255,0.03)'}}/>
        <div style={{position:'absolute', bottom:-60, left:-60, width:240, height:240, borderRadius:'50%', background:'rgba(255,255,255,0.03)'}}/>

        <div style={{position:'relative', zIndex:1, width:'100%', maxWidth:420, textAlign:'center'}}>
          <h1 style={{fontSize:28, fontWeight:800, marginBottom:8, letterSpacing:'-0.5px'}}>💸 Expense Tracker</h1>
          <p style={{fontSize:14, opacity:0.7, marginBottom:32}}>Smart financial management for everyone</p>

          {/* Illustration */}
          <FinanceIllustration />

          {/* Feature pills */}
          <div style={{display:'flex', flexWrap:'wrap', gap:8, justifyContent:'center', marginTop:16}}>
            {['📊 Analytics', '🔒 Secure', '📁 Categories', '📱 Responsive'].map((f,i) => (
              <span key={i} style={{padding:'6px 14px', background:'rgba(255,255,255,0.12)', borderRadius:20, fontSize:12, border:'1px solid rgba(255,255,255,0.15)'}}>
                {f}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div style={{
        width: 460,
        background: 'white',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '48px 52px',
        boxShadow: '-4px 0 24px rgba(0,0,0,0.08)'
      }}>
        <div style={{marginBottom:36}}>
          <h2 style={{fontSize:24, fontWeight:800, color:'#1a2332', marginBottom:6}}>
            {isRegister ? 'Create Account' : 'Welcome Back'}
          </h2>
          <p style={{fontSize:13, color:'#6b7280'}}>
            {isRegister ? 'Sign up to start tracking your expenses' : 'Sign in to your account to continue'}
          </p>
        </div>

        {isRegister && (
          <div style={{marginBottom:18}}>
            <label style={{display:'block', fontSize:13, fontWeight:600, color:'#374151', marginBottom:6}}>Email Address</label>
            <input style={inputStyle} type="email" placeholder="you@example.com"
              value={form.email} onChange={e => setForm({...form, email: e.target.value})}
              onFocus={e => e.target.style.borderColor='#2563eb'}
              onBlur={e => e.target.style.borderColor='#d1d5db'}
            />
          </div>
        )}

        <div style={{marginBottom:18}}>
          <label style={{display:'block', fontSize:13, fontWeight:600, color:'#374151', marginBottom:6}}>Username</label>
          <input style={inputStyle} placeholder="Enter your username"
            value={form.username} onChange={e => setForm({...form, username: e.target.value})}
            onFocus={e => e.target.style.borderColor='#2563eb'}
            onBlur={e => e.target.style.borderColor='#d1d5db'}
          />
        </div>

        <div style={{marginBottom:24}}>
          <label style={{display:'block', fontSize:13, fontWeight:600, color:'#374151', marginBottom:6}}>Password</label>
          <input style={inputStyle} type="password" placeholder="Enter your password"
            value={form.password} onChange={e => setForm({...form, password: e.target.value})}
            onFocus={e => e.target.style.borderColor='#2563eb'}
            onBlur={e => e.target.style.borderColor='#d1d5db'}
          />
        </div>

        {error && (
          <p style={{color:'#dc2626', fontSize:13, marginBottom:16, padding:'10px 14px', background:'#fef2f2', borderRadius:6, border:'1px solid #fca5a5'}}>
            {error}
          </p>
        )}

        <button
          style={{
            width:'100%', padding:'12px', background: loading ? '#93c5fd' : '#2563eb',
            color:'white', border:'none', borderRadius:6, fontSize:15,
            fontWeight:700, cursor: loading ? 'not-allowed' : 'pointer', letterSpacing:'0.3px'
          }}
          onClick={handleSubmit} disabled={loading}
          onMouseEnter={e => !loading && (e.target.style.background='#1d4ed8')}
          onMouseLeave={e => !loading && (e.target.style.background='#2563eb')}
        >
          {loading ? 'Please wait...' : isRegister ? 'Create Account' : 'Sign In'}
        </button>

        <p style={{textAlign:'center', marginTop:20, fontSize:13, color:'#6b7280'}}>
          {isRegister ? 'Already have an account? ' : "Don't have an account? "}
          <button
            style={{background:'none', border:'none', color:'#2563eb', cursor:'pointer', fontSize:13, fontWeight:700}}
            onClick={() => setIsRegister(!isRegister)}
          >
            {isRegister ? 'Sign In' : 'Register'}
          </button>
        </p>
      </div>
    </div>
  );
}
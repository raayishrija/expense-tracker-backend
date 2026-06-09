import { useState, useEffect } from 'react';
import { getExpenses, addExpense, updateExpense, deleteExpense } from '../services/api';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const CATEGORIES = ['Food', 'Transport', 'Shopping', 'Health', 'Entertainment', 'Bills', 'Other'];
const COLORS = ['#6c63ff','#2ed573','#ff4757','#ffa502','#1e90ff','#ff6b81','#a29bfe'];

export default function Dashboard({ username, onLogout }) {
  const [expenses, setExpenses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editExpense, setEditExpense] = useState(null);
  const [filterCategory, setFilterCategory] = useState('');
  const [form, setForm] = useState({ title:'', amount:'', category:'Food', description:'', date: new Date().toISOString().split('T')[0] });

  useEffect(() => { fetchExpenses(); }, [filterCategory]);

  const fetchExpenses = async () => {
    try {
      const res = await getExpenses(filterCategory);
      setExpenses(res.data);
    } catch (e) { console.error(e); }
  };

  const handleSubmit = async () => {
    try {
      if (editExpense) {
        await updateExpense(editExpense.id, {...form, amount: parseFloat(form.amount)});
      } else {
        await addExpense({...form, amount: parseFloat(form.amount)});
      }
      setShowModal(false); setEditExpense(null);
      setForm({ title:'', amount:'', category:'Food', description:'', date: new Date().toISOString().split('T')[0] });
      fetchExpenses();
    } catch (e) { console.error(e); }
  };

  const handleEdit = (exp) => {
    setEditExpense(exp);
    setForm({ title: exp.title, amount: exp.amount, category: exp.category, description: exp.description || '', date: exp.date });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this expense?')) {
      await deleteExpense(id);
      fetchExpenses();
    }
  };

  const total = expenses.reduce((s, e) => s + e.amount, 0);
  const chartData = CATEGORIES.map(cat => ({
    name: cat,
    value: expenses.filter(e => e.category === cat).reduce((s, e) => s + e.amount, 0)
  })).filter(d => d.value > 0);

  return (
    <div>
      <nav className="navbar">
        <h1>💸 Expense Tracker</h1>
        <div style={{display:'flex', alignItems:'center', gap:16}}>
          <span>👤 {username}</span>
          <button className="btn btn-secondary" onClick={onLogout}>Logout</button>
        </div>
      </nav>
      <div className="container">
        <div className="stats-grid">
          <div className="stat-card">
            <h3>Total Expenses</h3>
            <div className="amount">₹{total.toFixed(2)}</div>
          </div>
          <div className="stat-card">
            <h3>No. of Expenses</h3>
            <div className="amount">{expenses.length}</div>
          </div>
          <div className="stat-card">
            <h3>Average Expense</h3>
            <div className="amount">₹{expenses.length ? (total/expenses.length).toFixed(2) : '0.00'}</div>
          </div>
        </div>

        {chartData.length > 0 && (
          <div className="card">
            <h3 style={{marginBottom:16}}>Spending by Category</h3>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={chartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label={({name, percent}) => `${name} ${(percent*100).toFixed(0)}%`}>
                  {chartData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip formatter={(v) => `₹${v.toFixed(2)}`} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}

        <div className="card">
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:16}}>
            <h3>My Expenses</h3>
            <button className="btn btn-primary" onClick={() => { setEditExpense(null); setShowModal(true); }}>+ Add Expense</button>
          </div>
          <div className="filter-bar">
            <button className={`btn ${filterCategory==='' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setFilterCategory('')}>All</button>
            {CATEGORIES.map(cat => (
              <button key={cat} className={`btn ${filterCategory===cat ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setFilterCategory(cat)}>{cat}</button>
            ))}
          </div>
          <div className="expense-list">
            {expenses.length === 0 && <p style={{textAlign:'center', color:'#888', padding:40}}>No expenses yet. Add your first one!</p>}
            {expenses.map(exp => (
              <div key={exp.id} className="expense-item">
                <div className="info">
                  <h4>{exp.title}</h4>
                  <span>{exp.date}</span>
                  {exp.description && <span style={{marginLeft:8}}>— {exp.description}</span>}
                  <br/><span className="badge">{exp.category}</span>
                </div>
                <div className="right">
                  <div className="amount">₹{exp.amount.toFixed(2)}</div>
                  <div className="actions">
                    <button className="btn btn-secondary" style={{padding:'4px 12px', fontSize:12}} onClick={() => handleEdit(exp)}>Edit</button>
                    <button className="btn btn-danger" style={{padding:'4px 12px', fontSize:12}} onClick={() => handleDelete(exp.id)}>Delete</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h3>{editExpense ? 'Edit Expense' : 'Add Expense'}</h3>
            <div className="form-group"><label>Title</label>
              <input className="input" placeholder="e.g. Lunch" value={form.title} onChange={e => setForm({...form, title: e.target.value})} />
            </div>
            <div className="form-group"><label>Amount (₹)</label>
              <input className="input" type="number" placeholder="0.00" value={form.amount} onChange={e => setForm({...form, amount: e.target.value})} />
            </div>
            <div className="form-group"><label>Category</label>
              <select className="input" value={form.category} onChange={e => setForm({...form, category: e.target.value})}>
                {CATEGORIES.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div className="form-group"><label>Date</label>
              <input className="input" type="date" value={form.date} onChange={e => setForm({...form, date: e.target.value})} />
            </div>
            <div className="form-group"><label>Description (optional)</label>
              <input className="input" placeholder="Notes..." value={form.description} onChange={e => setForm({...form, description: e.target.value})} />
            </div>
            <div style={{display:'flex', gap:10, marginTop:20}}>
              <button className="btn btn-primary" style={{flex:1}} onClick={handleSubmit}>{editExpense ? 'Update' : 'Add'}</button>
              <button className="btn btn-secondary" style={{flex:1}} onClick={() => setShowModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

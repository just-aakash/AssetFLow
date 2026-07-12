import React, { useState } from 'react';
import { Plus, Pencil, Trash2, X, Check } from 'lucide-react';
import { useAppContext } from '@/context/AppContext';
import toast from 'react-hot-toast';

function Tab({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
        active ? 'bg-primary text-black' : 'text-muted hover:text-foreground hover:bg-card-hover'
      }`}
    >
      {label}
    </button>
  );
}

function Modal({ title, children, onClose }) {
  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
      <div className="bg-[#181d24] border border-border rounded-2xl w-full max-w-md shadow-2xl">
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <h3 className="font-semibold">{title}</h3>
          <button onClick={onClose} className="text-muted hover:text-foreground">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}

function InputField({ label, ...props }) {
  return (
    <div>
      <label className="block text-xs text-muted mb-1">{label}</label>
      <input
        className="w-full bg-[#10141a] border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary transition-all"
        {...props}
      />
    </div>
  );
}

// ─── Departments ─────────────────────────────────────────────
function Departments() {
  const { departments, addDepartment } = useAppContext();
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: '', head: '' });

  const handleAdd = () => {
    if (!form.name.trim()) return toast.error('Name required');
    addDepartment(form);
    toast.success('Department created!');
    setShowModal(false);
    setForm({ name: '', head: '' });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm text-muted">{departments.length} departments</span>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-primary text-black rounded-lg text-xs font-medium"
        >
          <Plus className="w-3.5 h-3.5" /> Add
        </button>
      </div>

      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border text-xs text-muted">
            <th className="text-left py-2 px-3">Department</th>
            <th className="text-left py-2 px-3">Head</th>
            <th className="text-left py-2 px-3">Employees</th>
            <th className="text-left py-2 px-3">Status</th>
            <th className="py-2 px-3" />
          </tr>
        </thead>
        <tbody className="divide-y divide-border/50">
          {departments.map(dept => (
            <tr key={dept.id} className="hover:bg-card-hover transition-colors">
              <td className="py-2.5 px-3 font-medium">{dept.name}</td>
              <td className="py-2.5 px-3 text-muted">{dept.head}</td>
              <td className="py-2.5 px-3 text-muted">{dept.employeeCount}</td>
              <td className="py-2.5 px-3">
                <span className="inline-flex items-center gap-1 text-xs text-primary">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full" /> {dept.status}
                </span>
              </td>
              <td className="py-2.5 px-3 text-right">
                <button className="text-muted hover:text-foreground p-1"><Pencil className="w-3.5 h-3.5" /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <Modal title="Add Department" onClose={() => setShowModal(false)}>
          <div className="space-y-4">
            <InputField label="Department Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="e.g. Finance" />
            <InputField label="Department Head" value={form.head} onChange={e => setForm({ ...form, head: e.target.value })} placeholder="Employee name" />
            <div className="flex gap-3 pt-2">
              <button onClick={() => setShowModal(false)} className="flex-1 py-2 border border-border rounded-lg text-sm text-muted hover:text-foreground">Cancel</button>
              <button onClick={handleAdd} className="flex-1 py-2 bg-primary text-black rounded-lg text-sm font-medium">Create</button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ─── Categories ───────────────────────────────────────────────
function Categories() {
  const { categories, addCategory } = useAppContext();
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: '', description: '', warrantyYears: '' });

  const handleAdd = () => {
    if (!form.name.trim()) return toast.error('Name required');
    addCategory({ ...form, warrantyYears: Number(form.warrantyYears) });
    toast.success('Category created!');
    setShowModal(false);
    setForm({ name: '', description: '', warrantyYears: '' });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm text-muted">{categories.length} categories</span>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-primary text-black rounded-lg text-xs font-medium"
        >
          <Plus className="w-3.5 h-3.5" /> Add
        </button>
      </div>

      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border text-xs text-muted">
            <th className="text-left py-2 px-3">Category</th>
            <th className="text-left py-2 px-3">Description</th>
            <th className="text-left py-2 px-3">Assets</th>
            <th className="text-left py-2 px-3">Warranty (yrs)</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border/50">
          {categories.map(cat => (
            <tr key={cat.id} className="hover:bg-card-hover transition-colors">
              <td className="py-2.5 px-3 font-medium">{cat.name}</td>
              <td className="py-2.5 px-3 text-muted text-xs">{cat.description}</td>
              <td className="py-2.5 px-3 text-muted">{cat.assetCount}</td>
              <td className="py-2.5 px-3 text-muted">{cat.warrantyYears}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <Modal title="Add Category" onClose={() => setShowModal(false)}>
          <div className="space-y-4">
            <InputField label="Category Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="e.g. Safety Equipment" />
            <InputField label="Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="Short description" />
            <InputField label="Warranty Years" type="number" value={form.warrantyYears} onChange={e => setForm({ ...form, warrantyYears: e.target.value })} placeholder="e.g. 2" />
            <div className="flex gap-3 pt-2">
              <button onClick={() => setShowModal(false)} className="flex-1 py-2 border border-border rounded-lg text-sm text-muted">Cancel</button>
              <button onClick={handleAdd} className="flex-1 py-2 bg-primary text-black rounded-lg text-sm font-medium">Create</button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ─── Employees ───────────────────────────────────────────────
function Employees() {
  const { employees, addEmployee, updateEmployeeRole, departments } = useAppContext();
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', dept: '', role: 'Employee' });

  const handleAdd = () => {
    if (!form.name.trim() || !form.email.trim()) return toast.error('Name and email required');
    addEmployee(form);
    toast.success('Employee added!');
    setShowModal(false);
    setForm({ name: '', email: '', dept: '', role: 'Employee' });
  };

  const handleRoleChange = (id, role) => {
    updateEmployeeRole(id, role);
    toast.success('Role updated');
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm text-muted">{employees.length} employees</span>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-primary text-black rounded-lg text-xs font-medium"
        >
          <Plus className="w-3.5 h-3.5" /> Add
        </button>
      </div>

      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border text-xs text-muted">
            <th className="text-left py-2 px-3">Name</th>
            <th className="text-left py-2 px-3">Email</th>
            <th className="text-left py-2 px-3">Department</th>
            <th className="text-left py-2 px-3">Role</th>
            <th className="text-left py-2 px-3">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border/50">
          {employees.map(emp => (
            <tr key={emp.id} className="hover:bg-card-hover transition-colors">
              <td className="py-2.5 px-3 font-medium flex items-center gap-2">
                <img src={`https://i.pravatar.cc/150?u=${emp.email}`} className="w-6 h-6 rounded-full" alt="" />
                {emp.name}
              </td>
              <td className="py-2.5 px-3 text-muted text-xs">{emp.email}</td>
              <td className="py-2.5 px-3 text-muted">{emp.dept}</td>
              <td className="py-2.5 px-3">
                <select
                  value={emp.role}
                  onChange={e => handleRoleChange(emp.id, e.target.value)}
                  className="bg-[#10141a] border border-border rounded px-2 py-1 text-xs focus:outline-none focus:border-primary"
                >
                  {['Employee', 'Department Head', 'Asset Manager', 'Admin'].map(r => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
              </td>
              <td className="py-2.5 px-3">
                <span className="text-xs text-primary">● {emp.status}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <Modal title="Add Employee" onClose={() => setShowModal(false)}>
          <div className="space-y-4">
            <InputField label="Full Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="John Doe" />
            <InputField label="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="john@company.com" />
            <div>
              <label className="block text-xs text-muted mb-1">Department</label>
              <select
                value={form.dept}
                onChange={e => setForm({ ...form, dept: e.target.value })}
                className="w-full bg-[#10141a] border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary"
              >
                <option value="">Select...</option>
                {departments.map(d => <option key={d.id} value={d.name}>{d.name}</option>)}
              </select>
            </div>
            <div className="flex gap-3 pt-2">
              <button onClick={() => setShowModal(false)} className="flex-1 py-2 border border-border rounded-lg text-sm text-muted">Cancel</button>
              <button onClick={handleAdd} className="flex-1 py-2 bg-primary text-black rounded-lg text-sm font-medium">Add</button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────
export default function Organization() {
  const [activeTab, setActiveTab] = useState('Departments');
  const tabs = ['Departments', 'Categories', 'Employees'];

  return (
    <div className="p-6 space-y-4">
      <div>
        <h1 className="text-xl font-semibold">Organization Setup</h1>
        <p className="text-xs text-muted mt-0.5">Admin only — manage departments, categories, and employees</p>
      </div>

      <div className="flex gap-2 p-1 bg-card border border-border rounded-xl w-fit">
        {tabs.map(tab => <Tab key={tab} label={tab} active={activeTab === tab} onClick={() => setActiveTab(tab)} />)}
      </div>

      <div className="bg-card border border-border rounded-xl p-5">
        {activeTab === 'Departments' && <Departments />}
        {activeTab === 'Categories' && <Categories />}
        {activeTab === 'Employees' && <Employees />}
      </div>
    </div>
  );
}

import { useState, useEffect, type FormEvent } from 'react';

/* ═══════════════════════════════════════════════════════════
   Types
   ═══════════════════════════════════════════════════════════ */
interface Student {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  enrollmentDate: string;
  major: string;
  gpa: number;
  status: 'active' | 'inactive' | 'graduated';
}

interface User { name: string; email: string; }
interface Account { name: string; email: string; password: string; }

/* ═══════════════════════════════════════════════════════════
   Demo data
   ═══════════════════════════════════════════════════════════ */
const INITIAL_STUDENTS: Student[] = [
  { id: '1', firstName: 'Jean', lastName: 'Dupont', email: 'jean.dupont@university.com', phone: '06 12 34 56 78', dateOfBirth: '2000-05-15', enrollmentDate: '2022-09-01', major: 'Informatique', gpa: 3.8, status: 'active' },
  { id: '2', firstName: 'Marie', lastName: 'Martin', email: 'marie.martin@university.com', phone: '07 23 45 67 89', dateOfBirth: '2001-03-20', enrollmentDate: '2022-09-01', major: 'Génie Civil', gpa: 3.9, status: 'active' },
  { id: '3', firstName: 'Ahmed', lastName: 'Benali', email: 'ahmed.benali@university.com', phone: '06 98 76 54 32', dateOfBirth: '1999-11-10', enrollmentDate: '2021-09-01', major: 'Commerce', gpa: 3.5, status: 'graduated' },
  { id: '4', firstName: 'Sophie', lastName: 'Leclerc', email: 'sophie.leclerc@university.com', phone: '07 11 22 33 44', dateOfBirth: '2002-07-25', enrollmentDate: '2023-09-01', major: 'Mathématiques', gpa: 3.2, status: 'active' },
  { id: '5', firstName: 'Youssef', lastName: 'El Amrani', email: 'youssef.elamrani@university.com', phone: '06 55 66 77 88', dateOfBirth: '2000-01-30', enrollmentDate: '2021-09-01', major: 'Informatique', gpa: 2.8, status: 'inactive' },
  { id: '6', firstName: 'Fatima', lastName: 'Zahra', email: 'fatima.zahra@university.com', phone: '06 44 33 22 11', dateOfBirth: '2001-08-12', enrollmentDate: '2022-09-01', major: 'Médecine', gpa: 3.7, status: 'active' },
];

const INITIAL_ACCOUNTS: Account[] = [
  { name: 'Demo User', email: 'demo@gmail.com', password: 'demo123' },
  { name: 'Samuel Ndzegha', email: 's.ndzeghaboungou@esisa.ac.ma', password: 'admin123' },
];

const MAJORS = [
  'Informatique', 'Génie Civil', 'Commerce', 'Mathématiques',
  'Physique', 'Chimie', 'Biologie', 'Lettres', 'Droit', 'Médecine',
  'Génie Électrique', 'Génie Mécanique', 'Économie',
];

/* ═══════════════════════════════════════════════════════════
   Storage helpers (localStorage)
   ═══════════════════════════════════════════════════════════ */
const K = { students: 'stu_students', user: 'stu_user', accounts: 'stu_accounts' };

function load<T>(key: string, fallback: T): T {
  try { const raw = localStorage.getItem(key); return raw ? JSON.parse(raw) : fallback; }
  catch { return fallback; }
}
function save(key: string, v: unknown) { localStorage.setItem(key, JSON.stringify(v)); }

/* ═══════════════════════════════════════════════════════════
   LoginScreen
   ═══════════════════════════════════════════════════════════ */
function LoginScreen({ onLogin, onSwitch }: { onLogin: (u: User) => void; onSwitch: () => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const submit = (e: FormEvent) => {
    e.preventDefault();
    setError('');
    const accounts: Account[] = load(K.accounts, INITIAL_ACCOUNTS);
    const found = accounts.find(a => a.email === email && a.password === password);
    if (found) onLogin({ name: found.name, email: found.email });
    else setError('Email ou mot de passe incorrect');
  };

  return (
    <div className="auth-bg">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-icon">📚</div>
          <h1>Bienvenue</h1>
          <p>Système de Gestion des Étudiants</p>
        </div>
        <form onSubmit={submit} className="auth-form">
          {error && <div className="error-msg">{error}</div>}
          <div className="form-group">
            <label>Adresse email</label>
            <input type="email" className="input-field" value={email}
              onChange={e => setEmail(e.target.value)} placeholder="email@exemple.com" required />
          </div>
          <div className="form-group">
            <label>Mot de passe</label>
            <input type="password" className="input-field" value={password}
              onChange={e => setPassword(e.target.value)} placeholder="••••••••" required />
          </div>
          <button type="submit" className="btn btn-primary btn-block">Se connecter</button>
          <div className="auth-hint">
            <p>Comptes démo :</p>
            <code>demo@gmail.com / demo123</code>
          </div>
        </form>
        <div className="auth-footer">
          Pas encore de compte ?{' '}
          <button className="link-btn" onClick={onSwitch}>S'inscrire</button>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   RegisterScreen
   ═══════════════════════════════════════════════════════════ */
function RegisterScreen({ onRegister, onSwitch }: { onRegister: (u: User) => void; onSwitch: () => void }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');

  const submit = (e: FormEvent) => {
    e.preventDefault();
    setError('');
    if (password.length < 6) { setError('Le mot de passe doit contenir au moins 6 caractères'); return; }
    if (password !== confirm) { setError('Les mots de passe ne correspondent pas'); return; }
    const accounts: Account[] = load(K.accounts, INITIAL_ACCOUNTS);
    if (accounts.find(a => a.email === email)) { setError('Cet email est déjà utilisé'); return; }
    accounts.push({ name, email, password });
    save(K.accounts, accounts);
    onRegister({ name, email });
  };

  return (
    <div className="auth-bg">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-icon">📚</div>
          <h1>Créer un compte</h1>
          <p>Rejoignez la plateforme</p>
        </div>
        <form onSubmit={submit} className="auth-form">
          {error && <div className="error-msg">{error}</div>}
          <div className="form-group">
            <label>Nom complet</label>
            <input type="text" className="input-field" value={name}
              onChange={e => setName(e.target.value)} placeholder="Jean Dupont" required />
          </div>
          <div className="form-group">
            <label>Adresse email</label>
            <input type="email" className="input-field" value={email}
              onChange={e => setEmail(e.target.value)} placeholder="email@exemple.com" required />
          </div>
          <div className="form-group">
            <label>Mot de passe</label>
            <input type="password" className="input-field" value={password}
              onChange={e => setPassword(e.target.value)} placeholder="Min. 6 caractères" required />
          </div>
          <div className="form-group">
            <label>Confirmer le mot de passe</label>
            <input type="password" className="input-field" value={confirm}
              onChange={e => setConfirm(e.target.value)} placeholder="••••••••" required />
          </div>
          <button type="submit" className="btn btn-primary btn-block">S'inscrire</button>
        </form>
        <div className="auth-footer">
          Déjà un compte ?{' '}
          <button className="link-btn" onClick={onSwitch}>Se connecter</button>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   Navbar
   ═══════════════════════════════════════════════════════════ */
function Navbar({ user, onLogout }: { user: User; onLogout: () => void }) {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <span>📚</span>
        <span>Student Management</span>
      </div>
      <div className="navbar-user">
        <div className="navbar-avatar">{user.name.charAt(0).toUpperCase()}</div>
        <div className="navbar-info">
          <p>{user.name}</p>
          <p>{user.email}</p>
        </div>
        <button className="btn-logout" onClick={onLogout}>Déconnexion</button>
      </div>
    </nav>
  );
}

/* ═══════════════════════════════════════════════════════════
   StatsCards
   ═══════════════════════════════════════════════════════════ */
function StatsCards({ students }: { students: Student[] }) {
  const total = students.length;
  const active = students.filter(s => s.status === 'active').length;
  const graduated = students.filter(s => s.status === 'graduated').length;
  const avgGpa = total > 0 ? (students.reduce((sum, s) => sum + s.gpa, 0) / total).toFixed(2) : '0.00';

  const cards = [
    { icon: '👥', label: 'Total étudiants', value: total, bg: '#ede9fe', color: '#6d28d9' },
    { icon: '✅', label: 'Actifs', value: active, bg: '#dcfce7', color: '#15803d' },
    { icon: '🎓', label: 'Diplômés', value: graduated, bg: '#dbeafe', color: '#1d4ed8' },
    { icon: '📊', label: 'Moyenne GPA', value: avgGpa, bg: '#fef3c7', color: '#b45309' },
  ];

  return (
    <div className="stats-grid">
      {cards.map(c => (
        <div className="stat-card" key={c.label}>
          <div className="stat-icon" style={{ background: c.bg, color: c.color }}>{c.icon}</div>
          <div className="stat-info">
            <h3>{c.value}</h3>
            <p>{c.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   Controls (Search + Filter + Add button)
   ═══════════════════════════════════════════════════════════ */
function Controls({ search, onSearch, statusFilter, onFilter, onAdd }: {
  search: string; onSearch: (v: string) => void;
  statusFilter: string; onFilter: (v: string) => void;
  onAdd: () => void;
}) {
  return (
    <div className="controls-bar">
      <div className="search-wrapper">
        <span className="search-icon">🔍</span>
        <input type="text" className="search-input" placeholder="Rechercher un étudiant..."
          value={search} onChange={e => onSearch(e.target.value)} />
      </div>
      <select className="select-input" value={statusFilter} onChange={e => onFilter(e.target.value)}>
        <option value="all">Tous les statuts</option>
        <option value="active">Actif</option>
        <option value="inactive">Inactif</option>
        <option value="graduated">Diplômé</option>
      </select>
      <button className="btn btn-primary" onClick={onAdd}>➕ Ajouter</button>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   StudentTable
   ═══════════════════════════════════════════════════════════ */
const STATUS_LABELS: Record<string, string> = { active: 'Actif', inactive: 'Inactif', graduated: 'Diplômé' };

function StudentTable({ students, onEdit, onDelete }: {
  students: Student[];
  onEdit: (s: Student) => void;
  onDelete: (id: string) => void;
}) {
  if (students.length === 0) {
    return (
      <div className="table-wrapper">
        <div className="empty-state">
          <div className="empty-icon">📭</div>
          <h3>Aucun étudiant trouvé</h3>
          <p>Modifiez vos filtres ou ajoutez un nouvel étudiant.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="table-wrapper">
      <div className="table-scroll">
        <table className="student-table">
          <thead>
            <tr>
              <th>Nom</th>
              <th>Email</th>
              <th>Filière</th>
              <th>GPA</th>
              <th>Statut</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map(s => (
              <tr key={s.id}>
                <td>
                  <div className="student-name">{s.firstName} {s.lastName}</div>
                </td>
                <td className="student-email">{s.email}</td>
                <td>{s.major}</td>
                <td><strong>{s.gpa.toFixed(1)}</strong></td>
                <td>
                  <span className={`badge badge-${s.status}`}>
                    {STATUS_LABELS[s.status]}
                  </span>
                </td>
                <td>
                  <div className="actions-cell">
                    <button className="btn btn-secondary btn-sm" onClick={() => onEdit(s)}>✏️ Modifier</button>
                    <button className="btn btn-danger btn-sm" onClick={() => onDelete(s.id)}>🗑️</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   StudentModal (Add / Edit)
   ═══════════════════════════════════════════════════════════ */
function StudentModal({ student, onSave, onClose }: {
  student: Student | null;
  onSave: (data: Partial<Student>) => void;
  onClose: () => void;
}) {
  const isEdit = !!student;
  const [firstName, setFirstName] = useState(student?.firstName ?? '');
  const [lastName, setLastName] = useState(student?.lastName ?? '');
  const [email, setEmail] = useState(student?.email ?? '');
  const [phone, setPhone] = useState(student?.phone ?? '');
  const [dateOfBirth, setDateOfBirth] = useState(student?.dateOfBirth ?? '');
  const [major, setMajor] = useState(student?.major ?? MAJORS[0]);
  const [gpa, setGpa] = useState(student?.gpa ?? 0);
  const [status, setStatus] = useState<Student['status']>(student?.status ?? 'active');
  const [error, setError] = useState('');

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!firstName.trim() || !lastName.trim() || !email.trim()) {
      setError('Prénom, nom et email sont obligatoires'); return;
    }
    onSave({ firstName: firstName.trim(), lastName: lastName.trim(), email: email.trim(), phone, dateOfBirth, major, gpa, status });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{isEdit ? '✏️ Modifier l\'étudiant' : '➕ Nouvel étudiant'}</h2>
          <button className="modal-close" onClick={onClose}>&times;</button>
        </div>
        <form onSubmit={submit}>
          <div className="modal-body">
            {error && <div className="error-msg">{error}</div>}
            <div className="form-row">
              <div className="form-group">
                <label>Prénom *</label>
                <input className="input-field" value={firstName} onChange={e => setFirstName(e.target.value)} required />
              </div>
              <div className="form-group">
                <label>Nom *</label>
                <input className="input-field" value={lastName} onChange={e => setLastName(e.target.value)} required />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Email *</label>
                <input type="email" className="input-field" value={email} onChange={e => setEmail(e.target.value)} required />
              </div>
              <div className="form-group">
                <label>Téléphone</label>
                <input className="input-field" value={phone} onChange={e => setPhone(e.target.value)} placeholder="06 12 34 56 78" />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Date de naissance</label>
                <input type="date" className="input-field" value={dateOfBirth} onChange={e => setDateOfBirth(e.target.value)} />
              </div>
              <div className="form-group">
                <label>Filière</label>
                <select className="input-field" value={major} onChange={e => setMajor(e.target.value)}>
                  {MAJORS.map(m => <option key={m} value={m}>{m}</option>)}
                </select>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>GPA (0 - 4)</label>
                <input type="number" className="input-field" min="0" max="4" step="0.1"
                  value={gpa} onChange={e => setGpa(parseFloat(e.target.value) || 0)} />
              </div>
              <div className="form-group">
                <label>Statut</label>
                <select className="input-field" value={status} onChange={e => setStatus(e.target.value as Student['status'])}>
                  <option value="active">Actif</option>
                  <option value="inactive">Inactif</option>
                  <option value="graduated">Diplômé</option>
                </select>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Annuler</button>
            <button type="submit" className="btn btn-primary">{isEdit ? 'Enregistrer' : 'Ajouter'}</button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   DeleteModal
   ═══════════════════════════════════════════════════════════ */
function DeleteModal({ student, onConfirm, onCancel }: {
  student: Student; onConfirm: () => void; onCancel: () => void;
}) {
  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: 400 }}>
        <div className="delete-body">
          <div className="delete-icon">⚠️</div>
          <h3>Supprimer cet étudiant ?</h3>
          <p><strong>{student.firstName} {student.lastName}</strong> sera supprimé définitivement.</p>
          <div className="delete-actions">
            <button className="btn btn-secondary" onClick={onCancel}>Annuler</button>
            <button className="btn btn-danger" onClick={onConfirm}>Supprimer</button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   Main App
   ═══════════════════════════════════════════════════════════ */
export default function StudentApp() {
  const [user, setUser] = useState<User | null>(null);
  const [authScreen, setAuthScreen] = useState<'login' | 'register'>('login');
  const [students, setStudents] = useState<Student[]>([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [modal, setModal] = useState<{ open: boolean; student: Student | null }>({ open: false, student: null });
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setUser(load<User | null>(K.user, null));
    setStudents(load<Student[]>(K.students, INITIAL_STUDENTS));
    setReady(true);
  }, []);

  useEffect(() => { if (ready) save(K.students, students); }, [students, ready]);

  const login = (u: User) => { setUser(u); save(K.user, u); };
  const logout = () => { setUser(null); save(K.user, null); };

  const addStudent = (data: Partial<Student>) => {
    const s: Student = {
      ...(data as Omit<Student, 'id' | 'enrollmentDate'>),
      id: Date.now().toString(),
      enrollmentDate: new Date().toISOString().split('T')[0],
    };
    setStudents(prev => [...prev, s]);
  };

  const updateStudent = (id: string, data: Partial<Student>) => {
    setStudents(prev => prev.map(s => s.id === id ? { ...s, ...data } : s));
  };

  const deleteStudent = (id: string) => {
    setStudents(prev => prev.filter(s => s.id !== id));
    setDeleteId(null);
  };

  const filtered = students.filter(s => {
    const q = search.toLowerCase();
    const matchSearch = !q || `${s.firstName} ${s.lastName} ${s.email} ${s.major}`.toLowerCase().includes(q);
    const matchStatus = statusFilter === 'all' || s.status === statusFilter;
    return matchSearch && matchStatus;
  });

  if (!ready) return <div className="loading">Chargement…</div>;

  if (!user) {
    return authScreen === 'login'
      ? <LoginScreen onLogin={login} onSwitch={() => setAuthScreen('register')} />
      : <RegisterScreen onRegister={login} onSwitch={() => setAuthScreen('login')} />;
  }

  return (
    <div>
      <Navbar user={user} onLogout={logout} />
      <main className="main-content">
        <div className="page-header">
          <h1>Gestion des Étudiants</h1>
          <p>Gérez et suivez les informations des étudiants</p>
        </div>
        <StatsCards students={students} />
        <Controls
          search={search} onSearch={setSearch}
          statusFilter={statusFilter} onFilter={setStatusFilter}
          onAdd={() => setModal({ open: true, student: null })}
        />
        <StudentTable
          students={filtered}
          onEdit={s => setModal({ open: true, student: s })}
          onDelete={id => setDeleteId(id)}
        />
      </main>

      {modal.open && (
        <StudentModal
          student={modal.student}
          onSave={data => {
            if (modal.student) updateStudent(modal.student.id, data);
            else addStudent(data);
            setModal({ open: false, student: null });
          }}
          onClose={() => setModal({ open: false, student: null })}
        />
      )}

      {deleteId && students.find(s => s.id === deleteId) && (
        <DeleteModal
          student={students.find(s => s.id === deleteId)!}
          onConfirm={() => deleteStudent(deleteId)}
          onCancel={() => setDeleteId(null)}
        />
      )}
    </div>
  );
}

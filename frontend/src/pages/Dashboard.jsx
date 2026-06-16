import { useEffect, useState } from 'react';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import TaskCard from '../components/TaskCard';
import TaskForm from '../components/TaskForm';

const COLUMNS = [
  { key: 'pending', label: 'Pending' },
  { key: 'in-progress', label: 'In progress' },
  { key: 'completed', label: 'Completed' },
];

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [error, setError] = useState('');

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const res = await api.get('/tasks');
      setTasks(res.data);
    } catch (err) {
      setError('Could not load tasks.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleSave = async (data) => {
    try {
      if (editingTask) {
        const res = await api.put(`/tasks/${editingTask._id}`, data);
        setTasks((prev) => prev.map((t) => (t._id === res.data._id ? res.data : t)));
      } else {
        const res = await api.post('/tasks', data);
        setTasks((prev) => [res.data, ...prev]);
      }
      setFormOpen(false);
      setEditingTask(null);
    } catch (err) {
      setError('Could not save task.');
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      setTasks((prev) => prev.filter((t) => t._id !== id));
    } catch (err) {
      setError('Could not delete task.');
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      const res = await api.put(`/tasks/${id}`, { status });
      setTasks((prev) => prev.map((t) => (t._id === id ? res.data : t)));
    } catch (err) {
      setError('Could not update status.');
    }
  };

  const openEdit = (task) => {
    setEditingTask(task);
    setFormOpen(true);
  };

  const openCreate = () => {
    setEditingTask(null);
    setFormOpen(true);
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div>
          <p className="dashboard-eyebrow">Ledger</p>
          <h1>{user?.name}&apos;s tasks</h1>
        </div>
        <div className="dashboard-header-actions">
          <button className="btn-primary" onClick={openCreate}>
            + New task
          </button>
          <button className="btn-ghost" onClick={logout}>
            Log out
          </button>
        </div>
      </header>

      {error && <p className="form-error">{error}</p>}

      {loading ? (
        <p className="dashboard-loading">Loading tasks…</p>
      ) : (
        <div className="board">
          {COLUMNS.map((col) => {
            const colTasks = tasks.filter((t) => t.status === col.key);
            return (
              <div key={col.key} className="board-column">
                <div className="board-column-header">
                  <h2>{col.label}</h2>
                  <span className="column-count">{colTasks.length}</span>
                </div>
                <div className="board-column-body">
                  {colTasks.length === 0 && <p className="column-empty">Nothing here yet.</p>}
                  {colTasks.map((task) => (
                    <TaskCard
                      key={task._id}
                      task={task}
                      onEdit={openEdit}
                      onDelete={handleDelete}
                      onStatusChange={handleStatusChange}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {formOpen && (
        <TaskForm
          initialTask={editingTask}
          onSave={handleSave}
          onClose={() => {
            setFormOpen(false);
            setEditingTask(null);
          }}
        />
      )}
    </div>
  );
}

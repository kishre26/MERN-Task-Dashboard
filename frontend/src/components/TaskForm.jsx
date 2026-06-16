import { useState, useEffect } from 'react';

export default function TaskForm({ initialTask, onSave, onClose }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('pending');
  const [priority, setPriority] = useState('medium');
  const [dueDate, setDueDate] = useState('');
  const [tags, setTags] = useState('');

  useEffect(() => {
    if (initialTask) {
      setTitle(initialTask.title || '');
      setDescription(initialTask.description || '');
      setStatus(initialTask.status || 'pending');
      setPriority(initialTask.priority || 'medium');
      setDueDate(initialTask.dueDate ? initialTask.dueDate.slice(0, 10) : '');
      setTags(initialTask.tags?.join(', ') || '');
    }
  }, [initialTask]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      title,
      description,
      status,
      priority,
      dueDate: dueDate || null,
      tags: tags
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <h2>{initialTask ? 'Edit task' : 'New task'}</h2>
        <form onSubmit={handleSubmit} className="task-form">
          <label>
            Title
            <input value={title} onChange={(e) => setTitle(e.target.value)} required />
          </label>
          <label>
            Description
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </label>
          <div className="form-row">
            <label>
              Status
              <select value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="pending">Pending</option>
                <option value="in-progress">In progress</option>
                <option value="completed">Completed</option>
              </select>
            </label>
            <label>
              Priority
              <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </label>
          </div>
          <label>
            Due date
            <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
          </label>
          <label>
            Tags (comma-separated)
            <input
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="urgent, frontend"
            />
          </label>

          <div className="modal-actions">
            <button type="button" className="btn-ghost" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              {initialTask ? 'Save changes' : 'Create task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

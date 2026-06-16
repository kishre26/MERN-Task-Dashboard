export default function TaskCard({ task, onEdit, onDelete, onStatusChange }) {
  return (
    <div className={`task-card priority-${task.priority}`}>
      <div className="task-card-top">
        <span className={`priority-tag priority-tag-${task.priority}`}>{task.priority}</span>
        {task.dueDate && (
          <span className="task-due">
            {new Date(task.dueDate).toLocaleDateString('en-GB', {
              day: '2-digit',
              month: 'short',
            })}
          </span>
        )}
      </div>

      <h3>{task.title}</h3>
      {task.description && <p className="task-desc">{task.description}</p>}

      {task.tags?.length > 0 && (
        <div className="task-tags">
          {task.tags.map((tag) => (
            <span key={tag} className="task-tag">
              #{tag}
            </span>
          ))}
        </div>
      )}

      <div className="task-card-actions">
        <select
          value={task.status}
          onChange={(e) => onStatusChange(task._id, e.target.value)}
        >
          <option value="pending">Pending</option>
          <option value="in-progress">In progress</option>
          <option value="completed">Completed</option>
        </select>
        <div className="task-card-buttons">
          <button onClick={() => onEdit(task)} className="btn-ghost">
            Edit
          </button>
          <button onClick={() => onDelete(task._id)} className="btn-ghost btn-danger">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

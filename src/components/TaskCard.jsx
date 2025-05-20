const TaskCard = ({ task, onEdit, onDelete }) => {
  const handleDragStart = (e) => {
    e.dataTransfer.setData('taskId', task.id);
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      className={`card mb-2 shadow-sm cursor-move ${
        task.priority === 'high' ? 'border-danger' : task.priority === 'medium' ? 'border-warning' : 'border-success'
      }`}
    >
      <div className="card-body">
        <h5 className="card-title">{task.title}</h5>
        <p className="card-text text-muted">{task.description}</p>
        <p className="card-text small">Due: {task.dueDate || 'N/A'}</p>
        <p className="card-text small text-capitalize">Priority: {task.priority}</p>
        <div className="d-flex gap-2">
          <button
            onClick={() => onEdit(task)}
            className="btn btn-sm btn-primary"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="btn btn-sm btn-danger"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
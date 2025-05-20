import TaskCard from './TaskCard';

const KanbanColumn = ({ title, tasks, droppableId, onEdit, onDelete, onDrop }) => {
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData('taskId');
    onDrop(taskId, droppableId);
  };

  return (
    <div
      className="col-12 col-md-4 p-3 bg-light rounded"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <h2 className="h5 mb-3">{title}</h2>
      <div style={{ minHeight: '200px' }}>
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default KanbanColumn;
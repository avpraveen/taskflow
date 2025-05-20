import { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { useTasks } from './hooks/useTasks';
import KanbanColumn from './components/KanbanColumn';
import TaskForm from './components/TaskForm';

function App() {
  const { tasks, addTask, updateTask, deleteTask, moveTask } = useTasks();
  const [editingTask, setEditingTask] = useState(null);

  const handleDrop = (taskId, newStatus) => {
    moveTask(taskId, newStatus);
  };

  const handleEdit = (task) => {
    setEditingTask(task);
  };

  const handleUpdate = (updatedTask) => {
    updateTask(editingTask.id, updatedTask);
    setEditingTask(null);
  };

  const columns = {
    todo: tasks.filter(task => task.status === 'todo'),
    inProgress: tasks.filter(task => task.status === 'inProgress'),
    done: tasks.filter(task => task.status === 'done'),
  };

  return (
    <div className="min-vh-100 p-3 bg-body">
      <header className="mb-4">
        <h1 className="display-5 text-center">TaskFlow</h1>
        <nav className="mt-3 d-flex justify-content-center gap-2">
          <Link to="/" className="btn btn-primary">
            Kanban Board
          </Link>
          <Link to="/add-task" className="btn btn-success">
            Add Task
          </Link>
        </nav>
      </header>
      <Routes>
        <Route
          path="/"
          element={
            <div className="row">
              <KanbanColumn
                title="To-Do"
                tasks={columns.todo}
                droppableId="todo"
                onEdit={handleEdit}
                onDelete={deleteTask}
                onDrop={handleDrop}
              />
              <KanbanColumn
                title="In Progress"
                tasks={columns.inProgress}
                droppableId="inProgress"
                onEdit={handleEdit}
                onDelete={deleteTask}
                onDrop={handleDrop}
              />
              <KanbanColumn
                title="Done"
                tasks={columns.done}
                droppableId="done"
                onEdit={handleEdit}
                onDelete={deleteTask}
                onDrop={handleDrop}
              />
            </div>
          }
        />
        <Route
          path="/add-task"
          element={<TaskForm onSubmit={addTask} />}
        />
      </Routes>
      {editingTask && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Task</h5>
                <button type="button" className="btn-close" onClick={() => setEditingTask(null)}></button>
              </div>
              <div className="modal-body">
                <TaskForm
                  initialTask={editingTask}
                  onSubmit={handleUpdate}
                  onCancel={() => setEditingTask(null)}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
import React, { useState } from 'react';
import cn from 'classnames';

import { Todo } from '../../types/Todo';

interface Props {
  todo: Todo;
  onUpdate: (id: number, updatedTodo: Partial<Todo>) => void;
  onDelete: (id: number) => void;
  isTempToDo?: boolean;
}

export const ToDoItem: React.FC<Props> = ({
  todo,
  onUpdate,
  onDelete,
  isTempToDo = false,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.title);

  const handleEditChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditText(event.target.value);
  };

  const handleSave = () => {
    onUpdate(todo.id, { title: editText });
  };

  const handleDelete = () => {
    onDelete(todo.id);
  };

  return (
    <div data-cy="Todo" className={cn('todo', { completed: todo.completed })}>
      {/* eslint-disable jsx-a11y/label-has-associated-control */}
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={todo.completed}
          onChange={() => onUpdate(todo.id, { completed: !todo.completed })}
        />
      </label>
      <span data-cy="TodoTitle" className="todo__title">
        {isEditing ? (
          <input
            type="text"
            value={editText}
            onChange={handleEditChange}
            onBlur={handleSave}
            autoFocus
          />
        ) : (
          <label onDoubleClick={() => setIsEditing(true)}>{todo.title}</label>
        )}
      </span>
      <button
        type="button"
        className="todo__remove"
        data-cy="TodoDelete"
        onClick={handleDelete}
      >
        ×
      </button>
      <div
        data-cy="TodoLoader"
        className={`modal overlay ${isTempToDo ? 'is-active' : ''}`}
      >
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
};
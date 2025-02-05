import { useState } from "react";
import "./tasks.css";

const Tasks = ({ info, removeItem, filterParams, updateTask }) => {
  const [editingTaskId, setEditingTaskId] = useState(null); // Состояние для редактируемой задачи
  const [editedTaskName, setEditedTaskName] = useState(""); // Состояние для нового названия задачи

  const filteredInfo =
    filterParams === null
      ? info.sort((item1, item2) => item2.id - item1.id)
      : info.filter((item) => item.isDone === filterParams);

  const handleEditClick = (item) => {
    setEditingTaskId(item.id);
    setEditedTaskName(item.title);
  };

  const handleSaveEdit = () => {
    updateTask(editingTaskId, editedTaskName);
    setEditingTaskId(0);
  };

  return (
    <div className="datainfo">
      {filteredInfo.map((item) => (
        <div key={item.id} className="item-container">
          <div className="title">
            <input
              className="input_check"
              checked={item.isDone}
              type="checkbox"
              onChange={(e) =>
                updateTask(item.id, item.title, e.target.checked)
              }
            />
            {editingTaskId === item.id ? (
              // Когда задача в режиме редактирования
              <div className="edit-form">
                <input
                  type="text"
                  value={editedTaskName}
                  onChange={(e) => setEditedTaskName(e.target.value)}
                  // autoFocus
                />
              </div>
            ) : (
              // Когда задача не редактируется
              <span className={`info_items ${item.isDone ? "isDone" : ""}`}>
                {item.title}
              </span>
            )}

            <div className="icons_btn">
              {editingTaskId !== item.id ? (
                // Показываем кнопку редактирования только если задача не редактируется
                <button
                  className="iconsbtnedit"
                  onClick={() => handleEditClick(item)}
                >
                  <img
                    className="btn_icons_edit"
                    src="/images/edit.png"
                    alt="edit"
                  />
                </button>
              ) : (
                // Показываем кнопки "Сохранить" и "Отмена", если задача редактируется
                <>
                  <button className="iconsbtnsave" onClick={handleSaveEdit}>
                    <img
                      className="btn_icons_1"
                      src="/images/seves.png"
                      alt="saves"
                    />
                  </button>
                  <button
                    className="iconsbtnsave"
                    onClick={() => setEditingTaskId(null)}
                  >
                    <img
                      className="btn_icons_1"
                      src="/images/deletes.png"
                      alt="deletes"
                    />
                  </button>
                </>
              )}
              {/* Кнопка удаления остается всегда */}
              <button
                className="iconsbtndelete"
                onClick={() => removeItem(item.id)}
              >
                <img
                  className="btn_icons_delete"
                  src="/images/delete.png"
                  alt="delete"
                />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Tasks;

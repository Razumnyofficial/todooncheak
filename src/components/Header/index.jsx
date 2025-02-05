import "./header.css";

const Header = ({ inputName, setInputName, addTask }) => {
  return (
    <div className="header">
      <input
        className="input"
        placeholder="Task To Be Done..."
        type="text"
        value={inputName}
        onChange={(e) => setInputName(e.target.value)}
      />
      <button className="btn_color" onClick={addTask}>
        Add
      </button>
    </div>
  );
};

export default Header;

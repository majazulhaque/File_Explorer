import { useState } from "react";

function Folder({ handleAddNode, handleDeleteNode, explorer }) {
  console.log(explorer);
  const [expand, setExpand] = useState(false);
  const [showInput, setShowInput] = useState({
    visible: false,
    isFolder: null,
  });

  const handleNewFolder = (e, type) => {
    e.stopPropagation();
    setExpand(true);
    setShowInput({
      visible: true,
      isFolder: type,
    });
  };

  const handleDeleteFolder = (e) => {
    e.stopPropagation();
    handleDeleteNode(explorer.id);
  };
  const handleExpand = () => {
    setExpand((prev) => !prev);
  };

  const onAddFolder = (e) => {
    if (e.keyCode === 13 && e.target.value) {
      handleAddNode(explorer.id, e.target.value, showInput.isFolder);
      setShowInput({ ...showInput, visible: false });
    }
  };

  if (explorer.isFolder) {
    return (
      <div style={{ marginTop: 5 }}>
        <div className="folder" onClick={handleExpand}>
          <span style={{ whiteSpace: "nowrap" }}>📁 {explorer.name}</span>
          <div style={{ whiteSpace: "nowrap" }}>
            <button onClick={(e) => handleNewFolder(e, true)}>Folder +</button>
            <button onClick={(e) => handleNewFolder(e, false)}>File +</button>
            <button onClick={(e) => handleNewFolder(e, true)}>Update</button>
            <button
              style={{ backgroundColor: "red", color: "white" }}
              onClick={(e) => handleDeleteFolder(e)}
            >
              Delete
            </button>
          </div>
        </div>
        <div
          style={{
            display: expand ? "block" : "none",
            paddingLeft: 25,
          }}
        >
          {showInput.visible && (
            <div className="inputContainer">
              <span>{showInput.isFolder ? "📁" : "📄"} </span>
              <input
                type="text"
                onBlur={() => setShowInput({ ...showInput, visible: false })}
                className="inputContainer_input"
                onKeyDown={onAddFolder}
                autoFocus
              />
            </div>
          )}
          {explorer.items.map((exp) => {
            return (
              <Folder
                handleAddNode={handleAddNode}
                handleDeleteNode={handleDeleteNode}
                explorer={exp}
                key={exp.id}
              />
            );
          })}
        </div>
      </div>
    );
  } else {
    return <span className="file">📄 {explorer.name}</span>;
  }
}

export default Folder;

import { useState } from "react";
import "./styles.css";
import { explorer } from "./data/folderData";
import Folder from "./components/Folder";
import useTraverseTree from "./hooks/use-traverse-tree";

export default function App() {
  const [explorerData, setExplorerData] = useState(explorer);

  const { addNode, deleteNode } = useTraverseTree();

  const handleAddNode = (folderId, item, isFolder) => {
    const finalTree = addNode(explorerData, folderId, item, isFolder);

    setExplorerData(finalTree);
  };

  const handleDeleteNode = (folderId) => {
    console.log(folderId);
    const finalTree = deleteNode(explorerData, folderId);
    console.log(finalTree);

    setExplorerData(finalTree);
  };

  return (
    <div className="App">
      <Folder
        handleAddNode={handleAddNode}
        handleDeleteNode={handleDeleteNode}
        explorer={explorerData}
      />
    </div>
  );
}

const useTraverseTree = () => {
  function addNode(tree, folderId, item, isFolder) {
    if (tree.id === folderId && tree.isFolder) {
      tree.items.unshift({
        id: new Date().getTime(),
        name: item,
        isFolder,
        items: [],
      });
      return tree;
    }
    let latestNode = [];
    latestNode = tree.items.map((obj) => {
      return addNode(obj, folderId, item, isFolder);
    });
    return { ...tree, items: latestNode };
  }

  function deleteNode(tree, folderId) {
    if (!tree.items) return;

    const filteredItem = tree.items
      .map((obj) => {
        return deleteNode(obj, folderId);
      })
      .filter((item) => item.id !== folderId);
    return { ...tree, items: filteredItem };
  }

  return { addNode, deleteNode };
};

export default useTraverseTree;

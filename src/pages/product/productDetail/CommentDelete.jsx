function CommentDelete({ commentId, onDelete }) {
  const handleDelete = () => {
    onDelete(commentId);
  };

  return (
    <button
      className=" px-2 py-1 border-[1px] rounded-md text-warning-color"
      onClick={handleDelete}
    >
      삭제
    </button>
  );
}

export default CommentDelete;

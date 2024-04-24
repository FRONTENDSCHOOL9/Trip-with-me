function CommentDelete({ commentId, onDelete }) {
  const handleDelete = () => {
    if (window.confirm('댓글을 삭제하시겠습니까?')) {
      onDelete(commentId);
    }
  };

  return (
    <button
      className=" px-3 py-2 border-[1px] rounded-md text-warning-color"
      onClick={handleDelete}
    >
      <img src="/assets/icons/icon-delete-bin.svg" alt="삭제" />
    </button>
  );
}

export default CommentDelete;

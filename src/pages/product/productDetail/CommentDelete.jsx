function CommentDelete({ commentId, onDelete }) {
  const handleDelete = () => {
    onDelete(commentId);
  };

  return <button onClick={handleDelete}>삭제</button>;
}

export default CommentDelete;

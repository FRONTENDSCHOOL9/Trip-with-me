import { useState } from 'react';

function CommentEdit({ comment, onSave, onCancel }) {
  const [editText, setEditText] = useState(comment.content);

  const handleSave = () => {
    onSave(comment._id, editText);
  };

  return (
    <div>
      <textarea value={editText} onChange={e => setEditText(e.target.value)} />
      <button onClick={handleSave}>저장</button>
      <button onClick={onCancel}>취소</button>
    </div>
  );
}

export default CommentEdit;

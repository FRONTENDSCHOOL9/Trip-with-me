import { useState } from 'react';

function CommentEdit({ comment, onSave, onCancel }) {
  const [editText, setEditText] = useState(comment.content);

  const handleSave = () => {
    onSave(comment._id, editText);
  };

  return (
    <div className="flex items-center">
      <textarea
        className="w-52 mx-4"
        rows="4"
        cols="40"
        value={editText}
        onChange={e => setEditText(e.target.value)}
      />
      <button
        className="px-2 py-1 mr-1 text-main-color border-[1px] rounded-md"
        onClick={handleSave}
      >
        저장
      </button>
      <button
        className="px-2 py-1 border-[1px] rounded-md text-warning-color"
        onClick={onCancel}
      >
        취소
      </button>
    </div>
  );
}

export default CommentEdit;

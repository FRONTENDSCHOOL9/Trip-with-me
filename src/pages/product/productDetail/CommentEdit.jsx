import { useState } from 'react';

function CommentEdit({ comment, onSave, onCancel }) {
  const [editText, setEditText] = useState(comment.content);

  const handleSave = () => {
    onSave(comment._id, editText);
  };

  return (
    <div className="flex items-center">
      <textarea
        className="mx-4 w-52"
        rows="4"
        cols="40"
        value={editText}
        onChange={e => setEditText(e.target.value)}
      />
      <button
        className="px-3 py-2 mr-1 text-main-color border-[1px] rounded-md"
        onClick={handleSave}
      >
        <img src="/assets/icons/icon-check-line.svg" alt="저장" />
      </button>
      <button
        className="px-3 py-2 border-[1px] rounded-md text-warning-color"
        onClick={onCancel}
      >
        <img src="/assets/icons/icon-close-line.svg" alt="취소" />
      </button>
    </div>
  );
}

export default CommentEdit;

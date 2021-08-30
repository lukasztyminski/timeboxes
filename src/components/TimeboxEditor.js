import React, { useRef } from 'react';

const TimeboxEditor = ({
  onUpdate,
  initialTitle,
  initialTotalTimeInMinutes,
  onCancel,
}) => {
  const titleInput = useRef();
  const totalTimeInMinutesInput = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();
    onUpdate({
      title: titleInput.current.value,
      totalTimeInMinutes: totalTimeInMinutesInput.current.value,
    });
    resetToInitialValues();
  };

  const handleCancel = () => {
    resetToInitialValues();
    onCancel();
  };

  const resetToInitialValues = () => {
    titleInput.current.value = initialTitle;
    totalTimeInMinutesInput.current.value = initialTotalTimeInMinutes;
  };

  return (
    <form onSubmit={handleSubmit} className="TimeboxEditor">
      <label>
        Co robisz?
        <input ref={titleInput} defaultValue={initialTitle} type="text" />
      </label>
      <br />
      <label>
        Ile minut?
        <input
          ref={totalTimeInMinutesInput}
          defaultValue={initialTotalTimeInMinutes}
          type="number"
          step="0.01"
        />
      </label>
      <br />
      <a href="#cancel" onClick={handleCancel}>
        Anuluj
      </a>
      <button>Zapisz zmiany</button>
    </form>
  );
};

export default TimeboxEditor;

import { useRef, useEffect } from "react";

function InputWithLabel({ type, id, name, value, onChange, children }) {
  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  });

  return (
    <>
      <label htmlFor="todoTitle">{children}</label>
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        ref={inputRef}
      ></input>
    </>
  );
}

export default InputWithLabel;

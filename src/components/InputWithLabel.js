import { useRef, useEffect } from "react";
import PropTypes from "prop-types";

function InputWithLabel({ type, id, name, value, onChange, children }) {
  const inputRef = useRef();
  useEffect(() => {
    // ensure that the reference is set before attempting to call focus on it.
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

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

InputWithLabel.propTypes = {
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  children: PropTypes.node,
};

export default InputWithLabel;

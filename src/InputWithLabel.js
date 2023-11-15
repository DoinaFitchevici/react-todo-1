function InputWithLabel({ type, id, name, value, onChange, children }) {
  return (
    <>
      <label htmlFor="todoTitle">{children}</label>
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        autoFocus
      ></input>
    </>
  );
}

export default InputWithLabel;

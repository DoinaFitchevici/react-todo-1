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
      ></input>
    </>
  );
}

export default InputWithLabel;

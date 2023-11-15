function InputWithLabel({ type, id, name, value, onChange, label }) {
  return (
    <>
      <label htmlFor="todoTitle">{label}</label>
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

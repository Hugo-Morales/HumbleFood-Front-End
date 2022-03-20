export default function Input({
  div,
  forid,
  lclass,
  tl,
  it,
  iname,
  iId,
  iclass,
  valor,
  c,
  ediv,
  err,
  placeholder
}) {
  return (
    <div className={div}>
      <label htmlFor={forid} className={lclass}>
        {tl}
      </label>
      <input
        type={it}
        name={iname}
        id={iId}
        className={iclass}
        value={valor}
        onChange={c}
        placeholder={placeholder}
      />
      <div className={ediv}>{err && <p>{err}</p>}</div>
    </div>
  );
}
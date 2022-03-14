export default function Button({
  div,
  text,
  buttonclass,
  icon,
  f,
  m,
  mstyles,
}) {
  return (
    <div className={div} onClick={f ? f : null}>
      <button className={buttonclass}>
        {icon}
        {text}
        {m ? <p className={mstyles}>{m}</p> : null}
      </button>
    </div>
  );
}

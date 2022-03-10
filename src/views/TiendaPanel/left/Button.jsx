export default function Button({ div, text, buttonClass, icon, f, m, mstyles }) {
    return (
        <div className={div} onClick={f ? f : null}>
            <button className={buttonClass}>{icon}{text}
                {
                    m ? (<p className={mstyles}>{m}</p>) : null
                }
            </button>
        </div>
    );
}
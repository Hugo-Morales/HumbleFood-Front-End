import { Link } from 'react-router-dom';

export default function Button({ div, url, text, buttonClass, icon, f, m, mstyles }) {
    return (
        <div className={div}>
            <Link to={url}>
                <button onClick={f ? f : null} className={buttonClass}>{icon}{text}
                    {
                        m ? (<p className={mstyles}>{m}</p>) : null
                    }
                </button>
            </Link>
        </div>
    );
}
import { useState } from "react"; 

export const EmailForm = ({ onEmailSubmit, disabled }: { onEmailSubmit:(_:string) => void, disabled: boolean }) => {

    const [email, setEmail] = useState('');

    const handleSubmit = async (e: {preventDefault: () => void }) => {
        e.preventDefault();
        onEmailSubmit(email);
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <h3 className='form-header'>Login</h3>
                <div className='input-wrapper'>
                <input
                    placeholder='Enter your email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                </div>
                <div>
                <button
                    disabled={disabled}
                    onClick={handleSubmit}
                >
                    Email Login Link
                </button>
                </div>
            </form>
            <style>{`
                form,
                label {
                display: flex;
                flex-flow: column;
                text-align: center;
                }
                .form-header {
                font-size: 22px;
                margin: 25px 0;
                }
                .input-wrapper {
                width: 80%;
                margin: 0 auto 20px;
                }
            `}</style>
        </>
  );

}
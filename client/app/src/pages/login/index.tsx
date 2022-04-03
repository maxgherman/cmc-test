import { useState } from 'react';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { magic } from '@src/utils/magic';
import { EmailForm } from './email-form';
import { UserContext } from '@src/context/user-context';
import { APIContext } from '@src/context/api-context'

export const Login = () => {
    const navigate = useNavigate();
    const [disabled, setDisabled] = useState(false);
    const api = useContext(APIContext);
    const userContextData = useContext(UserContext);
    const { setUser } = userContextData;
    
    async function handleLoginWithEmail(email: string) {
        try {
            setDisabled(true); // disable login button to prevent multiple emails from being triggered
            const result = await api.login(email)    

            if(result) {
                const userMetadata = await magic.user.getMetadata();
                if(setUser) {
                    await setUser(userMetadata);
                }
                
                navigate('/checkout');
            } 
            
        } catch (error) {
            console.log(error);
        } finally {
            setDisabled(false); // re-enable login button
        }
    }
    
    return (
        <>
            <div className='login'>
                <EmailForm disabled={disabled} onEmailSubmit={handleLoginWithEmail} />
            </div>
            <style>{`
            .login {
                max-width: 20rem;
                margin: 40px auto 0;
                padding: 1rem;
                border: 1px solid #dfe1e5;
                border-radius: 4px;
                text-align: center;
                box-shadow: 0px 0px 6px 6px #f7f7f7;
                box-sizing: border-box;
            }
            `}</style>
        </>
    );
}
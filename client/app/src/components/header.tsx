import { useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UserContext } from '@src/context/user-context';
import { CartContext } from '@src/context/cart-context'
import { APIContext } from '@src/context/api-context'

export const Header = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const api = useContext(APIContext)
  const { cart } = useContext(CartContext)

  const logout = async () => {
		await api.logout();

		if(setUser) {
			setUser(undefined);
		}
		navigate('/')
  };

  const login = () => {
    navigate('/login');
  }

  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to={'/'} >Home</Link>
          </li>
          {cart && cart.totalItems > 0 && (
            <li>
              <Link to={'/cart'}>Cart ({cart.totalItems})</Link>
            </li>
          )}
          <li>
            <button onClick={login}>
              Login
            </button>
          </li>
          <li>
            <button onClick={logout}>
              Logout
            </button>
          </li>
        </ul>
      </nav>
      <style>{`
        nav {
          max-width: 45rem;
          margin: 0 auto 50px;
          padding: 1.25rem 1.25rem;
          border-bottom: 1px solid #f0f0f0;
        }
        ul {
          display: flex;
          list-style: none;
        }
        li {
          margin-right: 1.5rem;
          line-height: 38px;
        }
        li:first-child {
          margin-left: auto;
        }
      `}</style>
    </header>
  );
};
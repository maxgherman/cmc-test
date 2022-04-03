import type {FC } from 'react';
import { Header} from './header';

export const Layout: FC = (props) => (
  <>
    <Header />
    <main>
      <div className='container'>{props.children}</div>
    </main>
    <style>{`
      * {
        font-family: sans-serif !important;
        outline: none;
      }
      .container {
        max-width: 42rem;
        margin: 0 auto;
        padding: 0 10px;
      }
    `}</style>
  </>
);
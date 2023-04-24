import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

export function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          {/* <div className="dropdown"> */}
          {/*  <label tabIndex={0} className="btn btn-ghost lg:hidden"> */}
          {/*    <svg */}
          {/*      xmlns="http://www.w3.org/2000/svg" */}
          {/*      className="h-5 w-5" */}
          {/*      fill="none" */}
          {/*      viewBox="0 0 24 24" */}
          {/*      stroke="currentColor" */}
          {/*    > */}
          {/*      <path */}
          {/*        strokeLinecap="round" */}
          {/*        strokeLinejoin="round" */}
          {/*        strokeWidth="2" */}
          {/*        d="M4 6h16M4 12h8m-8 6h16" */}
          {/*      /> */}
          {/*    </svg> */}
          {/*  </label> */}
          {/*  <ul */}
          {/*    tabIndex={0} */}
          {/*    className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52" */}
          {/*  > */}
          {/*    <li> */}
          {/*      <a>Item 1</a> */}
          {/*    </li> */}
          {/*    <li tabIndex={0}> */}
          {/*      <a className="justify-between"> */}
          {/*        Parent */}
          {/*        <svg */}
          {/*          className="fill-current" */}
          {/*          xmlns="http://www.w3.org/2000/svg" */}
          {/*          width="24" */}
          {/*          height="24" */}
          {/*          viewBox="0 0 24 24" */}
          {/*        > */}
          {/*          <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" /> */}
          {/*        </svg> */}
          {/*      </a> */}
          {/*      <ul className="p-2"> */}
          {/*        <li> */}
          {/*          <a>Submenu 1</a> */}
          {/*        </li> */}
          {/*        <li> */}
          {/*          <a>Submenu 2</a> */}
          {/*        </li> */}
          {/*      </ul> */}
          {/*    </li> */}
          {/*    <li> */}
          {/*      <a>Item 3</a> */}
          {/*    </li> */}
          {/*  </ul> */}
          {/* </div> */}
          <Link to="/" className="btn btn-ghost normal-case text-xl">
            sonoReport
          </Link>
        </div>
        <div className="navbar-center flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link to="/patient">Pacientes</Link>
            </li>
            {/* <li tabIndex={0}> */}
            {/*  <a> */}
            {/*    Parent */}
            {/*    <svg */}
            {/*      className="fill-current" */}
            {/*      xmlns="http://www.w3.org/2000/svg" */}
            {/*      width="20" */}
            {/*      height="20" */}
            {/*      viewBox="0 0 24 24" */}
            {/*    > */}
            {/*      <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" /> */}
            {/*    </svg> */}
            {/*  </a> */}
            {/*  <ul className="p-2"> */}
            {/*    <li> */}
            {/*      <a>Submenu 1</a> */}
            {/*    </li> */}
            {/*    <li> */}
            {/*      <a>Submenu 2</a> */}
            {/*    </li> */}
            {/*  </ul> */}
            {/* </li> */}
            {/* <li> */}
            {/*  <a>Item 3</a> */}
            {/* </li> */}
          </ul>
        </div>
        <div className="navbar-end">
          <Link to="/config" className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="ionicon"
              viewBox="0 0 512 512"
              width={24}
            >
              <path
                d="M262.29 192.31a64 64 0 1057.4 57.4 64.13 64.13 0 00-57.4-57.4zM416.39 256a154.34 154.34 0 01-1.53 20.79l45.21 35.46a10.81 10.81 0 012.45 13.75l-42.77 74a10.81 10.81 0 01-13.14 4.59l-44.9-18.08a16.11 16.11 0 00-15.17 1.75A164.48 164.48 0 01325 400.8a15.94 15.94 0 00-8.82 12.14l-6.73 47.89a11.08 11.08 0 01-10.68 9.17h-85.54a11.11 11.11 0 01-10.69-8.87l-6.72-47.82a16.07 16.07 0 00-9-12.22 155.3 155.3 0 01-21.46-12.57 16 16 0 00-15.11-1.71l-44.89 18.07a10.81 10.81 0 01-13.14-4.58l-42.77-74a10.8 10.8 0 012.45-13.75l38.21-30a16.05 16.05 0 006-14.08c-.36-4.17-.58-8.33-.58-12.5s.21-8.27.58-12.35a16 16 0 00-6.07-13.94l-38.19-30A10.81 10.81 0 0149.48 186l42.77-74a10.81 10.81 0 0113.14-4.59l44.9 18.08a16.11 16.11 0 0015.17-1.75A164.48 164.48 0 01187 111.2a15.94 15.94 0 008.82-12.14l6.73-47.89A11.08 11.08 0 01213.23 42h85.54a11.11 11.11 0 0110.69 8.87l6.72 47.82a16.07 16.07 0 009 12.22 155.3 155.3 0 0121.46 12.57 16 16 0 0015.11 1.71l44.89-18.07a10.81 10.81 0 0113.14 4.58l42.77 74a10.8 10.8 0 01-2.45 13.75l-38.21 30a16.05 16.05 0 00-6.05 14.08c.33 4.14.55 8.3.55 12.47z"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="32"
              />
            </svg>
          </Link>
        </div>
      </div>
      <div className="container mx-auto px-4 py-8">{children}</div>
    </>
  );
}
import Nav from "./Nav";
import {useState, ReactNode, useEffect} from "react";
import Logo from "./Logo";

export default function Layout(props: {children: ReactNode}) {
  const [showNav,setShowNav] = useState(false);
  const session = true
  useEffect(() => {
    console.log("rendred")
  })
  const toggleNav = () => {
    setShowNav(!showNav)
  }
  if (!session) {
    return (
      <div className="bg-bgGray w-screen h-screen flex items-center">
        <div className="text-center w-full">
          <button onClick={() => {}} className="bg-white p-2 px-4 rounded-lg">Login with Google</button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-bgGray min-h-screen h-screen">
      <div className="block md:hidden items-center p-4">
        <button onClick={() => setShowNav(true)}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path fillRule="evenodd" d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z" clipRule="evenodd" />
          </svg>
        </button>
        <div className="flex grow justify-center mr-6">
          <Logo />
        </div>
      </div>
      <div className="flex h-screen">
        <Nav show={showNav} setShowNav={toggleNav}/>
        <div className="flex-grow p-4">
          {props.children}
        </div>
      </div>
    </div>
  );
}
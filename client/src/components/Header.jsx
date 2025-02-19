import { Button, Navbar, TextInput } from 'flowbite-react';
import { Link, useLocation } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
import { BsMoon } from "react-icons/bs";

const Header = () => {
  const path = useLocation().pathname;

  return (
    <div>
      <Navbar className='border-b-2  dark:bg-white'>
        <Link to="/" className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold text-black dark:text-black'>
          <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>Coders</span>
          Library
        </Link>
        
        {/* Search Bar (visible on large screens) */}
        <form className='flex items-center'>
          <TextInput 
            type='text'
            placeholder='Search...'
            rightIcon={AiOutlineSearch}
            className='hidden lg:inline'
          />
        </form>

        {/* <div className='flex gap-2 md:order-2  if down not work in the home page use this or gpt*/}
        <div className='flex gap-2 sm:gap-4 md:order-2'>

        {/* Mobile Search Button (visible on small screens) */}
        <Button className='w-12 h-10 lg:hidden' color='gray' pill>
          <AiOutlineSearch className='text-xl'/>
        </Button>

        {/* Moon Button (for Dark Mode Toggle) */}
        <Button className='w-12 h-10 '  color='gray' pill>
          <BsMoon className="text-lg" />
        </Button> 
        </div>
      

        <Link to='/signin'>
          <Button className='text-bold bg-gradient-to-r from-purple-500  to-blue-500' >Sign In</Button>
        </Link>
        <Navbar.Toggle/>
        <Navbar.Collapse>
        <Navbar.Link active={path === '/'} as={'div'} >
          <div className = 'hover:text-gray-700 !text-black'>
          <Link to='/'>  Home  </Link>
        </div>
        </Navbar.Link>

        <Navbar.Link active={path == '/'}  as={'div'}  >
        <div className= 'hover:text-gray-700 !text-black'>
          <Link to='/about'> About </Link>
          </div>
        </Navbar.Link>

        <Navbar.Link active={path =="/"}  as={'div'}  className= 'hover:text-gray-700 !text-black'>
          <Link to='/project'>
            Projects
          </Link>
        </Navbar.Link>
        
       </Navbar.Collapse>
      </Navbar>
    
    </div>
  );
};

export default Header;

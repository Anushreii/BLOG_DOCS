import { Button, Navbar, TextInput } from 'flowbite-react';
import { Link, useLocation } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
import { BsMoon } from "react-icons/bs";

const Header = () => {
  const path = useLocation().pathname;

  return (
    <div>
      <Navbar className='border-b-2 dark:bg-white'>
        <Link to="/" className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold text-black dark:text-black'>
          <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white hover:text-black transition-all duration-500'>Coders</span>
          Library
        </Link>
        
        {/* Search Bar (visible on large screens) */}
        <form className='hidden lg:flex items-center relative w-full max-w-sm'>
          <TextInput 
            type='text'
            placeholder='Search...'
            rightIcon={AiOutlineSearch}
            className='w-full bg-white text-black border-gray-300 focus:ring-gray-400 focus:border-gray-400 placeholder-gray-500 pr-10' 
          />
          
        </form>

        {/* Right Section (Moon & Sign In Button) */}
        <div className='flex gap-2 sm:gap-4 md:order-2'>
          {/* Mobile Search Button */}
          <Button className='w-12 h-10 lg:hidden' color='gray' pill>
            <AiOutlineSearch className='text-xl'/>
          </Button>

          {/* Dark Mode Toggle */}
          <Button className='w-12 h-10' color='gray' pill>
            <BsMoon className="text-lg" />
          </Button> 
        
          {/* Sign In Button */}
          <Link to='/signin'>
            <Button className='text-slate-100 bg-gradient-to-r from-purple-500 to-blue-500 hover:text-black transition-all duration-900' >Sign In</Button>
          </Link>

          {/* Hamburger Toggle */}
          <Navbar.Toggle/>
        </div>

        {/* Hamburger Dropdown */}
        <Navbar.Collapse>
          <Navbar.Link as={Link} to="/" active={path === '/'} className="!text-black hover:text-gray-700">
            Home
          </Navbar.Link>

          <Navbar.Link as={Link} to="/about" active={path === '/about'} className="!text-black hover:text-gray-700">
            About
          </Navbar.Link>

          <Navbar.Link as={Link} to="/project" active={path === '/project'} className="!text-black hover:text-gray-700">
            Projects
          </Navbar.Link>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default Header;

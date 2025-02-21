import { Avatar, Button, Dropdown, Navbar, TextInput, theme } from 'flowbite-react';
import { Link, useLocation } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
import { BsMoon, BsSun } from "react-icons/bs";
import {useSelector, useDispatch} from 'react-redux'
import { toggleTheme } from '../redux/theme/themeSlice';

const Header = () => {
  const path = useLocation().pathname;
  const dispatch = useDispatch();
  const {theme} = useSelector(state => state.theme);
  const {currentUser} = useSelector(state => state.user);//.user or / theme

  return (
    <div>
      <Navbar className='border-b dark:bg-gray-900 dark:text-white'>
        
        <Link to="/" className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold text-black dark:text-white'>
          <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white hover:text-black transition-all duration-500'>Coders</span>
          Library
        </Link>
        
        {/* Search Bar (visible on large screens) */}
        <form className='hidden lg:flex items-center relative w-full max-w-sm'>
          <TextInput 
            type='text'
            placeholder='Search...'
            rightIcon={AiOutlineSearch}
            className='w-full bg-white text-black dark:bg-gray-900 dark:text-white border-gray-300 dark:border-gray-700 focus:ring-gray-400 focus:border-gray-400 placeholder-gray-500 dark:placeholder-gray-400 pr-10 shadow-none' 
          />
          
        </form>

        {/* Right Section (Moon & Sign In Button) */}
        <div className='flex gap-2 sm:gap-4 md:order-2'>

          {/* Mobile Search Button */}
          <Button className='w-12 h-10 lg:hidden' color='gray' pill >
            <AiOutlineSearch className='text-xl'/>
          </Button>

          {/* Dark Mode Toggle */}
          <Button onClick={()=>dispatch(toggleTheme())} className='w-12 h-10' color='gray' pill >
             {theme === 'dark' ? <BsMoon className='text-xl'/> : <BsSun className='text-xl'/>}

            {/* <BsMoon className={`text-lg ${theme === 'dark' ? 'text-yellow-50-400' : 'text-gray-900'}`} /> */}
          </Button>

         {currentUser ? (
          <Dropdown arrowIcon={false} inline 
          label={
            <Avatar alt ='user' img={currentUser.profilePicture || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhVSHxKxeD9Tdg65juWHA_tU_Hyt89DgJ3qQ&s"} rounded />}
            >
         
          <Dropdown.Header>
            <span className='block text-sm'>@{currentUser.username}</span>
            <span className='block text-sm font-medium truncate'>@{currentUser.email}</span>
          </Dropdown.Header>

          <Link to={'/dashboard?tab=profile'}>
            <Dropdown.Item>Profile</Dropdown.Item>
          </Link>
          
          <Dropdown.Divider/>
            <Dropdown.Item>Sign Out</Dropdown.Item>
          </Dropdown>
         ):
         (
          // {/* Sign In Button */}
          <Link to='/signin'>
           <Button className='bg-gradient-to-r from-blue-500 via-teal-400 to-green-500 hover:text-black transition-all duration-100'>Sign In</Button>
          </Link>
         )
        }

          {/* Hamburger Toggle */}
          <Navbar.Toggle/>
        </div>

        {/* Hamburger Dropdown */}
        <Navbar.Collapse>
          <Navbar.Link as={Link} to="/" active={path === '/'} className="text-black hover:text-gray-700">
            Home
          </Navbar.Link>

          <Navbar.Link as={Link} to="/about" active={path === '/about'} className="text-black hover:text-gray-700 ">
            About
          </Navbar.Link>

          <Navbar.Link as={Link} to="/project" active={path === '/project'} className="text-black hover:text-gray-700">
            Projects
          </Navbar.Link>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default Header;

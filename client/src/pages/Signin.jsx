import { Alert, Button, Label, Spinner, TextInput, } from 'flowbite-react';
import  { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice';
import OAuth from '../components/OAuth';

const Signin = () => {
  const [formData, setFormData] = useState({});
  // const [errorMsg, setErrorMsg] = useState(null);
  const {loading, error: errorMsg} = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(signInStart());

    if (!formData.email || !formData.password) {
      return dispatch(signInFailure('Please fill out all fields'));
    }

    try {
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        dispatch(signInFailure(data.message));
      }

      //console.log('Signup successful:', data);
      if(res.ok){
        dispatch(signInSuccess(data));
       // localStorage.setItem("currentUser", JSON.stringify(data));
        navigate('/');
      }
   
    } catch (error) {
     dispatch(signInFailure(error.message));
    } finally {
      // setLoading(false);
      
    }
  };

  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        {/* Left Side */}
        <div className="flex-1">
          <Link to="/" className="font-bold text-black dark:text-white text-3xl">
            <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white hover:text-black transition-all duration-500" >
              Coders
            </span>
            Library
          </Link>
          <p className="text-sm mt-5">
            This is a Demo Project. You can sign In with your email and password
            or with Google.
          </p>
        </div>

        {/* Right Side */}
        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            
            <div>
              <Label value="Your Email" className="text-black dark:text-white text-base font-medium" />
              <TextInput type="email" placeholder="name@company.com" id="email" onChange={handleChange} />
            </div>

            <div>
              <Label value="Your Password" className="text-black dark:text-white text-base font-medium" />
              <TextInput type="password" placeholder="*************" id="password" onChange={handleChange} />
            </div>

            <Button
              type="submit"
              className="bg-gradient-to-r from-blue-500 via-teal-400 to-green-500 font-bold hover:text-black transition-all duration-100" outline
              disabled={loading}>
              {loading ? (
                <>
                <Spinner size='sm' className="mr-2"></Spinner>
                <span>Loading...</span>
                </>
              ) : 'Sign In' }
            </Button>
            <OAuth></OAuth>
          </form>

          <div className="flex gap-2 text-sm mt-5">
            <span>Dont Have an account?</span>
            <Link to="/signup" className="text-blue-500">
              Sign Up
            </Link>
          </div>

          {/* Show error message if any */}
          {errorMsg && <Alert className="mt-5" color="failure">{errorMsg}</Alert>}
        </div>
      </div>
    </div>
  );
};

export default Signin;

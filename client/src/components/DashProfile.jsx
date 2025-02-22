import { Alert, Button, Modal, TextInput } from 'flowbite-react';
import { useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateUserSuccess, updateUserFailure, deleteUserStart, deleteUserSuccess, deleteUserFailure } from '../redux/user/userSlice';
import { HiOutlineExclamationCircle } from 'react-icons/hi';

export default function DashProfile() {
    const dispatch = useDispatch();
    const { currentUser, error } = useSelector(state => state.user);
    const storedImage = localStorage.getItem("profileImage");
    const [imageUrl, setImageUrl] = useState(storedImage || currentUser.profilePicture);
    const [username, setUsername] = useState(currentUser.username);
    const [email, setEmail] = useState(currentUser.email);
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState(""); 
    const [showModel, setShowModel] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [isUpdating, setIsUpdating] = useState(false);
    const filePickerRef = useRef();

    //console.log("Updated Redux State in Dashboard:", currentUser);

    // Handle image selection
    const handleImageChange = (e) => {
        const file = e.target.files[0];

        if (!file) return;

        if (e.target.files.length > 1) {
            setMessage("Please select only one image.");
            setMessageType("error");
            return;
        }

        if (!file.type.startsWith("image/")) {
            setMessage("File must be an image.");
            setMessageType("error");
            return;
        }

        if (file.size > 2 * 1024 * 1024) {
            setMessage("File must be less than 2MB.");
            setMessageType("error");
            return;
        }

        setMessage("");
        setMessageType("");

        // Simulate Upload Progress
        setUploadProgress(10);
        let progress = 10;
        const interval = setInterval(() => {
            progress += 10;
            if (progress >= 100) {
                clearInterval(interval);
                setUploadProgress(100);
                setTimeout(() => setUploadProgress(0), 500);
            } else {
                setUploadProgress(progress);
            }
        }, 200);

        // Convert Image to Base64 & Store in Local Storage
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            const base64Image = reader.result;
            setImageUrl(base64Image);
            localStorage.setItem("profileImage", base64Image);
            dispatch(updateUserSuccess({ profilePicture: base64Image }));
        };
    };

    // Handle profile update
    const handleUpdate = async (e) => {
        e.preventDefault();

        if (isUpdating) {
            setMessage("Please wait, profile is updating...");
            setMessageType("error");
            return;
        }

        if (
            (username === currentUser.username && email === currentUser.email && password === "") ||
            (username.trim() === "" && email.trim() === "" && password.trim() === "")
        ) {
            setMessage("No changes made!");
            setMessageType("error");
            return;
        }

        setIsUpdating(true);
        setMessage("");

        try {
            // Simulating API call
            await new Promise((resolve, reject) => setTimeout(() => {
                if (Math.random() < 0.8) {
                    resolve();
                } else {
                    reject(new Error("Failed to update profile"));
                }
            }, 2000));

            dispatch(updateUserSuccess({ ...currentUser, username, email }));
            setMessage("User profile updated successfully!");
            setMessageType("success");
        } catch (error) {
            dispatch(updateUserFailure(error.message));
            setMessage("Failed to update profile. Try again.");
            setMessageType("error");
        } finally {
            setIsUpdating(false);
        }
    };
    const handleDeleteUser = async ()=>{
       setShowModel(false);
       try {
          dispatch(deleteUserStart());
          const res = await fetch(`/api/user/delete/${currentUser._id}`, {
            method: 'DELETE',
          });
          const data = await res.json();
          if(!res.ok){
            dispatch(deleteUserFailure(data.message));
          }else{
            dispatch(deleteUserSuccess(data));
          }
       } catch (error) {
        dispatch(deleteUserFailure(error.message));
       }
    };

    return (
        <div className='max-w-lg mx-auto p-3 w-full'>
            <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>

            <form className='flex flex-col gap-4' onSubmit={handleUpdate}>
                <input 
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange} 
                    ref={filePickerRef}
                    hidden
                />

                {/* Profile Image */}
                <div className="relative self-center cursor-pointer" onClick={() => filePickerRef.current.click()}>
                    {uploadProgress > 0 && (
                        <svg className="absolute -top-2 -left-2 w-36 h-36" viewBox="0 0 100 100">
                            <circle className="text-gray-300 stroke-current" strokeWidth="8" cx="50" cy="50" r="40" fill="none"/>
                            <circle
                                className="text-blue-500 stroke-current"
                                strokeWidth="8"
                                strokeLinecap="round"
                                cx="50" cy="50"
                                r="40"
                                fill="none"
                                strokeDasharray="251.2"
                                strokeDashoffset={`${251.2 - (uploadProgress / 100) * 251.2}`}
                                style={{ transition: "stroke-dashoffset 0.2s linear" }}
                            />
                        </svg>
                    )}

                    {uploadProgress > 0 && (
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white font-bold text-xl bg-gray-900 bg-opacity-50 px-2 py-1 rounded-full">
                            {uploadProgress}%
                        </div>
                    )}

                    <div className={`w-32 h-32 shadow-md overflow-hidden rounded-full border-8 border-[lightgray] ${uploadProgress > 0 && uploadProgress < 100 ? "blur-md" : ""}`}>
                        <img 
                            src={imageUrl} 
                            alt="user"
                            className='rounded-full w-full h-full object-cover' 
                        />
                    </div>
                </div>

                {/* Username Input */}
                <TextInput 
                    type='text' 
                    id='username' 
                    placeholder='Username' 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)}
                />

                {/* Email Input */}
                <TextInput 
                    type='email' 
                    id='email' 
                    placeholder='Email' 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                />

                {/* Password Input */}
                <TextInput 
                    type='password' 
                    id='password' 
                    placeholder='New Password' 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)}
                />

                {/* Update Button */}
                <div className="relative">
                    <Button type='submit' gradientDuoTone='purpleToBlue' outline className="w-full">
                        {isUpdating ? "Updating..." : "Update"}
                    </Button>
                </div>
            </form>

            {/* Delete & Sign Out Links */}
            <div className="text-red-600 flex justify-between mt-5">
                <span onClick={() => setShowModel(true)} className='cursor-pointer'>Delete Account</span>
                <span className='cursor-pointer'>Sign Out</span>
            </div>
            
            {/* Message Box */}
            {message && (
                <div className={`mt-4 p-3 border rounded-md text-center font-semibold flex justify-center
                    ${messageType === "success" ? "bg-green-100 text-green-800 border-green-500" : "bg-red-100 text-red-800 border-red-500"}`}>
                    {message}

                    {/* <Alert color='failure' className=''>{error}</Alert> */}
                </div>
            )}

            <Modal show={showModel} onClose={() => setShowModel(false)} popup size='md'>
                <Modal.Header />
                <Modal.Body>
                    <div className="text-center">
                        <HiOutlineExclamationCircle  className='h-14 w-14 text-gray-500 dark:text-gray-250 mb-4 mx-auto'/>
                        <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>Are you sure you want to delete your account?</h3>
                        <div className="flex justify-center gap-4 ">
                            <Button color='failure' onClick={handleDeleteUser}>Yes, I'm sure</Button>
                            <Button className='gray' onClick={()=> setShowModel(false)} outline>No, cancel</Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
}
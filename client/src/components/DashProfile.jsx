import { Button, TextInput } from 'flowbite-react';
import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';

export default function DashProfile() {
    const { currentUser } = useSelector(state => state.user);
    const [imageFile, setImageFile] = useState(null);
    const [imageUrl, setImageUrl] = useState(localStorage.getItem("profileImage") || currentUser.profilePicture);
    const [error, setError] = useState(""); 
    const [uploadProgress, setUploadProgress] = useState(0); // Track upload progress
    const filePickerRef = useRef();

    // Handle image selection
    const handleImageChange = (e) => {
        const file = e.target.files[0];

        if (!file) return; // No file selected

        // Ensure only single image file is uploaded
        if (e.target.files.length > 1) {
            triggerAlert("Please select only one image.");
            return;
        }

        // Ensure file is an image
        if (!file.type.startsWith("image/")) {
            triggerAlert("Could not upload image (File must be less than 2MB)");
            return;
        }

        // Ensure file is under 2MB
        if (file.size > 2 * 1024 * 1024) {
            triggerAlert("Could not upload image (File must be less than 2MB)");
            return;
        }

        setError(""); // Clear error if valid
        setImageFile(file);

        // Simulate Upload Progress
        setUploadProgress(10);
        let progress = 10;
        const interval = setInterval(() => {
            progress += 10;
            if (progress >= 100) {
                clearInterval(interval);
                setUploadProgress(100);
                setTimeout(() => setUploadProgress(0), 500); // Remove loader after completion
            } else {
                setUploadProgress(progress);
            }
        }, 200); // Progress increases every 200ms

        // Convert to local URL
        const imageUrl = URL.createObjectURL(file);
        setImageUrl(imageUrl);

        // Store image in local storage
        localStorage.setItem("profileImage", imageUrl);
    };

    // Function to trigger an alert with red color styling
    const triggerAlert = (message) => {
        setError(message);
        alert(message); // Show red alert popup
    };

    return (
        <div className='max-w-lg mx-auto p-3 w-full'>
            <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>

            <form className='flex flex-col gap-4'>
                <input 
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange} 
                    ref={filePickerRef}
                    hidden
                />

                <div className="relative self-center cursor-pointer" onClick={() => filePickerRef.current.click()}>
                    {/* Circular Loader */}
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
                                strokeDasharray="251.2" // Full circle
                                strokeDashoffset={`${251.2 - (uploadProgress / 100) * 251.2}`} // Progress
                                style={{ transition: "stroke-dashoffset 0.2s linear" }}
                            />
                        </svg>
                    )}

                    {/* Progress Number */}
                    {uploadProgress > 0 && (
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white font-bold text-xl bg-gray-900 bg-opacity-50 px-2 py-1 rounded-full">
                            {uploadProgress}%
                        </div>
                    )}

                    {/* Profile Image with Blur Effect */}
                    <div className={`w-32 h-32 shadow-md overflow-hidden rounded-full border-8 border-[lightgray] ${uploadProgress > 0 && uploadProgress < 100 ? "blur-md" : ""}`}>
                        <img 
                            src={imageUrl} 
                            alt="user"
                            className='rounded-full w-full h-full object-cover' 
                        />
                    </div>
                </div>

                {/* Show Error Below Image (No Popup) */}
                {error && <p className="text-red-500 text-center font-semibold">{error}</p>}

                <TextInput type='text' id='username' placeholder='username' defaultValue={currentUser.username} />
                <TextInput type='email' id='email' placeholder='email' defaultValue={currentUser.email} />
                <TextInput type='password' id='password' placeholder='password' />

                <Button type='submit' gradientDuoTone='purpleToBlue' outline>
                    Update
                </Button>
            </form>

            <div className="text-red-600 flex justify-between mt-5">
                <span className='cursor-pointer'>Delete Account</span>
                <span className='cursor-pointer'>Sign Out</span>
            </div>
        </div>
    );
}

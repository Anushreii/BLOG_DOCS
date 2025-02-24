import { Alert, Button, FileInput, Select, TextInput } from 'flowbite-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function UpdatePost() {
  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);

  const navigate = useNavigate();
  const { postId } = useParams();
  const reduxState = useSelector((state) => state);
  console.log("🔹 Full Redux State:", reduxState);
 
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    try {
      const fetchPost = async () => {
        const res = await fetch(`/api/post/getposts?postId=${postId}`);
        const data = await res.json();
        console.log("Fetched Post Data:", data);

        if (!res.ok) {
          console.log(data.message);
          setPublishError(data.message);
          return;
        }

        if (res.ok) {
          setPublishError(null);
          setFormData((prev) => ({
            ...prev,
            ...data.posts[0],
            image: data.posts[0].image || localStorage.getItem('uploadedImage') || 
                   "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSR3_eYYfBz7fiY-wD5n0o83Tq43AA44BR_SryIX784ZaG7OTyXoZggLh11hyQ2oeFO-mI&usqp=CAU",
          }));
          console.log("Fetched Image from API:", data.posts[0]?.image);
        }
      };

      fetchPost();
    } catch (error) {
      console.log(error.message);
    }
  }, [postId]);

  // Function to handle image upload
  const handleUploadImage = () => {
    if (!file) {
      setImageUploadError('Please select an image');
      return;
    }
    setImageUploadError(null);

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadstart = () => setImageUploadProgress(0);

    reader.onprogress = (event) => {
      if (event.lengthComputable) {
        const progress = Math.round((event.loaded / event.total) * 100);
        setImageUploadProgress(progress);
      }
    };

    reader.onloadend = () => {
      const uploadedImage = reader.result;
      localStorage.setItem('uploadedImage', uploadedImage);

      // 🔹 Update formData.image directly
      setFormData((prev) => ({
        ...prev,
        image: uploadedImage,
      }));

      console.log("Updated Image:", uploadedImage);
      setImageUploadProgress(null);
    };

    reader.onerror = () => {
      setImageUploadError('Image upload failed');
      setImageUploadProgress(null);
    };
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(" Submit button clicked");
    console.log(" Sending this data:", formData);
    console.log("🔹 Current User:", currentUser);
    console.log("🔹 Current User ID:", currentUser?._id);

    if (!formData._id) {
      console.log("Post ID is missing!"); 
      setPublishError("Error: Missing Post ID");
      return;
    }
    
    try {
      const res = await fetch(`/api/post/updatepost/${formData._id}/${currentUser._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      console.log("Update Response:", data);

      if (!res.ok) {  
        console.log("❌ Update Failed:", data.message);
        setPublishError(data.message);
        return;
      }

      if (res.ok) {
        setPublishError(null);
        console.log(data);
        navigate(`/post/${data.slug}`);
        console.log("Navigating to:", `/update-post/${data.postId}`);
      }
    } catch (error) {
      console.log("❌ Fetch Error:", error.message);
      setPublishError('Something went wrong');
    }
  };

  return (
    <div className='p-3 max-w-3xl mx-auto min-h-screen'>
      <h1 className='text-center text-3xl my-7 font-semibold'>Update post</h1>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <div className='flex flex-col gap-4 sm:flex-row justify-between'>
          <TextInput
            type='text'
            placeholder='Title'
            required
            id='title'
            className='flex-1'
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            value={formData.title}
          />
          <Select onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            value={formData.category}>
            <option value='uncategorized'>Select a category</option>
            <option value='javascript'>JavaScript</option>
            <option value='reactjs'>React.js</option>
            <option value='nextjs'>Next.js</option>
            <option value="angular">Angular</option>
            <option value="vuejs">Vue.js</option>
            <option value="svelte">Svelte</option>
            <option value="nodejs">Node.js</option>
            <option value="express">Express.js</option>
            <option value="mongodb">MongoDB</option>
            <option value="sql">SQL</option>
            <option value="firebase">Firebase</option>
            <option value="aws">AWS</option>
            <option value="devops">DevOps</option>
            <option value="frontend">Frontend</option>
            <option value="backend">Backend</option>
            <option value="fullstack">Full Stack Development</option>
            <option value="testing">Testing & Debugging</option>
            <option value="datastructures">Data Structures</option>
            <option value="algorithms">Algorithms</option>
            <option value="career">Career & Interview Prep</option>   
            <option value="others">OTHERS</option>   
          </Select>
        </div>

        {/* Image Upload Section */}
        <div className='flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3 relative'>
          <FileInput type='file' accept='image/*' onChange={(e) => setFile(e.target.files[0])} />
          <Button
            type='button'
            gradientDuoTone='purpleToBlue'
            size='sm'
            outline
            onClick={handleUploadImage}
            disabled={imageUploadProgress !== null}
          >
            {imageUploadProgress !== null ? (
              <div className='w-8 h-8 border-4 border-t-transparent border-blue-500 rounded-full animate-spin'></div>
            ) : (
              'Upload Image'
            )}
          </Button>
        </div>

        {imageUploadError && <Alert color='failure'>{imageUploadError}</Alert>}

        <img 
          src={formData.image} 
          alt='upload' 
          className='w-full h-72 object-cover' 
        />

        <ReactQuill
          theme='snow'
          value={formData.content}
          placeholder='Write something...'
          className='h-72 mb-12'
          required
          onChange={(value) => setFormData({ ...formData, content: value })}
        />
        <Button type='submit' gradientDuoTone='purpleToPink'>
          Update post
        </Button>
        {publishError && <Alert className='mt-5' color='failure'>{publishError}</Alert>}
      </form>
    </div>
  );
}

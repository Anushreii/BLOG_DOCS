import { Link } from 'react-router-dom';
import CallToAction from '../components/CallToAction';
import { useEffect, useState } from 'react';
import PostCard from '../components/PostCard';

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch('/api/post/getPosts');
      const data = await res.json();
      setPosts(data.posts);
    };
    fetchPosts();
  }, []);
  return (
    <div>
      <div className='flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto '>
        <h1 className='text-3xl font-bold lg:text-6xl'>Welcome to my Blog</h1>
        <p className='text-gray-500 text-xs sm:text-sm'>
          Here you'll find a variety of articles and tutorials on topics such as
          web development, software engineering, and programming languages.
        </p>
        <Link
          to='/search'
          className='text-xs sm:text-sm text-teal-500 font-bold hover:underline'
        >
          View all posts
        </Link>
      </div>
      <div className='p-3 bg-amber-100 dark:bg-slate-700'>
        <CallToAction />
      </div>

      <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 py-7'>
  {posts && posts.length > 0 && (
    <div className='flex flex-col gap-6'>
      {/* Centered Title */}
      <h2 className='text-2xl font-semibold text-center'>Recent Posts</h2>

      {/* Grid Layout */}
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
        {posts.map((post, index) => (
          <div 
            key={post._id} 
            className={`w-full h-full flex justify-center 
              ${index === posts.length - 1 && posts.length % 2 !== 0 ? 'sm:col-span-2' : ''}`}
          >
            <PostCard 
              post={post} 
              className="w-full h-full shadow-md rounded-lg border bg-white dark:bg-gray-800"
            />
          </div>
        ))}
      </div>

      {/* View All Posts Link */}
      <Link to={'/search'} className='text-lg text-teal-500 hover:underline text-center'>
        View all posts
      </Link>
    </div>
  )}
</div>

    </div>
  );
}
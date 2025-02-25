import React from 'react';

export default function About() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-2xl mx-auto p-6 text-center">
        <h1 className="text-3xl font-semibold text-center my-6 dark:text-gray-400">
          About Coder's Library
        </h1>
        <div className="text-md text-gray-800 dark:text-white flex flex-col gap-6">
          <p>
            Welcome to <span className="font-extrabold ">Coder’s Library</span> – your go-to blog for everything related to coding, 
            web development, and software engineering. Whether you're a beginner or an experienced developer, 
            our goal is to provide valuable insights, tutorials, and resources to help you enhance your skills.
          </p>

          <p>
            Our blog covers a wide range of topics, including programming languages, best practices, 
            data structures, and modern frameworks. We are passionate about sharing knowledge and 
            helping developers stay up to date with the latest trends in technology.
          </p>

          <p>
            <span className="font-semibold">Coder’s Library</span> is more than just a blog – it’s a community. 
            Engage with fellow developers, leave comments, and share your thoughts. Together, we can 
            learn, build, and innovate!
          </p>

          <p className="font-semibold text-teal-600">
            Keep coding, keep learning, and welcome to the journey!
          </p>
        </div>
      </div>
    </div>
  );
}

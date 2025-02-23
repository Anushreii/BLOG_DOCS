import { Button, FileInput, Select, TextInput } from 'flowbite-react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import React from 'react'

export default function CreatePost() {
  return  <div  className='p-3 max-w-3xl mx-auto min-h-screen'>
      <h1 className='text-center text-3xl my-7 font-semibold'>Create a post</h1>
      <form className='flex flex-col gap-4'>
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
            <TextInput type='text' placeholder='Title' required id='title' className='flex-1'></TextInput>
                <Select>
                    <option value='uncategorized'>Select a category</option>
                    <option value="javascipt">JavaScript</option>
                    <option value="reactjs">React.js</option>
                    <option value="nextjs">Next.js</option>
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
                    {/* <option value="angular">Angular</option> */}
                </Select>
        </div>
        <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
            <FileInput type='file' accept='image/*'></FileInput>
            <Button type='button' gradientDuoTone='purpleToPink' size='sm' outline>Upload image</Button>
        </div>
        <ReactQuill theme="snow" placeholder='Write something....' className='h-72 mb-12' required></ReactQuill>
        <Button type='submit' gradientDuoTone='purpleToPink'>Publish</Button>
      </form>
    </div>
  
}

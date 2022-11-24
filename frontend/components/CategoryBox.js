import React from 'react'
import Link from 'next/link';

const CategoryBox = () => {
  return (
    <div className=' absolute top-10 -left-12 shadow-lg p-4 flex flex-col items-center justify-center gap-4 rounded-lg bg-white z-50'>
      {['Animals','Wallpapers','Photography','Gaming','Coding','Others'].map((item, index)=>{
        return(
          <Link href="" key={index}><a className=' text-red-500 hover:text-white transition-all duration-150 hover:bg-red-500 p-2 w-full text-center rounded-lg backdrop-opacity-50'>{item}</a></Link>
        );
      })}
    </div>
  )
}

export default CategoryBox
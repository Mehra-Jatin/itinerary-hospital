import {useState} from "react"
import ImagesData from '../data/GalleryData.json'
const Gallery = () => {
  const [images,setImages]=useState(ImagesData)

  return (
    <div className="container mx-auto p-4 w-full md:pt-24">
      <h1 className="text-4xl font-bold text-[#f97316] mb-4 text-center">Gallery</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-5">
        {images.map((image) => (
          <div key={image.id} className="relative overflow-hidden group rounded-lg">
            {/* Using placeholder image */}
            <img
              // src={image.img}
              src="https://images.unsplash.com/photo-1534361960057-19889db9621e?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt={image.title}
              className="w-full h-64 object-fit transition-all duration-300 group-hover:blur-sm"
            />
            
            <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/50">
              <h3 className="text-white text-xl font-bold mb-2">{image.title}</h3>
              <div className="text-white text-x flex gap-3">
              <a href="#" className="bg-white hover:bg-orange-500 text-orange-500 font-semibold hover:text-white py-2 px-4 hover:border-transparent rounded px-none transition duration-300 ease-in-out" style={{padding:'1px 10px 1px 10px'}}>
  LifeStyle
</a>
              <a href="#" className="bg-white hover:bg-orange-500 text-orange-500 font-semibold hover:text-white py-2 px-4 hover:border-transparent rounded px-none transition duration-300 ease-in-out" style={{padding:'1px 10px 1px 10px'}}>
 Pets
</a>

              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
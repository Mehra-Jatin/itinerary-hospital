
const Gallery = () => {
  const images = [
    { id: 1, title: "Sleepy Puppy", description: "A peaceful sleeping beagle" ,img:'https://images.unsplash.com/photo-1537204696486-967f1b7198c8?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'},
    { id: 2, title: "Fluffy Cat", description: "Beautiful long-haired cat relaxing" ,img:'https://images.unsplash.com/photo-1537204696486-967f1b7198c8?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'},
    { id: 3, title: "Pet Love", description: "Person holding their beloved cat" ,img:'https://images.unsplash.com/photo-1537204696486-967f1b7198c8?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'},
    { id: 4, title: "Pet Care", description: "Regular grooming keeps pets healthy",img:'https://images.unsplash.com/photo-1537204696486-967f1b7198c8?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { id: 5, title: "Best Friends", description: "Special bond between human and dog" ,img:'https://images.unsplash.com/photo-1537204696486-967f1b7198c8?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'},
    { id: 6, title: "Dalmatian Love", description: "Sweet moment with a spotted friend" ,img:'https://images.unsplash.com/photo-1537204696486-967f1b7198c8?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'}
  ];

  return (
    <div className="container mx-auto p-4 w-full">
      <h1 className="text-4xl font-bold text-[#f97316] mb-4 text-center">Gallery</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {images.map((image) => (
          <div key={image.id} className="relative overflow-hidden group rounded-lg">
            {/* Using placeholder image */}
            <img
              src={image.img}
              alt={image.title}
              className="w-full h-64 object-cover transition-all duration-300 group-hover:blur-sm"
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
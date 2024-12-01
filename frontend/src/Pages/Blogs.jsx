import BlogCard from "@/components/BlogCard";

export default function Blogs(){
    const articles = [
        {
          title: "Understanding The Importance Of Preventive Care In Women's Health",
          description: "Dive into the significance of preventive care for women's health, exploring key screenings, vaccinations, and lifestyle factors that contribute to overall wellness and disease prevention.",
          date: "Apr 1, 2024",
          image: "https://images.pexels.com/photos/139398/thermometer-headache-pain-pills-139398.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        },
        {
          title: "Navigating Mental Health Challenges",
          description: "Explore various mental health challenges individuals face and provide practical strategies for coping, emphasizing the importance of destigmatizing mental health issues.",
          date: "Apr 1, 2024",
          image: "https://images.pexels.com/photos/3601097/pexels-photo-3601097.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        }
      ];
    
      return (
        <div className="container mx-auto mt-10 font-bold">
            <h1 className="text-4xl text-center mb-9">Our Blogs</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article, index) =>  (
              <BlogCard
                key={index}
                title={article.title}
                description={article.description}
                date={article.date}
                image={article.image}
              />
            ))}
          </div>
        </div>
      );
    }
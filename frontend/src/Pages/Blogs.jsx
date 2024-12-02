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
    },
    {
      title: "The Role of Nutrition in Preventing Chronic Diseases",
      description: "Examine how balanced diets can reduce the risk of chronic diseases, highlighting the importance of nutrient-rich foods and mindful eating.",
      date: "Apr 2, 2024",
      image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
      title: "Effective Strategies for Managing Stress",
      description: "Learn practical techniques to manage stress effectively, including mindfulness, exercise, and time management tips.",
      date: "Apr 2, 2024",
      image: "https://images.pexels.com/photos/897817/pexels-photo-897817.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
      title: "Empowering Women Through Fitness",
      description: "Discover how fitness routines can empower women, improving mental health, physical strength, and overall confidence.",
      date: "Apr 3, 2024",
      image: "https://images.pexels.com/photos/2294405/pexels-photo-2294405.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
      title: "Breaking Down the Basics of Mental Well-Being",
      description: "An introduction to mental health fundamentals, focusing on self-awareness, resilience, and building supportive environments.",
      date: "Apr 3, 2024",
      image: "https://images.pexels.com/photos/4506100/pexels-photo-4506100.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
      title: "Healthy Sleep Habits for a Better Life",
      description: "Understand the importance of sleep and learn tips to create a healthy sleep routine for long-term benefits.",
      date: "Apr 4, 2024",
      image: "https://images.pexels.com/photos/3958543/pexels-photo-3958543.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
      title: "Boosting Immunity Through Natural Methods",
      description: "Explore natural ways to enhance immunity, including superfoods, stress reduction, and regular exercise.",
      date: "Apr 4, 2024",
      image: "https://images.pexels.com/photos/3184298/pexels-photo-3184298.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
      title: "Mental Health and Workplace Productivity",
      description: "Examine the link between mental health and productivity, offering actionable strategies for creating healthier work environments.",
      date: "Apr 5, 2024",
      image: "https://images.pexels.com/photos/3184407/pexels-photo-3184407.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
      title: "Navigating Life Transitions Gracefully",
      description: "Practical advice for managing life changes, from career shifts to personal milestones, with resilience and positivity.",
      date: "Apr 5, 2024",
      image: "https://images.pexels.com/photos/1130623/pexels-photo-1130623.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
      title: "Hydration: The Key to Optimal Health",
      description: "Learn why staying hydrated is essential and how to incorporate hydration into your daily routine.",
      date: "Apr 6, 2024",
      image: "https://images.pexels.com/photos/1241348/pexels-photo-1241348.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
      title: "Building Healthy Relationships",
      description: "Explore the traits of healthy relationships and how to foster meaningful connections with others.",
      date: "Apr 6, 2024",
      image: "https://images.pexels.com/photos/208216/pexels-photo-208216.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
      title: "Embracing Self-Care Practices",
      description: "Dive into the art of self-care, exploring how small daily actions can lead to long-term mental and physical wellness.",
      date: "Apr 7, 2024",
      image: "https://images.pexels.com/photos/3759655/pexels-photo-3759655.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
      title: "Understanding Anxiety and Its Triggers",
      description: "Learn about anxiety, its common triggers, and effective ways to manage and reduce its impact on daily life.",
      date: "Apr 7, 2024",
      image: "https://images.pexels.com/photos/3132381/pexels-photo-3132381.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
      title: "The Science Behind Gratitude",
      description: "Explore how practicing gratitude can lead to improved mental health and a greater sense of fulfillment.",
      date: "Apr 8, 2024",
      image: "https://images.pexels.com/photos/6156198/pexels-photo-6156198.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
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
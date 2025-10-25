import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Users, Clock, TrendingUp, Star } from "lucide-react";
import heroImage from "@/assets/library-hero.jpg";
import Navigation from "@/components/Navigation";

const Home = () => {
  const featuredBooks = [
    {
      id: 1,
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      category: "Classic Fiction",
      rating: 4.5,
      available: true,
    },
    {
      id: 2,
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      category: "Classic Fiction",
      rating: 4.8,
      available: true,
    },
    {
      id: 3,
      title: "1984",
      author: "George Orwell",
      category: "Dystopian",
      rating: 4.6,
      available: false,
    },
    {
      id: 4,
      title: "Pride and Prejudice",
      author: "Jane Austen",
      category: "Romance",
      rating: 4.7,
      available: true,
    },
  ];

  const stats = [
    { icon: BookOpen, label: "Books Available", value: "10,000+" },
    { icon: Users, label: "Active Members", value: "2,500+" },
    { icon: Clock, label: "Operating Hours", value: "24/7" },
    { icon: TrendingUp, label: "Books Borrowed", value: "50,000+" },
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden mt-16">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/70 to-background/30" />
        </div>
        
        <div className="relative container mx-auto px-4 z-10">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-foreground">
              Discover Your Next Great Read
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Access thousands of books, journals, and digital resources. Join our community of readers today.
            </p>
            <div className="flex gap-4 flex-wrap">
              <Link to="/books">
                <Button variant="accent" size="lg">
                  Browse Collection
                </Button>
              </Link>
              <Link to="/register">
                <Button variant="outline" size="lg">
                  Become a Member
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="elevation-2 hover:elevation-3 transition-smooth text-center">
                <CardContent className="pt-6">
                  <stat.icon className="w-10 h-10 mx-auto mb-3 text-primary" />
                  <p className="text-3xl font-bold text-foreground mb-1">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Books Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Featured Books</h2>
            <p className="text-xl text-muted-foreground">Popular picks from our collection</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredBooks.map((book) => (
              <Card key={book.id} className="elevation-2 hover:elevation-4 transition-smooth group">
                <CardHeader>
                  <div className="h-48 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg mb-4 flex items-center justify-center">
                    <BookOpen className="w-16 h-16 text-primary/40" />
                  </div>
                  <CardTitle className="group-hover:text-primary transition-smooth">
                    {book.title}
                  </CardTitle>
                  <CardDescription>{book.author}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center gap-1 text-sm">
                      <Star className="w-4 h-4 fill-secondary text-secondary" />
                      <span className="font-medium">{book.rating}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{book.category}</p>
                    <p className={`text-sm font-medium ${book.available ? "text-green-600" : "text-destructive"}`}>
                      {book.available ? "Available" : "Currently Borrowed"}
                    </p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant={book.available ? "default" : "outline"} className="w-full" disabled={!book.available}>
                    {book.available ? "Borrow Now" : "Not Available"}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/books">
              <Button variant="secondary" size="lg">
                View All Books
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Start Your Reading Journey?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of readers and get access to our vast collection
          </p>
          <Link to="/register">
            <Button variant="accent" size="lg">
              Sign Up Now
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card py-8 elevation-4">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; 2024 LibraryHub. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;

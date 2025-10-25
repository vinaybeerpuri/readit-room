import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BookOpen, Search, Star, ShoppingCart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Navigation from "@/components/Navigation";

const Books = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const { toast } = useToast();

  const books = [
    { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald", category: "classic", rating: 4.5, available: true },
    { id: 2, title: "To Kill a Mockingbird", author: "Harper Lee", category: "classic", rating: 4.8, available: true },
    { id: 3, title: "1984", author: "George Orwell", category: "dystopian", rating: 4.6, available: false },
    { id: 4, title: "Pride and Prejudice", author: "Jane Austen", category: "romance", rating: 4.7, available: true },
    { id: 5, title: "The Catcher in the Rye", author: "J.D. Salinger", category: "classic", rating: 4.3, available: true },
    { id: 6, title: "Brave New World", author: "Aldous Huxley", category: "dystopian", rating: 4.4, available: true },
    { id: 7, title: "The Hobbit", author: "J.R.R. Tolkien", category: "fantasy", rating: 4.7, available: false },
    { id: 8, title: "Harry Potter and the Philosopher's Stone", author: "J.K. Rowling", category: "fantasy", rating: 4.8, available: true },
  ];

  const filteredBooks = books.filter((book) => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || book.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddToCart = (bookTitle: string) => {
    toast({
      title: "Added to Cart",
      description: `"${bookTitle}" has been added to your cart`,
    });
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div className="container mx-auto px-4 pt-24 pb-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">Browse Our Collection</h1>
          <p className="text-xl text-muted-foreground">Discover your next favorite book</p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 elevation-2 bg-card rounded-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search by title or author..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 elevation-1"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="elevation-1">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="classic">Classic Fiction</SelectItem>
                <SelectItem value="dystopian">Dystopian</SelectItem>
                <SelectItem value="romance">Romance</SelectItem>
                <SelectItem value="fantasy">Fantasy</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <p className="text-sm text-muted-foreground mt-4">
            Showing {filteredBooks.length} of {books.length} books
          </p>
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredBooks.map((book) => (
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
                  <p className="text-sm text-muted-foreground capitalize">{book.category}</p>
                  <p className={`text-sm font-medium ${book.available ? "text-green-600" : "text-destructive"}`}>
                    {book.available ? "Available" : "Currently Borrowed"}
                  </p>
                </div>
              </CardContent>
              <CardFooter className="gap-2">
                <Button
                  variant={book.available ? "default" : "outline"}
                  className="flex-1"
                  disabled={!book.available}
                  onClick={() => book.available && handleAddToCart(book.title)}
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  {book.available ? "Add to Cart" : "Unavailable"}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {filteredBooks.length === 0 && (
          <div className="text-center py-16">
            <BookOpen className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-xl font-semibold mb-2">No books found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Books;

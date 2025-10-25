import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Calendar, User, Clock, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";

const Dashboard = () => {
  const borrowedBooks = [
    { id: 1, title: "The Great Gatsby", dueDate: "2024-12-15", daysLeft: 5, status: "active" },
    { id: 2, title: "To Kill a Mockingbird", dueDate: "2024-12-20", daysLeft: 10, status: "active" },
  ];

  const readingHistory = [
    { id: 1, title: "1984", returnDate: "2024-11-10" },
    { id: 2, title: "Pride and Prejudice", returnDate: "2024-11-05" },
    { id: 3, title: "The Catcher in the Rye", returnDate: "2024-10-28" },
  ];

  const stats = [
    { icon: BookOpen, label: "Books Borrowed", value: "2", color: "text-primary" },
    { icon: TrendingUp, label: "Books Read", value: "15", color: "text-secondary" },
    { icon: Clock, label: "Reading Hours", value: "48", color: "text-accent" },
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div className="container mx-auto px-4 pt-24 pb-16">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-bold mb-4">My Dashboard</h1>
          <p className="text-xl text-muted-foreground">Welcome back, Reader!</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="elevation-2 hover:elevation-3 transition-smooth">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className={`p-3 bg-muted rounded-lg ${stat.color}`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-3xl font-bold">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Currently Borrowed */}
          <div className="lg:col-span-2">
            <Card className="elevation-3">
              <CardHeader>
                <CardTitle className="text-2xl">Currently Borrowed</CardTitle>
                <CardDescription>Books you need to return</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {borrowedBooks.length === 0 ? (
                  <div className="text-center py-8">
                    <BookOpen className="w-12 h-12 mx-auto mb-3 text-muted-foreground" />
                    <p className="text-muted-foreground">No borrowed books</p>
                  </div>
                ) : (
                  borrowedBooks.map((book) => (
                    <div
                      key={book.id}
                      className="flex items-center justify-between p-4 bg-muted/50 rounded-lg elevation-1 hover:elevation-2 transition-smooth"
                    >
                      <div className="flex items-center gap-4">
                        <div className="h-16 w-12 bg-gradient-to-br from-primary/20 to-secondary/20 rounded flex items-center justify-center">
                          <BookOpen className="w-6 h-6 text-primary/40" />
                        </div>
                        <div>
                          <p className="font-semibold">{book.title}</p>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                            <Calendar className="w-4 h-4" />
                            <span>Due: {new Date(book.dueDate).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`text-sm font-medium ${book.daysLeft < 7 ? "text-accent" : "text-green-600"}`}>
                          {book.daysLeft} days left
                        </p>
                        <Button variant="outline" size="sm" className="mt-2">
                          Renew
                        </Button>
                      </div>
                    </div>
                  ))
                )}
                <div className="pt-4">
                  <Link to="/books">
                    <Button variant="secondary" className="w-full">
                      Browse More Books
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Profile & History */}
          <div className="space-y-6">
            {/* Profile Card */}
            <Card className="elevation-3">
              <CardHeader>
                <CardTitle className="text-xl">Profile</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="p-4 bg-primary/10 rounded-full">
                    <User className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold">John Doe</p>
                    <p className="text-sm text-muted-foreground">Member since 2024</p>
                  </div>
                </div>
                <Link to="/profile">
                  <Button variant="outline" className="w-full">
                    Edit Profile
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Reading History */}
            <Card className="elevation-3">
              <CardHeader>
                <CardTitle className="text-xl">Reading History</CardTitle>
                <CardDescription>Recently returned books</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {readingHistory.map((book) => (
                  <div key={book.id} className="flex items-center gap-3 pb-3 border-b last:border-0">
                    <BookOpen className="w-4 h-4 text-muted-foreground" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{book.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(book.returnDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Trash2, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Navigation from "@/components/Navigation";

const Cart = () => {
  const { toast } = useToast();
  const [cartItems, setCartItems] = useState([
    { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald", dueDate: "2024-12-15" },
    { id: 2, title: "To Kill a Mockingbird", author: "Harper Lee", dueDate: "2024-12-15" },
  ]);

  const handleRemove = (id: number, title: string) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
    toast({
      title: "Removed from Cart",
      description: `"${title}" has been removed`,
    });
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast({
        title: "Cart is Empty",
        description: "Add some books before checking out",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Books Borrowed Successfully",
      description: `You have borrowed ${cartItems.length} book(s)`,
    });
    setCartItems([]);
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div className="container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-5xl font-bold mb-4">Your Cart</h1>
            <p className="text-xl text-muted-foreground">
              {cartItems.length} book(s) ready to borrow
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.length === 0 ? (
                <Card className="elevation-2">
                  <CardContent className="pt-16 pb-16 text-center">
                    <BookOpen className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-xl font-semibold mb-2">Your cart is empty</h3>
                    <p className="text-muted-foreground mb-6">Add some books to get started</p>
                    <Button asChild>
                      <a href="/books">Browse Books</a>
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                cartItems.map((item) => (
                  <Card key={item.id} className="elevation-2 hover:elevation-3 transition-smooth">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex gap-4">
                          <div className="h-24 w-16 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                            <BookOpen className="w-8 h-8 text-primary/40" />
                          </div>
                          <div>
                            <CardTitle className="text-xl mb-1">{item.title}</CardTitle>
                            <CardDescription>{item.author}</CardDescription>
                            <div className="flex items-center gap-2 mt-3 text-sm text-muted-foreground">
                              <Calendar className="w-4 h-4" />
                              <span>Due: {new Date(item.dueDate).toLocaleDateString()}</span>
                            </div>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleRemove(item.id, item.title)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="w-5 h-5" />
                        </Button>
                      </div>
                    </CardHeader>
                  </Card>
                ))
              )}
            </div>

            {/* Summary */}
            <div>
              <Card className="elevation-3 sticky top-24">
                <CardHeader>
                  <CardTitle>Borrowing Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Total Books</span>
                    <span className="font-medium">{cartItems.length}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Borrowing Period</span>
                    <span className="font-medium">14 days</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Late Fee</span>
                    <span className="font-medium">$1/day</span>
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex justify-between font-semibold">
                      <span>Membership Fee</span>
                      <span className="text-green-600">FREE</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    onClick={handleCheckout}
                    className="w-full"
                    disabled={cartItems.length === 0}
                  >
                    Complete Borrowing
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;

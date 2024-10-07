import { useState } from "react";
import {
    Box,
    Typography,
    TextField,
    Button,
    Grid,
    Card,
    CardContent,
    CardActions,
    AppBar,
    Toolbar,
    IconButton,
    Snackbar,
    Divider,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CloseIcon from "@mui/icons-material/Close";

const productsData = [
    { id: 1, name: "Product 1", price: 10, discount: 0, quantity: 1, category: "Electronics", barcode: "123456", details: "Details about Product 1", img: "https://via.placeholder.com/50" },
    { id: 2, name: "Product 2", price: 20, discount: 5, quantity: 1, category: "Electronics", barcode: "234567", details: "Details about Product 2", img: "https://via.placeholder.com/50" },
    { id: 4, name: "Product 4", price: 30, discount: 0, quantity: 1, category: "Groceries", barcode: "345678", details: "Details about Product 3", img: "https://via.placeholder.com/50" },
    { id: 5, name: "Product 5", price: 30, discount: 0, quantity: 1, category: "Groceries", barcode: "345678", details: "Details about Product 3", img: "https://via.placeholder.com/50" },
    { id: 6, name: "Product 6", price: 30, discount: 0, quantity: 1, category: "Groceries", barcode: "345678", details: "Details about Product 3", img: "https://via.placeholder.com/50" },
    { id: 7, name: "Product 7", price: 30, discount: 0, quantity: 1, category: "Groceries", barcode: "345678", details: "Details about Product 3", img: "https://via.placeholder.com/50" },
    { id: 8, name: "Product 8", price: 30, discount: 0, quantity: 1, category: "Groceries", barcode: "345678", details: "Details about Product 3", img: "https://via.placeholder.com/50" },
    { id: 9, name: "Product 9", price: 30, discount: 0, quantity: 1, category: "Groceries", barcode: "345678", details: "Details about Product 3", img: "https://via.placeholder.com/50" },
    { id: 10, name: "Product 10", price: 30, discount: 0, quantity: 1, category: "Groceries", barcode: "345678", details: "Details about Product 3", img: "https://via.placeholder.com/50" },
    { id: 11, name: "Product 11", price: 30, discount: 0, quantity: 1, category: "Groceries", barcode: "345678", details: "Details about Product 3", img: "https://via.placeholder.com/50" },
    { id: 12, name: "Product 12", price: 30, discount: 0, quantity: 1, category: "Groceries", barcode: "345678", details: "Details about Product 3", img: "https://via.placeholder.com/50" }
];

const POSCashierPage = () => {
    const [searchItem, setSearchItem] = useState("");
    const [cart, setCart] = useState([]);
    const [customerName, setCustomerName] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("Cash");
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const addToCart = (product) => {
        const existingProduct = cart.find((item) => item.id === product.id);
        if (existingProduct) {
            existingProduct.quantity += 1; // Increase quantity if already in cart
        } else {
            setCart((prevCart) => [...prevCart, { ...product, quantity: 1 }]); // Add new product to cart
        }
        setSnackbarOpen(true);
    };

    const handleQuantityChange = (productId, action) => {
        setCart((prevCart) => {
            return prevCart.map((item) => {
                if (item.id === productId) {
                    if (action === "increase") {
                        item.quantity += 1;
                    } else if (action === "decrease" && item.quantity > 1) {
                        item.quantity -= 1;
                    }
                }
                return item;
            });
        });
    };

    const handleDeleteItem = (productId) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
    };

    const handlePayment = () => {
        if (cart.length === 0) {
            alert("Please add items to your cart before processing payment.");
            return;
        }
        alert(`Payment processed with ${paymentMethod}`);
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    const calculateTotals = (cart) => {
        const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity * (1 - item.discount / 100), 0);
        const totalDiscount = cart.reduce((total, item) => total + (item.price * item.discount / 100) * item.quantity, 0);
        const totalTax = totalPrice * 0.1; // Example tax calculation

        return { totalPrice, totalDiscount, totalTax };
    };

    const { totalPrice, totalDiscount, totalTax } = calculateTotals(cart);

    const filteredProducts = productsData.filter((product) =>
        product.name.toLowerCase().includes(searchItem.toLowerCase())
    );

    return (
        <Box sx={{ padding: 2, display: "flex", flexDirection: "column", height: "100vh" }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6">POS Cashier</Typography>
                    <IconButton edge="end" color="inherit" sx={{ marginLeft: "auto" }}>
                        <ShoppingCartIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>

            <Box sx={{ display: "flex", flexGrow: 1, marginTop: 2 }}>
                {/* Products Section */}
                <Box sx={{ flex: 1, paddingRight: 2, overflowY: "auto" }}>
                    <TextField
                        label="Customer Name"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        fullWidth
                        sx={{ marginBottom: 2 }}
                    />

                    <TextField
                        label="Search Products"
                        value={searchItem}
                        onChange={(e) => setSearchItem(e.target.value)}
                        fullWidth
                        sx={{ marginBottom: 2 }}
                    />

                    <Grid container spacing={2}>
                        {filteredProducts.map((product) => (
                            <Grid item xs={6} sm={4} md={3} key={product.id}>
                                <Card>
                                    <CardContent>
                                        <img src={product.img} alt={product.name} style={{ width: 50, height: 50 }} />
                                        <Typography variant="h6">{product.name}</Typography>
                                        <Typography>Price: ${product.price.toFixed(2)}</Typography>
                                        <Typography>Discount: {product.discount}%</Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button variant="contained" color="primary" onClick={() => addToCart(product)}>
                                            Add to Cart
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Box>

                {/* Cart Section */}
                <Box sx={{ flex: 1, paddingLeft: 2, overflowY: "auto" }}>
                    <Typography variant="h5">Shopping Cart</Typography>
                    <Divider />
                    {cart.map((item) => (
                        <Box key={item.id} sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}>
                            <img src={item.img} alt={item.name} style={{ width: 50, height: 50 }} />
                            <Typography variant="body1" sx={{ flexGrow: 1, marginLeft: 2 }}>{item.name} x {item.quantity}</Typography>
                            <Button onClick={() => handleQuantityChange(item.id, "decrease")}>-</Button>
                            <Button onClick={() => handleQuantityChange(item.id, "increase")}>+</Button>
                            <Button onClick={() => handleDeleteItem(item.id)} color="error">Remove</Button>
                        </Box>
                    ))}

                    <Divider sx={{ marginBottom: 2 }} />
                    <Typography variant="h6">Total Price: ${totalPrice.toFixed(2)}</Typography>
                    <Typography variant="h6">Total Discount: ${totalDiscount.toFixed(2)}</Typography>
                    <Typography variant="h6">Total Tax: ${totalTax.toFixed(2)}</Typography>

                    <TextField
                        label="Payment Method"
                        value={paymentMethod}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        fullWidth
                        sx={{ marginBottom: 2 }}
                    />
                    <Button variant="contained" color="primary" onClick={handlePayment} fullWidth>
                        Process Payment
                    </Button>
                </Box>
            </Box>

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={handleSnackbarClose}
                message="Product added to cart"
                action={
                    <IconButton size="small" aria-label="close" color="inherit" onClick={handleSnackbarClose}>
                        <CloseIcon fontSize="small" />
                    </IconButton>
                }
            />
        </Box>
    );
};

export default POSCashierPage;

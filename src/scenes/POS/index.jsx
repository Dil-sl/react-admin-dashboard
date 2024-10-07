import React, { useState } from "react";
import {
    Box,
    Typography,
    Button,
    Card,
    CardContent,
    CardActions,
    Grid,
    TextField,
    Divider,
    Snackbar,
    IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const POSCashierPage = () => {
    const [searchItem, setSearchItem] = useState("");
    const [cart, setCart] = useState([]);
    const [paymentMethod, setPaymentMethod] = useState("");
    const [invoiceNumber] = useState("INV12345"); // Example invoice number
    const [customerName] = useState("John Doe"); // Example customer name
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const products = [
        { id: 1, name: "Product 1", price: 10, discount: 0, img: "product1.jpg", quantity: 1 },
        { id: 2, name: "Product 2", price: 15, discount: 5, img: "product2.jpg", quantity: 1 }
        // Add more products as needed
    ];

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchItem.toLowerCase())
    );

    const handleAddToCart = (product) => {
        const existingItem = cart.find(item => item.id === product.id);
        if (existingItem) {
            setCart(cart.map(item =>
                item.id === product.id
                    ? { ...existingItem, quantity: existingItem.quantity + product.quantity }
                    : item
            ));
        } else {
            setCart([...cart, { ...product }]);
        }
        setSnackbarOpen(true);
    };

    const handleQuantityChange = (id, action) => {
        setCart(cart.map(item => {
            if (item.id === id) {
                if (action === "increase") {
                    return { ...item, quantity: item.quantity + 1 };
                } else if (action === "decrease" && item.quantity > 1) {
                    return { ...item, quantity: item.quantity - 1 };
                }
            }
            return item;
        }));
    };

    const handleDeleteItem = (id) => {
        setCart(cart.filter(item => item.id !== id));
    };

    const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    const totalDiscount = cart.reduce((total, item) => total + (item.price * item.discount / 100) * item.quantity, 0);
    const totalTax = totalPrice * 0.1; // Example tax rate of 10%

    const handlePayment = () => {
        // Process payment logic
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    return (
        <Box sx={{ display: "flex", flexDirection: "row", height: "100vh", padding: 2 }}>
            {/* Product List Section */}
            <Box sx={{ flex: 1, overflowY: "auto", height: "100vh", marginRight: 2 }}>
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
                            <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
                                <CardContent sx={{ flex: 1 }}>
                                    <img src={product.img} alt={product.name} style={{ width: 50, height: 50 }} />
                                    <Typography variant="h6">{product.name}</Typography>
                                    <Typography>Price: ${product.price.toFixed(2)}</Typography>
                                    <Typography>Discount: {product.discount}%</Typography>
                                    <Box sx={{ display: "flex", alignItems: "center", marginTop: 1 }}>
                                        <Button
                                            variant="outlined"
                                            onClick={() => handleQuantityChange(product.id, "decrease")}
                                            disabled={product.quantity <= 1}
                                        >
                                            -
                                        </Button>
                                        <Typography sx={{ margin: "0 10px" }}>{product.quantity}</Typography>
                                        <Button variant="outlined" onClick={() => handleQuantityChange(product.id, "increase")}>+</Button>
                                    </Box>
                                </CardContent>
                                <CardActions sx={{ justifyContent: "space-between" }}>
                                    <Button variant="contained" color="primary" onClick={() => handleAddToCart(product)}>
                                        Add to Cart
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>

            {/* Cart Section */}
            <Box sx={{ width: "400px", paddingLeft: 2, overflowY: "auto", height: "100vh", borderLeft: "1px solid #ccc" }}>
                <Typography variant="h5">Shopping Cart</Typography>
                <Divider />
                <Box sx={{ marginBottom: 2 }}>
                    <Typography variant="subtitle1">Invoice Number: {invoiceNumber}</Typography>
                    <Typography variant="subtitle1">Customer Name: {customerName}</Typography>
                </Box>

                <Box sx={{ flex: 1, overflowY: "auto" }}>
                    {cart.map((item) => (
                        <Box key={item.id} sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}>
                            <img src={item.img} alt={item.name} style={{ width: 50, height: 50 }} />
                            <Typography variant="body1" sx={{ flexGrow: 1, marginLeft: 2 }}>{item.name} x {item.quantity}</Typography>
                            <Button variant="outlined" onClick={() => handleQuantityChange(item.id, "decrease")} disabled={item.quantity <= 1}>-</Button>
                            <Typography sx={{ margin: "0 10px" }}>{item.quantity}</Typography>
                            <Button variant="outlined" onClick={() => handleQuantityChange(item.id, "increase")}>+</Button>
                            <Button variant="contained" color="error" onClick={() => handleDeleteItem(item.id)} sx={{ marginLeft: 1 }}>Remove</Button>
                        </Box>
                    ))}
                </Box>

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

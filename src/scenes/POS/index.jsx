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
    Paper,
    Snackbar,
    Divider,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CloseIcon from "@mui/icons-material/Close";

const productsData = [
    { id: 1, name: "Product 1", price: 10, discount: 0, quantity: 1, category: "Electronics", barcode: "123456", details: "Details about Product 1", img: "https://via.placeholder.com/50" },
    { id: 2, name: "Product 2", price: 20, discount: 5, quantity: 1, category: "Electronics", barcode: "234567", details: "Details about Product 2", img: "https://via.placeholder.com/50" },
    { id: 3, name: "Product 3", price: 30, discount: 0, quantity: 1, category: "Groceries", barcode: "345678", details: "Details about Product 3", img: "https://via.placeholder.com/50" },
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
        alert(`Payment processed with ${paymentMethod}`);
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    const filteredProducts = productsData.filter((product) =>
        product.name.toLowerCase().includes(searchItem.toLowerCase())
    );

    const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity * (1 - item.discount / 100), 0);
    const totalDiscount = cart.reduce((total, item) => total + (item.price * item.discount / 100) * item.quantity, 0);
    const totalTax = totalPrice * 0.1; // Example tax calculation, adjust as necessary

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
                        label="Search Product"
                        value={searchItem}
                        onChange={(e) => setSearchItem(e.target.value)}
                        fullWidth
                        sx={{ marginBottom: 2 }}
                    />

                    <Grid container spacing={2}>
                        {filteredProducts.map((product) => (
                            <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                                <Card variant="outlined" sx={{ padding: 1, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                    <CardContent sx={{ textAlign: 'center' }}>
                                        <img src={product.img} alt={product.name} style={{ width: "50px", height: "50px", margin: "0 auto", display: "block", borderRadius: "5%" }} />
                                        <Typography variant="h6" sx={{ fontSize: '0.9rem' }}>{product.name}</Typography>
                                        <Typography variant="body1" sx={{ fontSize: '0.8rem' }}>Price: ${product.price.toFixed(2)}</Typography>
                                        <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>Discount: {product.discount}%</Typography>
                                        <Box display="flex" justifyContent="center" alignItems="center">
                                            <Button size="small" onClick={() => handleQuantityChange(product.id, "decrease")}>-</Button>
                                            <Typography variant="body1" sx={{ margin: "0 10px", fontSize: '0.9rem' }}>{product.quantity}</Typography>
                                            <Button size="small" onClick={() => handleQuantityChange(product.id, "increase")}>+</Button>
                                        </Box>
                                    </CardContent>
                                    <CardActions>
                                        <Button size="small" variant="contained" color="primary" onClick={() => addToCart(product)}>
                                            Add to Cart
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Box>

                {/* Shopping Cart Section */}
                <Box sx={{ width: { xs: "100%", md: "300px" }, paddingLeft: { xs: 0, md: 2 }, flexShrink: 0, position: "relative" }}>
                    <Paper elevation={3} sx={{ padding: 2, height: "100%", display: "flex", flexDirection: "column", maxHeight: "calc(100vh - 150px)", overflowY: "auto" }}>
                        <Typography variant="h5">Shopping Cart</Typography>
                        <Divider sx={{ marginY: 1 }} />
                        {cart.map((item) => (
                            <Box key={item.id} sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", margin: "10px 0", width: `${Math.max(100 - (cart.length * 5), 50)}%` }}>
                                <Box sx={{ display: "flex", alignItems: "center" }}>
                                    <img src={item.img} alt={item.name} style={{ width: "50px", height: "50px", marginRight: 10 }} />
                                    <Typography variant="body1">{item.name} x{item.quantity}</Typography>
                                </Box>
                                <IconButton onClick={() => handleDeleteItem(item.id)}>
                                    <Typography variant="body2">🗑️</Typography>
                                </IconButton>
                                <Box display="flex" alignItems="center">
                                    <Button size="small" onClick={() => handleQuantityChange(item.id, "decrease")}>-</Button>
                                    <Typography variant="body1" sx={{ margin: "0 10px" }}>{item.quantity}</Typography>
                                    <Button size="small" onClick={() => handleQuantityChange(item.id, "increase")}>+</Button>
                                </Box>
                                <Typography variant="body1">${(item.price * item.quantity * (1 - item.discount / 100)).toFixed(2)}</Typography>
                            </Box>
                        ))}
                        <Divider sx={{ marginY: 1 }} />
                        <Box sx={{ display: "flex", flexDirection: "column" }}>
                            <Typography variant="body1">Total Price: ${(totalPrice + totalTax).toFixed(2)}</Typography>
                            <Typography variant="body1">Total Discount: -${totalDiscount.toFixed(2)}</Typography>
                            <Typography variant="body1">Tax: ${totalTax.toFixed(2)}</Typography>
                        </Box>

                        <TextField
                            label="Payment Method"
                            value={paymentMethod}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            fullWidth
                            sx={{ marginTop: 2 }}
                        />

                        <Button variant="contained" color="primary" fullWidth onClick={handlePayment} sx={{ marginTop: 2 }}>
                            Process Payment
                        </Button>
                    </Paper>
                </Box>
            </Box>

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={handleSnackbarClose}
                message="Product added to cart"
                action={
                    <IconButton size="small" color="inherit" onClick={handleSnackbarClose}>
                        <CloseIcon fontSize="small" />
                    </IconButton>
                }
            />
        </Box>
    );
};

export default POSCashierPage;

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
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CloseIcon from "@mui/icons-material/Close";
//import { useTheme } from "@mui/material/styles";

const productsData = [
    // Sample product data (replace with real data)
    { id: 1, name: "Product 1", price: 10, discount: 0, quantity: 1, category: "Electronics", barcode: "123456", details: "Details about Product 1", img: "https://via.placeholder.com/100" },
    { id: 2, name: "Product 2", price: 20, discount: 5, quantity: 1, category: "Electronics", barcode: "234567", details: "Details about Product 2", img: "https://via.placeholder.com/100" },
    { id: 3, name: "Product 3", price: 30, discount: 0, quantity: 1, category: "Groceries", barcode: "345678", details: "Details about Product 3", img: "https://via.placeholder.com/100" },
];

const POSCashierPage = () => {
    //const theme = useTheme();
    const [searchItem, setSearchItem] = useState("");
    const [cart, setCart] = useState([]);
    const [customerName, setCustomerName] = useState("");
    const [filterCategory, setFilterCategory] = useState("");
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const addToCart = (product) => {
        const existingProduct = cart.find((item) => item.id === product.id);
        if (existingProduct) {
            existingProduct.quantity += 1; // Increase quantity if already in cart
            setCart([...cart]);
        } else {
            setCart([...cart, { ...product }]); // Add new product to cart
        }
        setSnackbarOpen(true);
    };

    const handleQuantityChange = (productId, action) => {
        setCart((prevCart) => {
            const updatedCart = prevCart.map((item) => {
                if (item.id === productId) {
                    if (action === "increase") {
                        item.quantity += 1;
                    } else if (action === "decrease" && item.quantity > 1) {
                        item.quantity -= 1;
                    }
                }
                return item;
            });
            return updatedCart;
        });
    };

    const handlePayment = () => {
        // Handle payment logic here
        alert("Payment processed");
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    const handleFilterChange = (event) => {
        setFilterCategory(event.target.value);
    };

    const filteredProducts = productsData.filter((product) => {
        const matchesCategory = !filterCategory || product.category === filterCategory;
        const matchesSearch = product.name.toLowerCase().includes(searchItem.toLowerCase()) || product.id.toString().includes(searchItem) || product.barcode.includes(searchItem);
        return matchesCategory && matchesSearch;
    });

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
                <Box sx={{ flex: 1, paddingRight: 2 }}>
                    <TextField
                        label="Customer Name"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        fullWidth
                        sx={{ marginBottom: 2 }}
                    />

                    <TextField
                        label="Search Product by Name, ID, or Barcode"
                        value={searchItem}
                        onChange={(e) => setSearchItem(e.target.value)}
                        fullWidth
                        sx={{ marginBottom: 2 }}
                    />

                    <TextField
                        label="Filter by Category"
                        value={filterCategory}
                        onChange={handleFilterChange}
                        fullWidth
                        sx={{ marginBottom: 2 }}
                    />

                    <Grid container spacing={2}>
                        {filteredProducts.map((product) => (
                            <Grid item xs={4} key={product.id}>
                                <Card variant="outlined" sx={{ padding: 1 }}>
                                    <CardContent>
                                        <img src={product.img} alt={product.name} style={{ width: "100%", height: "auto" }} />
                                        <Typography variant="h6">{product.name}</Typography>
                                        <Typography variant="body1">Price: ${product.price}</Typography>
                                        <Typography variant="body2">Discount: {product.discount}%</Typography>
                                        <Typography variant="body2">Category: {product.category}</Typography>
                                        <Typography variant="body2">ID: {product.id}</Typography>
                                        <Typography variant="body2">Details: {product.details}</Typography>
                                        <Box display="flex" alignItems="center">
                                            <Button onClick={() => handleQuantityChange(product.id, "decrease")}>-</Button>
                                            <Typography variant="body1" sx={{ margin: "0 10px" }}>{product.quantity}</Typography>
                                            <Button onClick={() => handleQuantityChange(product.id, "increase")}>+</Button>
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

                <Box sx={{ width: "300px", paddingLeft: 2 }}>
                    <Paper elevation={3} sx={{ padding: 2, height: "100%", overflow: "auto" }}>
                        <Typography variant="h5">Shopping Cart</Typography>
                        {cart.map((item) => (
                            <Box key={item.id} sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", margin: "10px 0" }}>
                                <Typography variant="body1">{item.name} x{item.quantity}</Typography>
                                <IconButton onClick={() => handleQuantityChange(item.id, "decrease")}>
                                    <Typography variant="body2">-</Typography>
                                </IconButton>
                                <IconButton onClick={() => handleQuantityChange(item.id, "increase")}>
                                    <Typography variant="body2">+</Typography>
                                </IconButton>
                            </Box>
                        ))}
                        <Button variant="contained" color="primary" onClick={handlePayment}>
                            Checkout
                        </Button>
                    </Paper>
                </Box>
            </Box>

            {/* Snackbar for notifications */}
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
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

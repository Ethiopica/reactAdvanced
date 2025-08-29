import { useEffect, useState } from "react";
import { getProducts } from "../services/api";
import type { Product } from "../types/product";
import { Card } from "@mui/material";
import { Grid } from "@mui/material";

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getProducts().then((products) => {
      setProducts(products);
    });
  }, []);

  console.log("Products: ", products);

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>Products</h1>
      <input
        type="search"
        placeholder="Search for a product"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <Grid container spacing={2}>
        {filteredProducts.map((product) => (
         
            <Card
              key={product.id}
              sx={{
                padding: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: 1000,
                marigin: "0, 0, 50, 50"

              }}
            >
              <h2>{product.title}</h2>
              <h3>${product.price}</h3>
              <p>{product.description}</p>
              <p>{product.category}</p>
              <img
                src={product.image}
                alt={product.title}
                style={{ width: "100px", height: "100px", objectFit: "contain" }}
              />
              <p>
                Rating: {product.rating.rate} ({product.rating.count} reviews)
              </p>
            </Card>
        ))}
      </Grid>
    </div>
  );
};

export default Products;





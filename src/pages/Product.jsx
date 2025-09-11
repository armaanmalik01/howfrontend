import { useLoaderData } from "react-router";
import ProductCard from "../components/ProductCard"



export default function Product(props) {

    const { data: { products } } = useLoaderData();

    return <>
        <style jsx>
            {
                `
        .product-list-container {
          display: flex;
          flex-wrap: wrap;
          align-items: flex-start;
          justify-content: center;
          gap: 2rem;
          padding: 1.5rem;
        }`
            }

        </style>
        <div className="product-list-container">
            {
                products.map(e => {
                    return <ProductCard product={e} />
                })
            }
        </div>
    </>
}
// import komponen
import AddProduct from "./addProduct";
import UpdateProduct from "./updateProduct";
import DeleteProduct from "./deleteProduct";

// mengekspor metadata untuk menggubah title halaman
export const metadata = {
    title: "Product List",
};

// mendefinisikan object data products
type Product = {
    id: number;
    title: string;
    price: number;
};

// mengambil data procuts dari url yang dihasilkan dba.json
async function getProducts() {
    const res = await fetch('http://localhost:4500/products', { cache: 'no-store' });
    return res.json();
}

// menampilkan data products yang disimpan pada variabel "products: Product[]"
export default async function ProductList() {
    const products: Product[] = await getProducts();
    return (
        <div className="p-10">
            <div className="py-2">
                <AddProduct />
            </div>
            {/* menampilkan data menggunakan tabel */}
            <table className="table w-full">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Products Name</th>
                        <th>Price</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {/* menampilkan data produk array menggunakan .map */}
                    {products.map((product, index) => (
                        // menampilkan produk id_produk perbaris
                        <tr key={product.id}>
                            {/* operator penjumlahan pada index untuk menambah no perbaris */}
                            <td>{index + 1}</td>
                            {/* menampilkan nama produk(title) perid_products */}
                            <td>{product.title}</td>
                            {/* menampilkan harga(price) perid_products */}
                            <td>{product.price}</td>
                            <td className="flex">
                                <div className="mr-1">
                                    <UpdateProduct {...product} />
                                </div>
                                <DeleteProduct {...product} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
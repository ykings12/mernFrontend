import { Link } from "react-router-dom";
import moment from "moment";
import { useAllProductsQuery } from "../../redux/api/productApiSlice";
import AdminMenu from "./AdminMenu";
import Loader from "../../components/Loader";

const AllProducts = () => {
  const { data: products, isLoading, isError } = useAllProductsQuery();

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <div>Error loading products</div>;
  }
  
  return (
    <div className="ml-[6rem]">
    <div className="container mx-auto px-4">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-3/4 p-3">
          <div className="ml-4 text-xl font-bold h-12">
            All Products ({products.length})
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((product) => (
              <Link
                key={product._id}
                to={`/admin/product/update/${product._id}`}
                className="block overflow-hidden border rounded-lg shadow-sm"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <div className="flex justify-between">
                    <h5 className="text-xl font-semibold mb-2">
                      {product?.name}
                    </h5>
                    <p className="text-gray-400 text-sm">
                      {moment(product.createdAt).format("MMMM Do YYYY")}
                    </p>
                  </div>
                  <p className="text-gray-400 text-sm mb-4">
                    {product?.description?.substring(0, 160)}...
                  </p>
                  <div className="flex justify-between items-center">
                    <Link
                      to={`/admin/product/update/${product._id}`}
                      className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-orange-700 rounded-lg hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-orange-300 dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800"
                    >
                      Update Product
                      <svg
                        className="w-3.5 h-3.5 ml-2"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 10"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M1 5h12m0 0L9 1m4 4L9 9"
                        />
                      </svg>
                    </Link>
                    <p className="text-lg font-semibold">₹ {product?.price}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="md:w-1/4 p-3 mt-2">
          <AdminMenu />
        </div>
      </div>
    </div>
    </div>
  );
};

export default AllProducts;

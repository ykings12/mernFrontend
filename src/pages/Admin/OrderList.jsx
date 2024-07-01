import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { Link } from "react-router-dom";
import { useGetOrdersQuery } from "../../redux/api/orderApiSlice";
import AdminMenu from "./AdminMenu";

const OrderList = () => {
  const { data: orders, isLoading, error } = useGetOrdersQuery();

  return (
    <>
      <div className="container mx-auto px-4">
        <div className=" flex-col ml-[5rem] md:flex-row">
          {isLoading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">
              {error?.data?.message || error.error}
            </Message>
          ) : (
            <>
              <AdminMenu />
              <table className="container mx-auto w-[90%]">
                <thead className=" border">
                  <tr className="mb-[5rem] text-bold text-orange-300">
                    <th className="text-left pl-1">Items</th>
                    <th className="text-left pl-1">ID</th>
                    <th className="text-left pl-1">User</th>
                    <th className="text-left pl-1">Data</th>
                    <th className="text-left pl-1">Total</th>
                    <th className="text-left pl-1">Paid</th>
                    <th className="text-left pl-1">Delivered</th>
                  </tr>
                </thead>

                <tbody>
                  {orders.map((order) => (
                    <tr key={order._id}>
                      <td>
                        <img
                          src={order.orderItems[0].image}
                          alt={order._id}
                          className="w-[5rem] pt-4"
                        />
                      </td>
                      <td>{order._id}</td>
                      <td>{order.user ? order.user.username : "N/A"}</td>
                      <td>
                        {order.createdAt
                          ? order.createdAt.substring(0, 10)
                          : "N/A"}
                      </td>
                      <td>₹ {order.totalPrice}</td>
                     
                      <td className="py-2">
                        {order.isPaid ? (
                          <p className="p-1 text-center bg-green-500 w-[6rem] rounded-full">
                            Completed
                          </p>
                        ) : (
                          <p className="p-1 text-center bg-red-500 w-[6rem] rounded-full">
                            Pending
                          </p>
                        )}
                      </td>

                      <td className="px-2 py-2">
                        {order.isDelivered ? (
                          <p className="p-1 text-center bg-green-500 w-[6rem] rounded-full">
                            Completed
                          </p>
                        ) : (
                          <p className="p-1 text-center bg-red-500 w-[6rem] rounded-full">
                            Pending
                          </p>
                        )}
                      </td>
                      <td>
                        <Link to={`/order/${order._id}`}>
                        <button className="bg-orange-500 text-white py-2 px-3 rounded">
                            More
                        </button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default OrderList;

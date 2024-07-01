import Chart from "react-apexcharts";
import { useGetUsersQuery } from "../../redux/api/usersApiSlice";
import {
  useGetTotalOrdersQuery,
  useGetTotalSalesByDateQuery,
  useGetTotalSalesQuery,
} from "../../redux/api/orderApiSlice";
import { useState, useEffect } from "react";
import AdminMenu from "./AdminMenu";
import OrderList from "./OrderList";
import Loader from "../../components/Loader";
import '../../Style.css'

const AdminDashboard = () => {
  const { data: sales, isLoading } = useGetTotalSalesQuery();
  const { data: customers, isLoading: loading } = useGetUsersQuery();
  const { data: orders, isLoading: loadingTwo } = useGetTotalOrdersQuery();
  const { data: salesDetail } = useGetTotalSalesByDateQuery();

  const [state, setState] = useState({
    options: {
      chart: {
        type: "line",
      },
      tooltip: {
        theme: "dark",
      },
      colors: ["#F7852C"],
      dataLabels: {
        enabled: true,
      },
      stroke: {
        curve: "smooth",
      },
      title: {
        text: "Sales Trend",
        align: "left",
        style: {
          color: '#FFFFFF' // Set title color to white
        }
      },
      grid: {
        borderColor: "#ccc",
      },
      markers: {
        size: 1,
      },
      xaxis: {
        categories: [],
        title: {
          text: "Date",
          style: {
            color: '#F7852C' // Set x-axis title color to white
          }
        },
        labels: {
          style: {
            colors: '#FFFFFF' // Set x-axis labels color to white
          }
        }
      },
      yaxis: {
        title: {
          text: "Sales",
          style: {
            color: '#F7852C' // Set y-axis title color to white
          }
        },
        min: 0,
        labels: {
          style: {
            colors: '#FFFFFF' // Set y-axis labels color to white
          },
          formatter: (value) => value.toFixed(2) // Format y-axis labels to 2 decimal places
        }
      },
      legend: {
        position: "top",
        horizontalAlign: "right",
        floating: true,
        offsetY: -25,
        offsetX: -5,
        labels: {
          colors: '#FFFFFF' // Set legend labels color to white
        }
      },
    },
    series: [{ name: " Sales", data: [] }],
  });

  useEffect(() => {
    if (salesDetail) {
      const formattedSalesDate = salesDetail.map((item) => ({
        x: item._id,
        y: item.totalSales,
      }));

      setState((prevState) => ({
        ...prevState,
        options: {
          ...prevState.options,
          xaxis: {
            categories: formattedSalesDate.map((item) => item.x),
          },
        },

        series: [
          { name: "Sales", data: formattedSalesDate.map((item) => item.y) },
        ],
      }));
    }
  }, [salesDetail]);

  return <>
  <AdminMenu/>
  <section className="xl:ml-[4rem] md:ml-[0rem]">
    <div className="w-[80%] flex justify-around flex-wrap">
        <div className="rounded-lg bg-black p-5 w-[20rem] mt-5">
            <div className="font-bold rounded-full w-[3rem] bg-orange-500 text-center p-3">
                ₹
            </div>
            <p className="mt-5">Sales</p>
            <h1 className="text-xl font-bold">
                ₹ {isLoading ? <Loader/> : sales.totalSales.toFixed(2)}
            </h1>
        </div>
        <div className="rounded-lg bg-black p-5 w-[20rem] mt-5">
            <div className="font-bold rounded-full w-[3rem] bg-orange-500 text-center p-3">
                ₹
            </div>
            <p className="mt-5">Customers</p>
            <h1 className="text-xl font-bold">
                 {isLoading ? <Loader/> : customers?.length}
            </h1>
        </div>
        <div className="rounded-lg bg-black p-5 w-[20rem] mt-5">
            <div className="font-bold rounded-full w-[3rem] bg-orange-500 text-center p-3">
                ₹
            </div>
            <p className="mt-5">All Orders</p>
            <h1 className="text-xl font-bold">
                 {isLoading ? <Loader/> : orders?.totalOrders}
            </h1>
        </div>

    </div>

    <div className="ml-[10rem] mt-[4rem]">
        <Chart options={state.options} series={state.series} type="line" width='70%'/>
    </div>
    
  </section>
  <div className="mt-[4rem]">
        <OrderList/>
    </div>
  </>;
};

export default AdminDashboard;

import ReactApexChart from 'react-apexcharts';

const TransactionChart = () => {

  const chartOptions = {
    chart: {
      type: 'bar', // Use 'bar' for column chart
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    },
    plotOptions: {
      bar: {
        horizontal: false, // Set to true for a horizontal chart
        columnWidth: '20%', // Adjust the width of the columns
      },
    },
    dataLabels: {
      enabled: false,
    },
     responsive: [
    {
      breakpoint: 800, // Adjust the breakpoint as needed
      options: {
            yaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    },
        plotOptions: {
          bar: {
            horizontal: true,
            columnWidth: '30%', // Adjust the column width for smaller screens
          },
        },
      },
    },
    {
      breakpoint: 480, // Adjust the breakpoint as needed
      options: {
        yaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    },
        plotOptions: {
          bar: {
            horizontal: true,
            columnWidth: '50%', // Adjust the column width for even smaller screens
          },
        },
      },
    },
  ],
  };

  const chartData = [
    {
      name: 'Credit',
      color: "#16A34A", // Green color for Series 1
      data: [40, 30, 50, 60, 45,0,12,23,40,20,30,10],
    },
    {
      name: 'Debit',
      color: '#FF0000', // Red color for Series 2
      data: [35, 45, 55, 50, 40,12,23,40,20,30,10],
    },
  ];

  return (
    <>
    <div className="charts m-4">
        <div className="charts-card">
            <div className="flex items-center h-12  bg-slate-200 rounded-md mx-4 my-2">

          <h2 className="text-xl font-semibold  m-auto">Transaction<span className='text-base'> ( 2023 )</span> </h2>
            </div>
            <div className="double-column-chart ">
            <ReactApexChart options={chartOptions} series={chartData} type="bar" height={400} />
            </div>
        </div>
       
        {/* Add more charts here */}
    </div>
</>
  )
}

export default TransactionChart
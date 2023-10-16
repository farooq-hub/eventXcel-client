
import { useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';

const OrderChart = () => {

  const options = {
    chart: {
      type: 'area',
      stacked: false,
      height: 350,
      zoom: {
        type: 'x',
        enabled: true,
        autoScaleYaxis: true,
      },
      toolbar: {
        autoSelected: 'zoom',
      },
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 0,
    },
    title: {
      text: 'Stock Price Movement',
      align: 'left',
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        inverseColors: false,
        opacityFrom: 0.5,
        opacityTo: 0,
        stops: [0, 90, 100],
      },
    },
    yaxis: {
      title: {
        text: 'Price',
      },
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    },
   
  };

  const series = [
    {
      name: 'Order For',
      data: [0,0,0,0,0,0,0,0,1200000,1300000],
    },
  ];

  useEffect(()=>{

  },[])

  return (
    <div id="chart">
            <div className="flex items-center h-12  bg-slate-200 rounded-md mx-4 my-2">

          <h2 className="text-xl font-semibold  m-auto">Sales<span className='text-base'> ( 2023 )</span> </h2>
            </div>
            <div className="double-column-chart text-gre">
      <ReactApexChart options={options} series={series} type="area" height={350} />
            </div>

    </div>
  );
};

export default OrderChart

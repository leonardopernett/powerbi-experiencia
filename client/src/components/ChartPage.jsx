
import { Bar } from 'react-chartjs-2' 
import useChart from '../hooks/useChart';

export default function ChartPage() {
   
  const { data,data2 } = useChart()

  const getChart = {
  
      labels: ['Experience learning', 'CXM'],
      datasets: [
        {
          label: '# Vista de reporte',
          data: [data,data2],
          backgroundColor: [
            '#10345f',
            'rgba(53, 162, 235, 0.5)'
    
          ],
          borderColor: [
            '#10345f',
            'rgba(53, 162, 235, 0.5)'
    
          ],
          borderWidth: 1,
        },
      ],
  }

  return (
    <>
      <h2>Experiencia de clientes</h2>
      <h4>Numero de vista de reporte</h4>
      <div className='chart'>
        <Bar data={ getChart } style={{width:'200px', height:'200px'}} /> 
      </div>
    </>
    
  )
}

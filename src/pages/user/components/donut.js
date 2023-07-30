import DonutChart from "react-donut-chart";




export default function UserChart(){

    // convert user stage data 
    // render it

    return(
        <DonutChart colors={["red","green","blue"]} data={[
           {
      label: 'Status',
      value: 85,
    },
    {
      label: '',
      value: 20,
      isEmpty: true,
    },
        ]} height={300} width={300}/>
    )
}
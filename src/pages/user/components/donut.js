import DonutChart from "react-donut-chart";




export default function UserChart({completed,left}){
    return(
        <DonutChart colors={["green","red"]} data={[
           {
      label: 'Done',
      value: Math.floor(completed),
    },
    {
      label: 'left',
      value: Math.ceil(left),
    },
        ]} height={300} width={400}/>
    )
}
import { Typography } from "antd"

const {Title} = Typography;


export default function Progress({userStage,stages}){
    return(
        <>
            <div style={{height:"100%",display:"flex",flexDirection:"column"}}>
                <Title level={3}>Current Progress</Title>
                {
                    stages.map((stage,idx)=>(
                        <div style={{width:"100%",display:"flex",alignItems:"center",gap:"1em",marginBottom:"1em"}} key={idx}>
                            <div style={{height:"10px",width:"10px",backgroundColor:`${userStage.id > stage.id?"green":userStage.id === stage.id?"orange":"gray"}`}}/>
                            
                                <span>{stage.label} {userStage.id === stage.id && "(Current)"}</span>
                        </div>
                    ))
                }
            </div>
        </>
    )
}
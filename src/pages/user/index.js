import { Breadcrumb, Col, Row } from "antd";
import { RxDashboard } from "react-icons/rx";
import UserChart from "./components/donut";
import { userStore } from "../../store/userStore";
import { STAGES } from "../../DB/stages";
import Progress from "./components/progress";





export default function UserOverview(){
        
    // convert user stage data 
    // render it
    const currentuser = userStore(state=>state.user);

    const userStage = currentuser.status;
    
    const completedPercentage = ((userStage.id * 100)/STAGES.length)
    const remaining = (100 - completedPercentage);
    console.log(remaining)

    return(
        <>
            <div
                style={{
                    padding:"1em",
                    marginTop:"1em",
                    marginBottom:"1em",
                    boxShadow:"3px 8px 17px 0px rgba(0,0,0,0.75)"
                }}>
            <Breadcrumb>
                <Breadcrumb.Item>
                <RxDashboard style={{
                    fontSize:"1.5em"
                }}/>
                    Dashboard
                </Breadcrumb.Item>
                <Breadcrumb.Item>{" "}</Breadcrumb.Item>
            </Breadcrumb>
            </div> 
            <div style={{
                height:"100%",
                witdh:"95%",
                marginTop:"2em"
            }}>
                <Row style={{height:"40vh",display:"flex",justifyContent:"space-between"}} gutter={24}>
                    <Col style={{display:"flex",gap:"10em",alignItems:"flex-end",height:"100%",boxShadow:"3px 8px 17px 0px rgba(0,0,0,0.75)"}} span={16}>
                            <UserChart completed={completedPercentage} left={remaining}/>
                            <div style={{height:"100%",paddingTop:"2em"}}>
                                <Progress userStage={userStage} stages={STAGES}/>
                            </div>
                    </Col>
                    <Col span={7} style={{display:"flex",height:"100%",boxShadow:"3px 8px 17px 0px rgba(0,0,0,0.75)"}}>

                    </Col>
                </Row>
            </div>
        </>
    )
}
import { Breadcrumb, Button, Col, Divider, Row,Typography } from "antd";
import { RxDashboard } from "react-icons/rx";
import UserChart from "./components/donut";
import { userStore } from "../../store/userStore";
import { STAGES } from "../../DB/stages";
import Progress from "./components/progress";
import { BiSync } from "react-icons/bi";
import { useNavigate } from "react-router-dom";


const {Title} = Typography;





export default function UserOverview(){

    const navigate = useNavigate();

    const goToFacility = ()=> navigate("/student/facility")
        
    const currentuser = userStore(state=>state.user);

    const userStage = currentuser.status;
    
    const completedPercentage = ((userStage.id * 100)/STAGES.length)
    const remaining = (100 - completedPercentage);

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
                <div
                style={{
                    padding:"1em",
                    marginTop:"1em",
                    marginBottom:"1em",
                    // boxShadow:"3px 8px 17px 0px rgba(0,0,0,0.75)"
                }}>
                    <Title level={3}>Dashboard</Title>
                </div>
                <Row style={{height:"40vh",display:"flex",justifyContent:"space-between"}} gutter={24}>
                    <Col style={{display:"flex",gap:"10em",alignItems:"flex-end",height:"100%",boxShadow:"3px 8px 17px 0px rgba(0,0,0,0.75)"}} span={16}>
                            <UserChart completed={completedPercentage} left={remaining}/>
                            <div style={{height:"100%",paddingTop:"2em"}}>
                                <Progress userStage={userStage} stages={STAGES}/>
                            </div>
                    </Col>
                    <Col span={7} style={{display:"flex",flexDirection:"column",height:"100%",boxShadow:"3px 8px 17px 0px rgba(0,0,0,0.75)"}}>
                        <Divider style={{height:"30%"}}><Title level={3}>Action</Title></Divider>
                        <div style={{flex:1}}>
                            <div>
                                <Title level={5}>Current Stage: <span style={{fontStyle:"italic",color:"green"}}>{userStage.label}</span></Title>
                            </div>
                            <div style={{marginTop:"2em",display:"flex",gap:"2em"}}>
                                <Title level={5}>
                                    Required:
                                </Title>
                                <Button onClick={goToFacility} type="primary" style={{backgroundColor:"orange",display:"flex",alignItems:"center"}}>
                                    <BiSync style={{fontSize:20}}/>
                                    Go To Facility
                                </Button>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        </>
    )
}
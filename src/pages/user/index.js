import { Breadcrumb, Col, Row } from "antd";
import { RxDashboard } from "react-icons/rx";
import UserChart from "./components/donut";





export default function UserOverview(){


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
                <Row style={{height:"40vh"}} gutter={8}>
                    <Col style={{display:"flex",alignItems:"flex-end",height:"100%",boxShadow:"3px 8px 17px 0px rgba(0,0,0,0.75)"}} span={16}>
                            <UserChart/>
                    </Col>
                    <Col span={8}></Col>
                </Row>
            </div>
        </>
    )
}
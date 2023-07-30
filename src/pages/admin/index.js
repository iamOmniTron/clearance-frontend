import { Row,Typography,Col,Breadcrumb, Divider, Tag } from "antd";
import {FaUsers,FaCog,FaWpforms} from "react-icons/fa";
import { RxDashboard } from "react-icons/rx";
import { Link }  from "react-router-dom";
import DataTable from "../../components/datatable";
import { USERS } from "../../DB/users";

const {Title} = Typography;


const USERS_TABLE_COLUMN = [
    {
        title:"S/N",
        key:"s/n",
        render:(_,__,idx)=>idx+1
    },
    {
        title:"Fullname",
        dataIndex:"name",
        key:"name"
    },
    {
        title:"Registration Number",
        dataIndex:"registrationNumber",
        key:"registrationNumber"
    },
    {
        title:"E-Mail",
        dataIndex:"email",
        key:"email"
    },
    {
        title:"Current Progress",
        dataIndex:"status",
        key:"status",
        render:(status)=><Tag color="green">{status}</Tag>
    }
]


export default function AdminOverview(){

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
                <Row gutter={8} style={{height:"20vh"}}>
                    <Col span={8} style={{height:"100%"}}>
                        <Link to="/admin/users">
                            <div style={{
                            backgroundColor:'red',
                            height:"100%",
                            width:"100%",
                            display:"flex",
                            flexDirection:"column",
                            padding:"1em",
                            gap:"3em"
                        }}>
                            <div style={{
                                alignSelf:"end"
                            }}>
                                <FaUsers style={{fontSize:"3em",color:"white"}}/>
                            </div>
                            <div style={{
                                alignSelf:"start"
                            }}>
                                <Title level={3} style={{color:"white"}}>
                                    Students
                                </Title>
                            </div>
                            </div>
                        </Link>
                    </Col>
                    <Col span={8} style={{height:"100%"}}>
                        <Link to="/admin/dashboard/taxes">
                            <div style={{
                            backgroundColor:'green',
                            height:"100%",
                            width:"100%",
                            display:"flex",
                            flexDirection:"column",
                            padding:"1em",
                            gap:"3em"
                        }}>
                            <div style={{
                                alignSelf:"end"
                            }}>
                                <FaWpforms style={{fontSize:"3em",color:"white"}}/>
                            </div>
                            <div style={{
                                alignSelf:"start"
                            }}>
                                <Title level={3} style={{color:"white"}}>
                                    Forms
                                </Title>
                            </div>
                        </div>
                        </Link>
                    </Col>
                    <Col span={8} style={{height:"100%"}}>
                        <Link to="/admin/dashboard/payments">
                            <div style={{
                            backgroundColor:'gray',
                            height:"100%",
                            width:"100%",
                            display:"flex",
                            flexDirection:"column",
                            padding:"1em",
                            gap:"3em"
                        }}>
                            <div style={{
                                alignSelf:"end"
                            }}>
                                <FaCog style={{fontSize:"3em",color:"white"}}/>
                            </div>
                            <div style={{
                                alignSelf:"start"
                            }}>
                                <Title level={3} style={{color:"white"}}>
                                    Settings
                                </Title>
                            </div>
                        </div>
                        </Link>
                    </Col>
                </Row>
                <div style={{margin:"2em 0"}}>
                    <Divider orientation="left">
                    <Title level={3}>
                        ACTIVE USERS
                    </Title>
                    </Divider>
                </div>
                <div style={{
                marginTop:"2em"
                }}>
                <DataTable data={USERS} cols={USERS_TABLE_COLUMN}/>
            </div>
            </div>
        </>
    )
}
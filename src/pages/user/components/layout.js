import { Layout,Menu,Button, Avatar } from "antd"
import Logo from "../../../assets/logo.png"
import {RxDashboard} from "react-icons/rx";
import {ImPaypal} from "react-icons/im";
import { MenuFoldOutlined,MenuUnfoldOutlined } from "@ant-design/icons";
import { Link, Outlet } from "react-router-dom";
import {useState} from "react"
import {BiHistory} from "react-icons/bi"
import {FaUser, FaUserCog} from "react-icons/fa"



const USER_DASH_LINKS = [
    {
        key:"overview",
        label:<Link to="/student"><b>Overview</b></Link>,
        icon:<RxDashboard style={{
            fontSize:"2em"
        }}/>
    },
    {
        key:"biodata",
        label:<b>Bio-Data</b>,
        icon:<FaUserCog style={{
            fontSize:"2em"
        }}/>,
        children:[
            {
                key:"profile",
                label:<Link to="/student/profile"><b>Profile</b></Link>,
                icon:<FaUser style={{
                    fontSize:"2em"
                }}/>
            }
        ]
    }
]

const {Header,Sider,Content} = Layout;



export default function UserDashboardLayout(){
    const [isClosed,setIsClosed] = useState(false);

    return(
        <>
            <Layout style={{
                height:"100vh",
                display:"flex",
            }}>
                <Sider width={300} trigger={null} collapsible collapsed={isClosed} style={{
                    backgroundColor:"yellowgreen",
                    display:"flex",
                    flexDirection:"column",
                    height:"100vh",
                }}>
                    <div style={{
                        height:"10vh",
                        display:"flex",
                        justifyContent:"center",
                        alignItems:"center",
                    }}>
                        <Avatar shape="square" size={60} src={<img src={Logo}/>}/>
                    </div>
                    <Menu
                    style={{
                        backgroundColor:"yellowgreen",
                        color:"white"
                    }}
                        theme="light"
                        mode="inline"
                        items={USER_DASH_LINKS}
                        />
                </Sider>
                <Layout style={{
                        height:"100vh",
                        overflowY:"scroll"
                    }}>
                    <Header style={{
                        padding:0,
                        backgroundColor:"white"
                    }}>
                        <Button
                            type="text"
                            icon={isClosed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                            onClick={() => setIsClosed(!isClosed)}
                            style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                            }}
                        />
                    </Header>
                    <Content 
                        style={{
                            margin: '24px 16px',
                            padding: 24,
                            minHeight: 280,
                            background: "white",
                            borderRadius:"4px"
                        }}>
                        <Outlet/>
                    </Content>
                </Layout>
            </Layout>
        </>
    )
}
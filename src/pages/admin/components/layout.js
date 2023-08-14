import { Layout,Menu,Button, Avatar,Typography,message } from "antd"
import {TiMortarBoard} from "react-icons/ti"
import {MdOutlineAdminPanelSettings} from "react-icons/md"
import {RxDashboard} from "react-icons/rx";
import {FaWpforms} from "react-icons/fa";
import { MenuFoldOutlined,MenuUnfoldOutlined,LogoutOutlined } from "@ant-design/icons";
import { Link, Outlet,useNavigate } from "react-router-dom";
import {HiOutlineDocumentText} from "react-icons/hi";
import {useState} from "react"
import {AiOutlineSetting} from "react-icons/ai"
import {FaUsers} from "react-icons/fa";
import {BsFillCalendar2Fill} from "react-icons/bs";
import {LuCalendarClock} from "react-icons/lu"
import {BiSolidHourglass, BiUserCircle} from "react-icons/bi"
import { userStore } from "../../../store/userStore";
import { AUTH_TOKEN_NAME } from "../../../utils/defaults";


const {Title} = Typography;



const USER_DASH_LINKS = [
    {
        key:"overview",
        label:<Link to="/admin/"><b>Overview</b></Link>,
        icon:<RxDashboard style={{
            fontSize:"2em"
        }}/>
    },
    {
        key:"users",
        label:<b>Students</b>,
        icon:<FaUsers style={{
            fontSize:"2em"
        }}/>,
        children:[
            {
                key:"manage-users",
                label:<Link to="/admin/users"><b>Manage students</b></Link>,
                icon: <TiMortarBoard  style={{
                    fontSize:"2em"
                }}/>
            }
        ]
    },
    {
        key:"sessions",
        label:<b>Sessions</b>,
        icon:<BsFillCalendar2Fill style={{
            fontSize:"2em"
        }}/>,
        children:[
            {
                key:"manage-sessions",
                label:<Link to="/admin/sessions"><b>Manage Session</b></Link>,
                icon:<LuCalendarClock style={{
                    fontSize:"2em"
                }}/>
            }
        ]
    },
    {
        key:"configs",
        label:<b>Settings</b>,
        icon:<AiOutlineSetting style={{
            fontSize:"2em"
        }}/>,
        children:[
            {
                key:"forms",
                label:<Link to="/admin/settings/forms"><b>Forms</b></Link>,
                icon:<FaWpforms style={{
                    fontSize:"2em"
                }}/>
            },
            {
                key:"documents",
                label:<Link to="/admin/settings/document-type"><b>Documents</b></Link>,
                icon:<HiOutlineDocumentText style={{
                    fontSize:"2em"
                }}/>
            },
            {
                key:"stages",
                label:<Link to="/admin/settings/stages"><b>Stages</b></Link>,
                icon:<BiSolidHourglass style={{
                    fontSize:"2em"
                }}/>
            },
        ]
    }
]

const {Header,Sider,Content} = Layout;



export default function AdminDashboardLayout(){
    const [isClosed,setIsClosed] = useState(false);
    
    const user = userStore(state=>state.user);
    const logout = userStore(state=>state.logout);


    const navigate = useNavigate();

    const handleLogout = ()=>{
        sessionStorage.removeItem(AUTH_TOKEN_NAME);
        logout();
        message.success("Admin Logged out successfully");
        navigate("/");
    }

    return(
        <>
            <Layout style={{
                height:"100vh",
                display:"flex",
            }}>
                <Sider width={300} trigger={null} collapsible collapsed={isClosed} style={{
                    backgroundColor:"darkblue",
                    display:"flex",
                    flexDirection:"column",
                    height:"100vh",
                }}>
                    <div style={{
                        height:"10vh",
                        display:"flex",
                        padding:"1em",
                        alignItems:"center",
                    }}>
                        <Avatar shape="square" size={60} icon={<MdOutlineAdminPanelSettings/>}/>
                    </div>
                    <Menu
                    style={{
                        backgroundColor:"darkblue",
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
                        backgroundColor:"white",
                        display:"flex",
                        justifyContent:"space-between",
                        alignItems:"center"
                    }}>
                         <div>
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
                       <span style={{fontWeight:"bold",fontSize:"2em"}}>{(user.userId).toUpperCase()}</span>
                        </div>
                         <Button onClick={handleLogout} type="text">
                            <LogoutOutlined style={{
                                fontSize:20
                            }}/>
                        </Button>
                    </Header>
                    <Content 
                        style={{
                            margin: '24px 16px',
                            padding: 24,
                            minHeight: "90vh",
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
import {Avatar,Typography,Button,Input,Spin,Descriptions,Tag} from "antd";
import Logo from "../../assets/logo.png";
import Background from "../../assets/bg.jpg"
import Marquee from "react-fast-marquee";
import { useRef, useState } from "react";
import { USERS } from "../../DB/users";
import { extractValueFromInputRef, getRandomNumber } from "../../utils/helpers";
import { LoadingOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useGetUser } from "../../hooks/userQuery";


const {Title} = Typography;




const findUser = (regNumber)=>{
    const results = USERS.find(u=>u.registrationNumber.toLowerCase() == regNumber.toLowerCase());
    return results;
}





export default function IndexPage(){
    const [loading,setLoading] = useState(false);
    const [results,setResults] = useState([]);
    const [res,setRes] = useState({});
    const [showRes,setShowRes] = useState(false);

    const navigate = useNavigate();


    const goToLogin = ()=> navigate("/login")

    const inputRef = useRef(null);

    const getUser = useGetUser();


    // NOTE: The Timeout is to simulate an API request
    const handleSearch = async()=>{
        setLoading(true);
        const response = await getUser(extractValueFromInputRef(inputRef));
        if(!response){
            setRes({});
            setLoading(false)
            setShowRes(true)
            return;
        }
        const {password,...userData} = response;
        setRes(userData);
        console.log(userData);
        setLoading(false);
        setShowRes(true)
    }

    const loadingIndicator = (
        <LoadingOutlined
        style={{
        color:"green",
          fontSize:50,
        }}
        spin
      />
    );


    return(
        <>
            <div style={{
                display:"flex",
                width:"100vw",
                height:"100vh",
                flexDirection:"column"
            }}>
                {/* NAV-BAR */}
                <div style={{
                    height:"10vh",
                    backgroundColor:"greenyellow",
                    width:"100%",
                    padding:"1em",
                    display:"flex",
                    alignItems:"center",
                    justifyContent:"space-between"
                }}>

                    <div style={{
                        width:"28vw",
                        display:"flex",
                        justifyContent:"space-between",
                        alignItems:"center",
                    }}>
                        <Avatar shape="square" size={60}  src={<img src={Logo} alt="school logo"/>}/>
                        <div style={{alignSelf:"end"}}>
                            <Title level={4} style={{color:"white"}}>
                                SCHOOL OF POST-GRADUATES PORTAL
                            </Title>
                        </div>
                    </div>
                    <div>
                        <Button onClick={goToLogin} type="primary" size="large" style={{backgroundColor:"green",borderRadius:"1px"}}>
                            Login
                        </Button>
                    </div>
                </div>
                <div style={{
                            flex:1,
                            position:"relative",
                            display:"flex",
                            justifyContent:"center",
                            alignItems:"center",
                            height:"100%",
                            backgroundColor:"rgba(0,0,0,0.2)"
                        }}>
                            <img src={Background} alt="school of postgraduates" style={{
                                position:"absolute",
                                top:0,
                                left:0,
                                width:"100%",
                                height:"100%",
                                objectFit:"cover",
                                zIndex:1
                            }}/>
                            <div style={{height:"100%",
                                width:"100%",
                                textAlign:"center",
                                zIndex:3,
                                display:"flex",
                                // justifyContent:"center",
                                alignItems:"center",
                                backgroundColor:"rgba(0,0,0,0.2)",
                                flexDirection:"column"
                            }}>
                                <Marquee autoFill speed={40} pauseOnClick pauseOnHover delay={1}>
                                    <div style={{backgroundColor:"white",height:"8vh",padding:"1em",width:"100%"}}>
                                        <Title style={{color:"red",}} level={4}>ENTER YOUR DETAILS TO SEARCH FOR YOUR DETAILS, PROCEED TO CLEARANCE IF FOUND...</Title>
                                    </div>
                                </Marquee>
                                <div style={{
                                    marginTop:"10vh",
                                    width:"20%",
                                    textAlign:"center"
                                }}>
                                    <Input.Search onMouseEnter={()=>{setRes({});setShowRes(false)}} size="large" ref={inputRef} onSearch={handleSearch} allowClear placeholder="Enter your Reg. Number to Search..."/>
                                </div>
                                {
                                    showRes &&
                                <div style={{padding:"1em 0"}}>
                                    <Title level={3} style={{color:"blue"}}>{Object.keys(res).length > 0?"1":"No"} Results found!</Title>
                                </div>
                                }
                                    <Spin spinning={loading} indicator={loadingIndicator} style={{margin:"2em 0"}}>
                                        {
                                            Object.keys(res).length >0 && 
                                        <div style={{paddingLeft:"2em",borderRadius:"2px",minHeight:"45vh",width:"30vw",background:"white",marginTop:"2em",display:"flex",justifyContent:"center",alignItems:"center",paddingTop:"2em"}}>
                                            <Descriptions column={1} title="Student Information">
                                                <Descriptions.Item label="Full name">
                                                    {res?.fullname}
                                                </Descriptions.Item>
                                                <Descriptions.Item label="Registration Number">
                                                    {res?.registrationNumber}
                                                </Descriptions.Item>
                                                <Descriptions.Item label="Department">
                                                    {res?.department}
                                                </Descriptions.Item>
                                                <Descriptions.Item label="E-mail">
                                                    {res?.email}
                                                </Descriptions.Item>
                                                <Descriptions.Item label="Phone">
                                                    {res?.phone}
                                                </Descriptions.Item>
                                                <Descriptions.Item label="Current status">
                                                   <Tag color="green">{res?.Stage.label}</Tag>
                                                </Descriptions.Item>
                                                <Descriptions.Item label="Session">
                                                   <Tag color="green">{res?.Session.value}</Tag>
                                                </Descriptions.Item>
                                            </Descriptions>
                                        </div>
                                        }
                                    </Spin>
                            </div>
                </div>
            </div>
        </>
    )
}
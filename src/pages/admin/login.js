import { UserOutlined } from "@ant-design/icons";
import { Avatar,Input,Button,Form,Typography, message } from "antd";
import { useRef,useState } from "react";
import { ADMIN_USER } from "../../DB/users";
import { extractValueFromInputRef } from "../../utils/helpers";
import { useNavigate } from "react-router-dom";


const {Title} = Typography;







export default function AdminLogin(){
    const [loading,setLoading] = useState(false);
    const navigate = useNavigate();

    const idRef = useRef(null);
    const passRef = useRef(null);


    const handleLogin = ()=>{
        setLoading(true)
        const match = ADMIN_USER.find(u=>u.userId.toLowerCase() === extractValueFromInputRef(idRef).toLowerCase());
        if(!match || match === null || Object.keys(match) <1){
            setLoading(false);
            return message.error("Invalid User Id/ Password");
        }
        const isPassMatched = match.password.toLowerCase() == extractValueFromInputRef(passRef).toLowerCase();
        if(!isPassMatched){
            setLoading(false);
            return message.error("Invalid User Id/ Password");
        } 
        navigate("/admin")
        message.success("Login successful")
        setLoading(false)
    }


    return(
        <>
            <div style={{
                height:"100vh",
                width:"100vw",
                display:"flex",
                justifyContent:"center",
                alignItems:"center",
                backgroundColor:"darkblue"
            }}>
                <div style={{
                    height:"50vh",
                    width:"25vw",
                    justifyContent:"center",
                    alignItems:"center",
                    flexDirection:"column",
                    boxShadow:"-1px 4px 6px 0px rgba(0,0,0,0.75)",
                    padding:"1em",
                    backgroundColor:"white"
                }}>
                    <div style={{height:"40%",width:"100%",textAlign:"center"}}>
                        <Avatar size={80} icon={<UserOutlined/>}/>
                        <Title style={{marginTop:"1em"}} level={4}>ADMINISTRATOR LOGIN</Title>
                    </div>
                    <Form style={{flex:1,width:"100%"}}>
                        <Form.Item>
                            <Input ref={idRef} placeholder="Enter User ID"/>
                        </Form.Item>
                        <Form.Item>
                            <Input.Password ref={passRef} placeholder="Enter User ID"/>
                        </Form.Item>
                        <Form.Item>
                            <Button onClick={handleLogin} loading={loading} block type="primary" style={{backgroundColor:"green"}}>
                                LOGIN
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </>
    )
}
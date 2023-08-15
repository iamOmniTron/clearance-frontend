import { UserOutlined } from "@ant-design/icons";
import { Avatar,Input,Button,Form,Typography, message } from "antd";
import { useRef,useState } from "react";
import { AUTH_TOKEN_NAME } from "../../utils/defaults";
import { extractValueFromInputRef } from "../../utils/helpers";
import { useNavigate } from "react-router-dom";
import { useAdminLogin } from "../../hooks/auth";
import { userStore,getUserProfile } from "../../store/userStore";


const {Title} = Typography;







export default function AdminLogin(){
    const [loading,setLoading] = useState(false);
    const navigate = useNavigate();

    const [form] = Form.useForm();

    const idRef = useRef(null);
    const passRef = useRef(null);

    const loginAdmin = useAdminLogin();
    const setUser = userStore(state=>state.setUser);


  
    const handleLogin = async ()=>{
        try {       
            setLoading(true);
            const payload = {
                userId:extractValueFromInputRef(idRef),
                password:extractValueFromInputRef(passRef)
            }
            const responseToken = await loginAdmin(payload);
            if(!responseToken){
                setLoading(false);
                return;
            }
            sessionStorage.setItem(AUTH_TOKEN_NAME,responseToken);
            message.success("Admin Logged in successfully");
            form.resetFields();
            setTimeout(async()=>{
                const {password,...userData} = await getUserProfile();
                message.success("Redirecting to Dashboard...")
                setUser(userData);
                setLoading(false);
                return navigate("/admin")
            },2000)
        } catch (error) {
            setLoading(false);
        }
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
                    <Form form={form} style={{flex:1,width:"100%"}}>
                        <Form.Item>
                            <Input ref={idRef} placeholder="Enter User ID"/>
                        </Form.Item>
                        <Form.Item>
                            <Input.Password ref={passRef} placeholder="Enter Password"/>
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
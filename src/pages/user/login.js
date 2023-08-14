import {Avatar,Button,Checkbox,Form,Input,message,Typography} from "antd";
import Logo from "../../assets/logo.png"
import { useRef, useState } from "react";
import { AUTH_TOKEN_NAME } from "../../utils/defaults";
import { extractValueFromInputRef } from "../../utils/helpers";
import { useNavigate } from "react-router-dom";
import { userStore,getUserProfile } from "../../store/userStore";
import { useLogin } from "../../hooks/auth";

const {Title} = Typography;


export default function LoginUser(){
    const [loading,setLoading] = useState(false);

    const [form] = Form.useForm();

    const navigate = useNavigate();
    const setUser = userStore(state=>state.setUser);
    const loginUser = useLogin();


    const regnumRef = useRef(null);
    const passRef = useRef(null);


    const handleLogin = async()=>{
        setLoading(true);
        const payload = {
            registrationNumber:extractValueFromInputRef(regnumRef),
            password:extractValueFromInputRef(passRef)
        }
        const responseToken = await loginUser(payload);
        if(!responseToken){
            setLoading(false);
            return;
        }
        sessionStorage.setItem(AUTH_TOKEN_NAME,responseToken);
        message.success("User Logged in successfully");
        form.resetFields();
        setTimeout(async()=>{
            const {password,...userData} = await getUserProfile();
            message.success("Redirecting to Dashboard...")
            setUser(userData);
            setLoading(false);
            return navigate("/student")
        },2000)
    }

    return(
        <>
            <div style={{
                height:"100vh",
                width:"100vw",
                backgroundColor:"yellowgreen",
                display:"flex",
                justifyContent:"center",
                alignItems:"center"
            }}>
                <div style={{
                    background:"white",
                    height:"50vh",
                    width:"30vw",
                    display:"flex",
                    justifyContent:"center",
                    flexDirection:"column",
                    alignItems:"center",
                    boxShadow:"-1px 4px 6px 0px rgba(0,0,0,0.75)",
                    padding:"1em"
                }}>
                    <div style={{height:"35%",textAlign:"center"}}>
                        <Avatar size={60} src={<img src={Logo} alt="school logo"/>}/>
                        <Title level={4}>Student Login</Title>
                    </div>
                    <Form form={form} style={{flex:1,width:"100%"}}>
                        <Form.Item>
                            <Input ref={regnumRef} placeholder="Enter Reg. Number"/>
                        </Form.Item>
                        <Form.Item>
                            <Input.Password ref={passRef} placeholder="Enter password"/>
                        </Form.Item>
                        <Form.Item>
                            <Button loading={loading} onClick={handleLogin} type="primary" style={{backgroundColor:"green"}} block>
                                LOGIN
                            </Button>
                        </Form.Item>
                    </Form>
                    <div style={{display:"flex",justifyContent:"flex-start",width:"100%"}}>
                        <Checkbox>
                            Remember me?
                        </Checkbox>
                    </div>
                </div>
            </div>
        </>
    )
}
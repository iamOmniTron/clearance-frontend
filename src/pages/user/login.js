import {Avatar,Button,Checkbox,Form,Input,message} from "antd";
import Logo from "../../assets/logo.png"
import { useRef, useState } from "react";
import { USERS } from "../../DB/users";
import { extractValueFromInputRef } from "../../utils/helpers";
import { useNavigate } from "react-router-dom";


export default function LoginUser(){
    const [loading,setLoading] = useState(false);

    const navigate = useNavigate();


    const regnumRef = useRef(null);
    const passRef = useRef(null);


    const handleLogin = ()=>{
        setLoading(true);
        const match = USERS.find(u=>u.registrationNumber.toLowerCase() === extractValueFromInputRef(regnumRef).toLowerCase());
        if(!match){
            setLoading(false)
            return message.error("Invalid Reg. Number/ Password");
    }
        const isPassMatched = match.password.toLowerCase() == extractValueFromInputRef(passRef).toLowerCase();
        if(!isPassMatched){
            setLoading(false);
            return message.error("Invalid Reg. Number/ Password");
        } 
        navigate("/student")
        message.success("Login successful")
        setLoading(false)
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
                    height:"40vh",
                    width:"40vh",
                    display:"flex",
                    justifyContent:"center",
                    flexDirection:"column",
                    alignItems:"center",
                    boxShadow:"-1px 4px 6px 0px rgba(0,0,0,0.75)",
                    padding:"1em"
                }}>
                    <div style={{height:"30%"}}>
                        <Avatar size={60} src={<img src={Logo} alt="school logo"/>}/>
                    </div>
                    <Form style={{flex:1,width:"100%"}}>
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
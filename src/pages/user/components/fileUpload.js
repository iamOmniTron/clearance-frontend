import { UploadOutlined } from "@ant-design/icons";
import { Button,Form,Modal,Upload,message } from "antd";
import { useState } from "react";
import { useFileUpload } from "../../../hooks/uploads";





export function FileUpload({userStage}){
    const [isOpen,setIsOpen] = useState(false);


    const uploadFile = useFileUpload();


    const handleFileUpload = async ({file})=>{
        const formData = new FormData();
        formData.append("documentType",userStage.DocumentConfigId);
        formData.append("document",file);
        await uploadFile(formData);
        message.success("File uploaded successfully");
        setIsOpen(false);
    }



    return(
        <>
            <Button type="primary" style={{backgroundColor:"green"}} onClick={()=>setIsOpen(true)}>
                <UploadOutlined/>
                Proceed File  Upload
            </Button>
            <Modal footer={null} open={isOpen} onCancel={()=>setIsOpen(false)} title={`Upload ${userStage.DocumentConfig.name}`}>
                <Form>
                    <Upload customRequest={handleFileUpload}>
                        <Button style={{backgroundColor:"orange"}} type="primary" icon={<UploadOutlined/>}>Click to Upload {userStage.DocumentConfig.name}</Button>
                    </Upload>
                </Form>
            </Modal>
        </>
    )
}
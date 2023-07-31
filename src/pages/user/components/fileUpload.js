import { UploadOutlined } from "@ant-design/icons";
import { Button,Form,Modal,Upload } from "antd";
import { useState } from "react";





export function FileUpload({userStage}){
    const [isOpen,setIsOpen] = useState(false);

    return(
        <>
            <Button type="primary" style={{backgroundColor:"green"}} onClick={()=>setIsOpen(true)}>
                <UploadOutlined/>
                Proceed File  Upload
            </Button>
            <Modal footer={null} open={isOpen} onCancel={()=>setIsOpen(false)} title={`Upload ${userStage.documentType.name}`}>
                <Form>
                    <Upload>
                        <Button style={{backgroundColor:"orange"}} type="primary" icon={<UploadOutlined/>}>Click to Upload {userStage.documentType.name}</Button>
                    </Upload>
                </Form>
            </Modal>
        </>
    )
}
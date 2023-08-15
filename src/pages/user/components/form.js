import { Button, Modal,Form,Input, message } from "antd";
import { useState } from "react";
import { useUploadForm } from "../../../hooks/uploads";
import { useNavigate } from "react-router-dom";




export default function UserForm({userStage}){
    const [isOpen,setIsOpen] = useState(false);
    const [formLoading,setIsFormLoading] = useState(false);
    const navigate = useNavigate();
    const [form] = Form.useForm();

    const uploadForm = useUploadForm();

    const handleFormUpload = async ()=>{
        try {
            setIsFormLoading(true);
            const payload = {
                data:JSON.stringify(form.getFieldValue()),
                formType:userStage.FormConfigId
            };
            await uploadForm(payload);
            setIsFormLoading(false)
            message.success("Form Uploaded successfully");
            return navigate("/student");
        } catch (error) {
            setIsFormLoading(false)
        }
    }

    function createDynamicForm(){
        const formItems = [];
        
        JSON.parse(userStage.FormConfig?.fields).forEach((field,idx)=>{
            formItems.push(
                <Form.Item key={idx} name={field.name}>
                    <Input placeholder={field.placeholder}/>
                </Form.Item>
            )
        });

        return formItems;
    }

    return(
        <>
            <Button type="primary" style={{backgroundColor:"green"}} onClick={()=>setIsOpen(true)}>
                Proceed Form Upload
            </Button>
            <Modal footer={null} open={isOpen} onCancel={()=>setIsOpen(false)} title={`${userStage.FormConfig?.name}`}>
                <Form form={form}>
                    {createDynamicForm()}
                    <Form.Item wrapperCol={{
                                span:8,
                                offset:20
                              }}>
                        <Button loading={formLoading} type="primary" style={{backgroundColor:"green"}} onClick={handleFormUpload}>
                        Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}
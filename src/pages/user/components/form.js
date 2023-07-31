import { Button, Modal,Form,Input } from "antd";
import { useState } from "react";




export default function UserForm({userStage}){
    const [isOpen,setIsOpen] = useState(false);

    function createDynamicForm(){
        const formItems = [];
        
        userStage.formType.fields.forEach((field,idx)=>{
            formItems.push(
                <Form.Item key={idx} name={field.name}>
                    <Input placeholder={field.info}/>
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
            <Modal footer={null} open={isOpen} onCancel={()=>setIsOpen(false)} title={`${userStage.formType.name}`}>
                <Form>
                    {createDynamicForm()}
                    <Form.Item wrapperCol={{
                                span:8,
                                offset:20
                              }}>
                        <Button type="primary" style={{backgroundColor:"green"}}>
                        Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}
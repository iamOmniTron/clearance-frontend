import { Breadcrumb,Space,Button, Typography, Modal, Form ,Input} from "antd"
import { RxDashboard } from "react-icons/rx"
import {FaWpforms} from "react-icons/fa";
import { EyeOutlined, PlusOutlined,MinusCircleOutlined } from "@ant-design/icons";
import { FORMS } from "../../DB/forms";
import DataTable from "../../components/datatable";
import { useState } from "react";
import { BiTrash } from "react-icons/bi";



const {Title} = Typography


const FORM_COLUMNS = [
    {
        title:"S/N",
        key:"s/n",
        render:(_,__,idx)=>idx+1
    },
    {
        title:"Name",
        key:"name",
        dataIndex:"name"
    },
    {
        title:"Title",
        key:"title",
        dataIndex:"title"
    },
    {
        title:"Total Fields",
        key:"totalFiels",
        dataIndex:"fields",
        render:(fields)=>fields.length
    },
    {
        title:"Actions",
        key:"actions",
        render:(form)=><FormPreview indexedForm={form}/>
    }
]

// NOTE: To avoid conflict with Native HTML form element, indexedForm is used
function FormPreview({indexedForm}){
    const [isOpened,setIsOpened] = useState(false);


    function createDynamicForm(){
        const formItems = [];
        
        indexedForm.fields.forEach((field,idx)=>{
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
            <Space>
                <Button type="primary" style={{backgroundColor:"green"}} onClick={()=>setIsOpened(true)}>
                    <EyeOutlined style={{fontSize:20}}/>
                </Button>
                <Button type="primary" danger>
                    <BiTrash style={{fontSize:20}}/>
                </Button>
            </Space>
            <Modal open={isOpened} onCancel={()=>setIsOpened(false)} footer={null} title={`${indexedForm.name} Form Preview`}>
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



export default function FormsListPage(){
    const [isOpen,setIsOpen] = useState(false);
    return(
        <>
            <div style={{
                    display:"flex",
                    justifyContent:"space-between",
                    padding:"1em",
                    marginTop:"1em",
                    marginBottom:"1em",
                    boxShadow:"3px 8px 17px 0px rgba(0,0,0,0.75)"
                }}>

                <Breadcrumb>
                <Breadcrumb.Item>
                <RxDashboard style={{
                    fontSize:"1.5em"
                }}/>
                    Dashboard
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    <FaWpforms style={{
                    fontSize:"1.5em"
                }}/>
                    Forms
                </Breadcrumb.Item>
                </Breadcrumb>
                <div>
                    <Space>
                    <Button type="primary" onClick={()=>setIsOpen(true)}>
                        <PlusOutlined/>
                        New Form
                    </Button>
                    </Space>
                </div>
            </div>
            <div style={{
                height:"100%",
                witdh:"95%",
                marginTop:"2em"
            }}>
                <div style={{margin:"2em 0",display:"flex",justifyContent:"space-between"}}>
                    <Title level={3}>
                       ALL FORMS
                    </Title>
                </div>
                <DataTable data={FORMS} cols={FORM_COLUMNS}/>
            </div>
            <Modal open={isOpen} onCancel={()=>setIsOpen(false)} title="Create New Form" footer={null}>
                <Form>
                    <Form.Item>
                        <Input placeholder="Enter Form name"/>
                    </Form.Item>
                    <Form.Item>
                        <Input placeholder="Enter Form Title"/>
                    </Form.Item>
                    <span style={{fontWeight:"bold"}}>Fields:</span>
                    <Form.List name="form-fields">
                        {(fields, { add, remove }) => (
                                <>
                                {fields.map(({ key, name, ...restField }) => (
                                    <Space
                                    key={key}
                                    style={{
                                        display: 'flex',
                                        marginBottom: 8,
                                    }}
                                    align="baseline"
                                    >
                                    <Form.Item
                                        {...restField}
                                        name={[name, 'name']}
                                        rules={[
                                        {
                                            required: true,
                                            message: 'Missing Name for field',
                                        },
                                        ]}
                                    >
                                        <Input placeholder="Enter Name for field" />
                                    </Form.Item>
                                    <Form.Item
                                        {...restField}
                                        name={[name, 'placeholder']}
                                        rules={[
                                        {
                                            required: true,
                                            message: 'Missing Placeholder for field',
                                        },
                                        ]}
                                    >
                                        <Input placeholder="Enter Placeholder for field" />
                                    </Form.Item>
                                    <MinusCircleOutlined onClick={() => remove(name)} />
                                    <Button type="primary" style={{backgroundColor:"green"}}>
                                        Add Item
                                    </Button>
                                    </Space>
                                ))}
                                 <Form.Item>
                            <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                            Add field
                            </Button>
                        </Form.Item>
                        </>
                    )}
                    </Form.List>
                    <Form.Item wrapperCol={{
                                span:8,
                                offset:20
                              }}>
                        <Button type="primary">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}
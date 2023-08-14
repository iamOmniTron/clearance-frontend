import { Breadcrumb,Space,Button, Typography, Modal, Form ,Input, Spin, message,Table} from "antd"
import { RxDashboard } from "react-icons/rx"
import {FaWpforms} from "react-icons/fa";
import { EyeOutlined, PlusOutlined,MinusCircleOutlined } from "@ant-design/icons";
import DataTable from "../../components/datatable";
import { useContext, useRef, useState } from "react";
import { BiTrash } from "react-icons/bi";
import RefreshContext from "../../context/refreshContext";
import { useCreateFormConfig, useDeleteFormConfig, useFormConfig } from "../../hooks/configQuery";
import { extractValueFromInputRef } from "../../utils/helpers";



const {Title} = Typography;


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
        render:(fields)=>JSON.parse(fields).length
    },
    {
        title:"Actions",
        key:"actions",
        render:(form)=><FormPreview indexedForm={form}/>
    }
]

const FORM_FIELDS_COLUMNS = [
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
        title:"Placeholder",
        key:"placeholder",
        dataIndex:"placeholder"
    }
]

// NOTE: To avoid conflict with Native HTML form element, indexedForm is used
function FormPreview({indexedForm}){
    const [isOpened,setIsOpened] = useState(false);
    const fields = JSON.parse(indexedForm.fields)

    const {flag,setFlag} = useContext(RefreshContext);

    const deleteForm = useDeleteFormConfig();

    const deleteFormConfig = async ()=>{
        await deleteForm(indexedForm.id);
        message.success("Form deleted successfully");
        setFlag(!flag)
    }


    function createDynamicForm(){
        const formItems = [];
        
        fields.forEach((field,idx)=>{
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
            <Space>
                <Button type="primary" style={{backgroundColor:"green"}} onClick={()=>setIsOpened(true)}>
                    <EyeOutlined style={{fontSize:20}}/>
                </Button>
                <Button type="primary" danger onClick={deleteFormConfig}>
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
    const {flag,setFlag} = useContext(RefreshContext);
    const [curr,setCurr] = useState({});
    const [fields,setFields]= useState([]);

    const {loading,formConfigs} = useFormConfig(flag);
    const createFormConfig = useCreateFormConfig();

    const [form] = Form.useForm();

    const nameRef = useRef(null);
    const titleRef = useRef(null);
    function addField(cb1,cb2){
        setFields(f=>[...f,{...curr}]);
        setCurr({});
        cb1();
        cb2();
    }


    const handleSubmit = async ()=>{
        const payload = {
            name:extractValueFromInputRef(nameRef),
            title:extractValueFromInputRef(titleRef),
            fields:JSON.stringify(fields)
        }
        await createFormConfig(payload);
        message.success("Form Config created successfully");
        form.resetFields();
        setIsOpen(false);
        setFlag(!flag);
    }

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
                <Spin spinning={loading}>
                    <DataTable data={formConfigs} cols={FORM_COLUMNS}/>
                </Spin>
            </div>
            <Modal open={isOpen} onCancel={()=>setIsOpen(false)} title="Create New Form" footer={null}>
                <Form form={form}>
                    <Form.Item>
                        <Input ref={nameRef} placeholder="Enter Form name"/>
                    </Form.Item>
                    <Form.Item>
                        <Input ref={titleRef} placeholder="Enter Form Title"/>
                    </Form.Item>
                    {
                        fields.length > 0 &&       
                    <Form.Item>
                        <span>Form</span>
                        <Table pagination={{pageSize: 20,hideOnSinglePage:true}} rowKey={(r)=>r.name} dataSource={fields} columns={FORM_FIELDS_COLUMNS}/>
                    </Form.Item>
                    }
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
                                        <Input placeholder="Enter Name for field" onChange={(e)=>setCurr((c)=>({...c,name:e.target.value}))} />
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
                                        <Input placeholder="Enter Placeholder for field" onChange={(e)=>setCurr((c)=>({...c,placeholder:e.target.value}))}/>
                                    </Form.Item>
                                    <MinusCircleOutlined onClick={() => remove(name)} />
                                    <Button type="primary" style={{backgroundColor:"green"}} onClick={()=>addField(()=>add(),()=>remove(name))}>
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
                    <div style={{fontWeight:"bold"}}>
                        Fields Count: {fields.length}
                    </div>
                    <Form.Item wrapperCol={{
                                span:8,
                                offset:20
                              }}>
                        <Button type="primary" onClick={handleSubmit}>
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}
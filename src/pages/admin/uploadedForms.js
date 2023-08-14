import { Button,Breadcrumb,Modal,Space,message, Tag,Typography,Spin, Descriptions } from "antd"
import { RxDashboard } from "react-icons/rx";
import { EyeOutlined } from "@ant-design/icons";
import {BiSolidHourglass, BiSync, BiTrash} from "react-icons/bi"
import { useContext,useState } from "react";
import DataTable from "../../components/datatable";
import RefreshContext from "../../context/refreshContext";
import { useDeleteForm, useForms } from "../../hooks/uploads";

const {Title} = Typography;


const FORMS_COLUMNS = [
    {
        title:"S/N",
        key:"s/n",
        render:(_,__,idx)=>idx+1
    },
    {
        title:"Student",
        key:"student",
        dataIndex:"User",
        render:(u)=>u.fullname
    },
    {
        title:"Stage",
        key:"stage",
        dataIndex:"User",
        render:(user)=>user.Stage.name
    },
    {
        title:"Form Name",
        key:"form",
        dataIndex:"FormConfig",
        render:(f)=>f.name
    },
    {
        key:"actions",
        title:"Actions",
        render:(_,form)=><FormsActions form={form}/>
    }
]


function FormsActions({form}){
    const [isOpen,setIsOpen] = useState(false);

    const {flag,setFlag} = useContext(RefreshContext);

    const formDataArray = Object.entries(JSON.parse(form.data));

    const deleteForm = useDeleteForm();

    const handleDeleteForm = async ()=>{
        await deleteForm(form.id);
        message.success("Form Deleted Successfully");
        setFlag(!flag);
    }



    return(
        <>
             <Space>
                <Button type="primary" onClick={()=>setIsOpen(true)}>
                    <EyeOutlined style={{
                        fontSize:20
                    }}/>
                </Button>
                <Button type="primary" danger onClick={handleDeleteForm}>
                    <BiTrash style={{
                        fontSize:20
                    }}/>
                </Button>
            </Space>
            <Modal open={isOpen} title={"User Form Preview"} footer={null} onCancel={()=>setIsOpen(false)}>
                <div>
                    <Descriptions column={1}>
                        <Descriptions.Item label="User Name">
                            {form.User.fullname}
                        </Descriptions.Item>
                        <Descriptions.Item label="User Current Stage">
                            {form.User.Stage.name}
                        </Descriptions.Item>
                        <span style={{fontWeight:"bold"}}>Form Details</span>
                        {
                            formDataArray.map((f,idx)=>(
                                <Descriptions.Item key={idx} label={f[0]}>
                                    {f[1]}
                                </Descriptions.Item>
                            ))
                        }
                    </Descriptions>
                    <div style={{textAlign:"end"}}>    
                    <Button icon={<BiSync style={{fontSize:20}}/>} type="primary" style={{backgroundColor:"green",borderRadius:0,height:"3em"}}>
                        Advance User Stage
                    </Button>
                    </div>
                </div>
            </Modal>
        </>
    )
}





export default function UploadedFormsPage(){
    

    const {flag} = useContext(RefreshContext);



    const {loading,forms} = useForms(flag);


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
               <BiSolidHourglass style={{
               fontSize:"1.5em"
           }}/>
               Uploaded Forms
           </Breadcrumb.Item>
           </Breadcrumb>
       </div>
       <div style={{
                height:"100%",
                witdh:"95%",
                marginTop:"2em"
            }}>
                <div style={{margin:"2em 0",display:"flex",justifyContent:"space-between"}}>
                    <Title level={3}>
                       ALL UPLOADED FORMS
                    </Title>
                </div>
                <Spin spinning={loading}>
                    <DataTable data={forms} cols={FORMS_COLUMNS}/>
                </Spin>
            </div>
        </>
    )
}
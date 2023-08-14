import { Button,Breadcrumb,Modal,Form,Input,Space,message, Tag,Typography, Select, Checkbox, Radio, Spin, Descriptions } from "antd"
import { RxDashboard } from "react-icons/rx";
import { EyeOutlined, PlusOutlined } from "@ant-design/icons";
import {BiSolidHourglass, BiSync, BiTrash} from "react-icons/bi"
import { useContext, useRef, useState } from "react";
import DataTable from "../../components/datatable";
import RefreshContext from "../../context/refreshContext";
import { extractValueFromInputRef } from "../../utils/helpers";
import { useDeleteFile, useDeleteForm, useDocuments, useForms } from "../../hooks/uploads";
import { SERVER_URL } from "../../utils/defaults";

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
        title:"Document Name",
        key:"document",
        dataIndex:"DocumentConfig",
        render:(u)=>u.name
    },
    {
        title:"Stage",
        key:"stage",
        dataIndex:"User",
        render:(user)=>user.Stage.name
    },
    {
        key:"actions",
        title:"Actions",
        render:(_,document)=><DocumentsAction document={document}/>
    }
]



function DocumentsAction({document}){
    const {flag,setFlag} = useContext(RefreshContext);

    const deleteDocument = useDeleteFile();

    // TODO:move user stage

    const handleDeleteDocument = async ()=>{
        await deleteDocument(document.id);
        message.success("Document deleted successfully");
        setFlag(!flag);
    }

    const handlePreviewDocument =()=> window.open(`${SERVER_URL.replace("/api","")}/${document.documentUrl}`,"_blank");

    return(
        <>
            <Space>
                <Button type="primary" onClick={handlePreviewDocument}>
                    <EyeOutlined style={{
                        fontSize:20
                    }}/>
                </Button>
                <Button type="primary" danger onClick={handleDeleteDocument}>
                    <BiTrash style={{
                        fontSize:20
                    }}/>
                </Button>
            </Space>
        </>
    )
}



export default function UploadedDocumentsPage(){
    const {flag} = useContext(RefreshContext);

    const {loading,documents} = useDocuments(flag);


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
               Uploaded Documents
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
                       ALL UPLOADED DOCUMENTS
                    </Title>
                </div>
                <Spin spinning={loading}>
                    <DataTable data={documents}  cols={FORMS_COLUMNS}/>
                </Spin>
            </div>
        </>
    )
}

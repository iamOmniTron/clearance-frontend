import { FORMS } from "./forms"
import { DOCUMENTS } from "./documentTypes"



export const STAGES = [
    {
        id:1,
        name:"Admission",
        isIndex:true,
        prerequisiteStage:null,
        label:"ADMISSION",
        isForm:true,
        isUpload:false,
        formType:FORMS[0],
        documentType:DOCUMENTS[0]
    },
    {
        id:2,
        name:"Processing Clearance",
        isIndex:false,
        prerequisiteStage:1,
        label:"CLEARANCE",
        isForm:false,
        isUpload:true,
        formType:null,
        documentType:DOCUMENTS[2]
    },
    {
        id:3,
        name:"Cleared",
        isIndex:false,
        prerequisiteStage:2,
        label:"CLEARED",
        isForm:false,
        isUpload:true,
        formType:null,
        documentType:DOCUMENTS[3]
    },
    {
        id:4,
        name:"Awaiting Proposal",
        isIndex:false,
        prerequisiteStage:3,
        label:"AWAITING PROPOSAL",
        isForm:false,
        isUpload:true,
        formType:null,
        documentType:DOCUMENTS[1]
    },
    {
        id:5,
        name:"Done",
        isIndex:false,
        prerequisiteStage:4,
        label:"DONE",
        isForm:false,
        isUpload:false,
        formType:null,
        documentType:null
    },
]
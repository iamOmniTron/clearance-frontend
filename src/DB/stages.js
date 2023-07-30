import { FORMS } from "./forms"



export const STAGES = [
    {
        id:1,
        name:"Admission",
        isIndex:true,
        prerequisiteStage:null,
        label:"ADMISSION",
        isForm:true,
        isUpload:false,
        formType:FORMS[0]
    },
    {
        id:2,
        name:"Processing Clearance",
        isIndex:false,
        prerequisiteStage:1,
        label:"CLEARANCE",
        isForm:false,
        isUpload:true,
        formType:null
    },
    {
        id:3,
        name:"cleared",
        isIndex:false,
        prerequisiteStage:2,
        label:"CLEARED",
        isForm:false,
        isUpload:true,
        formType:null
    },
    {
        id:4,
        name:"Awaiting Proposal",
        isIndex:false,
        prerequisiteStage:3,
        label:"AWAITING PROPOSAL",
        isForm:false,
        isUpload:true,
        formType:null
    },
    {
        id:5,
        name:"done",
        isIndex:false,
        prerequisiteStage:4,
        label:"DONE",
        isForm:false,
        isUpload:false,
        formType:null
    },
]
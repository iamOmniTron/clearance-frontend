import { Breadcrumb,Tag,Descriptions } from "antd"
import { BiSync } from "react-icons/bi"
import { RxDashboard } from "react-icons/rx"
import { STAGES } from "../../../DB/stages";
import { userStore } from "../../../store/userStore";
import { FileUpload } from "./fileUpload";
import UserForm from "./form";





export default function Facility(){

    const currentUser = userStore(state=>state.user);
    const userStage = currentUser.status;

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
                    <BiSync style={{
                    fontSize:"1.5em"
                }}/>
                    Facility
                </Breadcrumb.Item>
                </Breadcrumb>
            </div>
            <div style={{
                height:"100%",
                width:"95%",
                marginTop:"2em"
            }}>
                <Descriptions style={{marginTop:"3em"}} column={1}>
                    <Descriptions.Item label="Previous Stage">
                        {STAGES[userStage.id == 1 ? 0 : (userStage.id-2)].label}
                    </Descriptions.Item>
                    <Descriptions.Item label="Current Stage/Process">
                        {userStage.name}
                    </Descriptions.Item>
                    <Descriptions.Item contentStyletyle={{marginRight:"3em"}} label="Action Required">
                    {
                        userStage.isUpload? (
                            <>
                                <FileUpload userStage={userStage}/>
                            </>
                        ):userStage.isForm ? (
                            <>
                                <UserForm userStage={userStage}/>
                            </>
                        ): <Tag color={"yellow"}>None</Tag>
                    }
                    </Descriptions.Item>
                </Descriptions>
            </div>
        </>
    )
}
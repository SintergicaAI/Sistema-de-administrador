import {useGroupContext} from "../presentation/context/Group/useGroupContext.ts";
import {useParams} from "react-router";
import {ChangeEvent, useEffect, useState} from "react";
import {AvatarUserInfo} from "../presentation/components/Groups/GroupsTypes.ts";
import {CompanyApi} from "../infrastructure/api/CompanyApi.ts";
import {GroupApi} from "../infrastructure/api/GroupApi.ts";
import {GetAllUserCompanyData} from "../application/use-cases/GetAllUserCompanyData.ts";
import {AddUserToGroup} from "../application/use-cases/AddUserToGroup.ts";
import {DeleteUserFromGroup} from "../application/use-cases/DeleteUserFromGroup.ts";
import {filteringData} from "../presentation/utilities/filteringData.ts";

const companyApi = new CompanyApi();
const groupApi = new GroupApi();
const geAllUserCompany = new GetAllUserCompanyData(companyApi);
const addUserApi = new AddUserToGroup(groupApi);
const deleteUserApi = new DeleteUserFromGroup(groupApi);

let inmutableData:AvatarUserInfo[] = [];

export const useCheckBoxesMiembros = (filterValue:string) => {
    const {setMembersGroup,membersGroup, setAlertConfiguration, setShowAlert} = useGroupContext();
    const {groupId} = useParams();
    const [checkedValues, setCheckedValues] = useState<string[]>(membersGroup.map(member => member.email));
    const [loading, setLoading] = useState(true);
    const [listUsersFromCompany, setListUsersFromCompany] = useState<AvatarUserInfo[]>([]);


    const handleCheckBoxGroup = (value:ChangeEvent<HTMLInputElement>) =>{
        const {target} = value;
        const emailFromUser = target.value;
        const id = groupId ?? "";
        //setLoading(true);
        if(target.checked){
            checkedUser(emailFromUser);
            //addUserToGroup(id,emailFromUser);

        }else{
            uncheckUser(emailFromUser);
            //deleteUserFromGroup(id,emailFromUser);
        }
        //setLoading(false);
        //setShowAlert(true);
    }

    const uncheckUser = (uncheckedValue:string)=>{
        setMembersGroup([...membersGroup.filter(member => member.email !== uncheckedValue)]);
        setCheckedValues([...checkedValues.filter(value => value !== uncheckedValue)]);
    }

    const checkedUser = (checkedUser:string)=>{
        setMembersGroup([...membersGroup,(inmutableData.find(item => item.email === checkedUser) as AvatarUserInfo)]);
        setCheckedValues([...checkedValues,checkedUser]);
    }

    const addUserToGroup = (id:string, emailFromUser:string):void => {
        addUsers(id,emailFromUser).then(()=>{
            setAlertConfiguration({type:'success',message:"Usuario agregado"})
        }).catch(()=>{
            uncheckUser(emailFromUser);
        }).finally(()=>{
            setLoading(false);
            setShowAlert(true);
        });
    }
    const deleteUserFromGroup = (id:string, email:string)=>{
        deleteUser(id,email).then(()=>{
            setAlertConfiguration({type:'success',message:"Usuario elimando"})
        }).catch(()=>{
            checkedUser(email);
        }).finally(()=>{
            setLoading(false);
            setShowAlert(true);
        });
    }

    const addUsers =  async (groupId:string,email:string)=>{
        const res =  await addUserApi.execute(groupId,email);
        if("error" in res){
            setAlertConfiguration({type:'error',message:res.error})
            throw new Error(res.error);
        }
        return res;
    }

    const deleteUser = async (id:string, email:string)=>{
        const res = await deleteUserApi.execute(id,email);
        if("error" in res){
            setAlertConfiguration({type:'error',message:res.error})
            throw new Error(res.error);
        }
        return res;
    }

    const getUsers = async ()=>{
        await geAllUserCompany.execute({})
            .then((res) =>{
                const {users} = res;
                inmutableData = users.map(user =>{
                    return{
                        email: user.email,
                        firstName: user.firstName as string,
                        lastName: user.lastName as string,
                        role:user.role,
                        filterValue: `${user.firstName} ${user.lastName}`
                    }
                })
                setListUsersFromCompany(inmutableData);
            })
    }

    useEffect(() => {
        getUsers()
            .catch(()=>{
                inmutableData = [];
            })
            .finally(()=>{
                setLoading(false);
            })
    }, []);

    useEffect(() => {
        const filter = filteringData<AvatarUserInfo>(filterValue,listUsersFromCompany,inmutableData);
        setListUsersFromCompany(filter);
    }, [filterValue]);

    return {
        handleCheckBoxGroup,
        listUsersFromCompany,
        loading,
        checkedValues,
    }
}
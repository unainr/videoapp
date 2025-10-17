import { createAvatar } from "@dicebear/core";
import { botttsNeutral,initials } from "@dicebear/collection";


interface Props{
    seed:string;
    varient:'botttsNeutral'|'initials'
}

export const generateAvatarUri = ({seed,varient}:Props)=>{
let avatar;
if(varient==='botttsNeutral'){
    avatar = createAvatar(botttsNeutral,{seed});

}else{
    avatar= createAvatar(initials,{seed,fontWeight:500,fontSize:42});
}
return avatar.toDataUri();
}
import Worker from "../_models/worker.js"

export const ProcessOrder = async(fromId,skillset,location)=>{
    try{
        const allWorkers = await Worker.find({ bossID: fromId });
        const allWorkersSkillset = allWorkers.map((obj,i)=>{return obj.skillset})
        
        console.log(allWorkersSkillset);
        return fromId;
    }catch(err){
        console.log('Error from orderProcessor.js')
    }
}
const checkSkills = (array1,array2)=>{
    let counter = 0;
    for (let i=0;i<array1.length;i++){
        for (let j=0;j<array2.length;j++){
            if (array1[i]===array2[j]){
                counter++;
                break
            }
        }
    }
    return counter
}
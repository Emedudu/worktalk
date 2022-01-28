import Worker from "../_models/worker.js"

export const ProcessOrder = async(fromId,skillset,location)=>{
    try{
        const allWorkers = await Worker.find({ bossID: fromId });
        console.log(skillset);
        return fromId;
    }catch(err){
        console.log('Error from orderProcessor.js')
    }
}
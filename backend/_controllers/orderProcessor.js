import Worker from "../_models/worker.js"

export const ProcessOrder = async(fromId,skillset,location)=>{
    try{
        const allWorkers = await Worker.findById(fromId);
        return allWorkers.skillset
    }catch(err){
        console.log('Error from orderProcessor.js')
    }
}
import Worker from "../_models/worker.js"

export const ProcessOrder = async(fromId,skillset,location)=>{
    try{
        const allWorkers = await Worker.find({ bossID: fromId });
        const allWorkersSkills = allWorkers.map((obj,i)=>{return checkSkills(skillset,obj.skillset)})
        let listOfId = []
        for(let i = 0;i<allWorkersSkills.length;i++){
            if (allWorkersSkills[i] ===greatest(allWorkersSkills)){
                listOfId.push(allWorkers[i])
            }
        }
        if (listOfId.length === 1){
            return listOfId[0]._id
        }
        let distances = listOfId.map((obj,i)=>{return getDistance(location,obj.location.toString())})
        // allWorkers.location
        for(let i = 0;i<distances.length;i++){
            if (distances[i] ===smallest(distances)){
                return listOfId[i]._id
            }
        }       
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
const greatest = (list)=>{
    let greatest = list[0];
    for (let i = 0;i<list.length;i++){
        if (list[i]>greatest){
            greatest = list[i]
        }
    }
    return greatest
}
const smallest = (list)=>{
    let smallest = list[0];
    for (let i = 0;i<list.length;i++){
        if (list[i]<smallest){
            smallest = list[i]
        }
    }
    return smallest
}
const getDistance = (point1,point2)=>{
    const lent1 = point1.length;
    const array1 = point1.substring(1,lent1-1).split(',');
    const lent2 = point2.length;
    const array2 = point2.substring(1,lent2-1).split(',');
    let dist = (((Number(array1[0])-Number(array2[0]))**2)+((Number(array1[1])-Number(array2[1]))**2))**0.5
    return dist;
}
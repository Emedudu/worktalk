export const htmlJoin=(organizationName,organizationId)=>{
    return(
        // will probably change button to link
        // button should lead to acceptInvite route with some metadata like organizationId passed
        `
        <h1>${organizationName} invited you to join their organization click the button below to accept the invitation</h1>
        <a href="frontend acceptInvites route">Click Here</a>
        `
    )
}
export const htmlQuit=()=>{
    return(
        `
        <h1>Someone wants to quit your organization click the button below</h1>
        <a href="frontend acceptInvites route">Click Here</a>
        `
    )
}
module.exports = {
    async showProjectInfo (projectIdx){
        const query = `SELECT * FROM Project WHERE Project.id = ${projectIdx}`;
        return query;
    } 
}

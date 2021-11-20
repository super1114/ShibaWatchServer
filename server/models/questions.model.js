const sql = require("./db.js");
function getCurTime() {
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;
    return dateTime;
}
module.exports.submitQuestion = (info, filename, callback) => {
    let dateTime = getCurTime();
    var query = "INSERT INTO requests (user_id, question, loom, attached_file, categories, visibility, created_at) VALUES ('"+info.user_id+"', '"+info.question+"', '"+info.loom+"','"+filename+"', '"+info.category+"', '"+info.public+"', '"+dateTime+"')";
    sql.query(query, function (err, result) {
        callback(err, result);
    });
}

module.exports.getReplies =  async (question_id) => {
    let query = "select * from responses join users on users.id=responses.user_id where question_id="+question_id;
    return new Promise((resolve, reject)=>{
        sql.query(query,  (error, elements)=>{
            if(error){
                return reject(error);
            }
            return resolve(elements);
        });
    });
}

module.exports.fetchResponse = async () => {
    return new Promise((resolve, reject)=>{
        sql.query('select *, requests.id as id, requests.created_at as created_at from requests join users on users.id=requests.user_id ORDER BY requests.id desc',  (error, elements)=>{
            if(error){
                return reject(error);
            }
            
            return resolve(elements);
        });
    });
}

module.exports.downloadFile = (id, callback) => {
    let query = "select attached_file from requests where id="+id;
    sql.query(query, function (err, result) {
        callback(err, result);
    });
}

module.exports.submitResponse = (info, callback) => {
    let query = "INSERT INTO responses (user_id, response, question_id, rate) VALUES ('"+info.user_id+"', '"+info.response+"', '"+info.question_id+"', 0)";
    sql.query(query, function (err, result) {
        callback(err, result);
    });
}
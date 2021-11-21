const sql = require("./db.js");
// function getCurTime() {
//     var today = new Date();
//     var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
//     var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
//     var dateTime = date+' '+time;
//     return dateTime;
// }
module.exports.createCoin = (info, filename, callback) => {
    var query = "INSERT INTO coins (name, symbol, image, chain, presale, contract, description, audit_link, kyc_link, doxxed_link, chart, exchange, website, launch_date, telegram, twitter, additional_link) VALUES ('"+info.name+"', '"+info.symbol+"', '"+filename+"', '"+info.chain+"', '"+info.presale_link+"', '"+info.contract+"', '"+info.description+"', '"+info.audit_link+"', '"+info.kyc_link+"', '"+info.dox_link+"','"+info.chart+"', '"+info.exchange+"', '"+info.website+"', '"+info.launch_date+"', '"+info.telegram+"', '"+info.twitter+"', '"+info.additional_link+"')";

    sql.query(query, function (err, result) {
        callback(err, result);
    });
}

module.exports.list =  async (info, callback) => {
    console.log(info.key);
    let query = "select * from coins";
    sql.query(query, function (err, result) {
        callback(err, result);
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
let express = require('express');
let router = express.Router();
let svgCaptcha = require('svg-captcha');
let conn = require('./../data/conn')
const axios = require('axios');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/login', function(req, res, next) {
  res.send("gram-lu的服务器")
});

router.get('/captcha', function (req, res) {
  let captcha = svgCaptcha.create({size: 5,noise: 2,color: true,background: '#cc9966'} );
  res.type("svg");
  res.send(captcha.data)
  req.session.captcha = captcha.text;
});

// router.get('/mysql', function(req, res, next) {
//   console.log('进入到mysql中')
//   conn.query('select * from manage_user', function (error, results, fields) {
//     if (error) throw error;
//     res.send(results)
//   });
// });

// router.get('/test',()=>{
//   let type = 'GET';
//   let promise;
//   let url = 'http://localhost:3000/test';
//   let paramStr = '';
//   let anObj = { 100: 'a', 2: 'b', 7: 'c' };
//   console.log(Object.keys(anObj));
//   if(type === 'GET') {
//     Object.keys(anObj).forEach(key => {
//       paramStr = paramStr + key + '=' + anObj[key] + '&'
//     });
//     console.log(paramStr)
//     console.log(paramStr.lastIndexOf('&'))
//     // 过滤最后的&
//     if (paramStr !== '') {
//       paramStr = paramStr.substr(0, paramStr.lastIndexOf('&'))
//     }
//     //完整路径
//     url += '?' + paramStr;
//     console.log(url);
//     console.log(axios)
//     promise = axios.get(url);
//   }else if(type ==='POST'){
//     promise = axios.post(url,anObj)
//   }
//   console.log(promise)
//   promise.then((response)=>{
//     resolve(response.data)
//   }).catch(error=>{
//     reject(error)
//   })
// })

router.get('/writeReport', function(req, res, next) {
  conn.query('select * from writereport', function (error, results, fields) {
    if (error) throw error;
    res.send(results)
  });
});
module.exports = router;

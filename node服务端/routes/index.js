let express = require('express');
let router = express.Router();
let svgCaptcha = require('svg-captcha');
let conn = require('./../data/conn')
const jwt = require('jsonwebtoken')
let sqlMap = require('./../sqlMap')
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

let data = [];
router.get('/writeReport', function(req, res, next) {
  conn.query('select * from writereport', function (error, results, fields) {
    data = results;
    console.log('查询周报的result'+results)
    let dataString = JSON.stringify(results);
    let formData = JSON.parse(dataString);
    console.log(formData)
    console.log('打印出formdata'+formData)
    // console.log(formData);
    if (error) throw error;
    res.send({formData,message:200})
  });
});


// 新增周报系统操作
router.post('/addWriteReport',function (req, res, next) {
  console.log(req.body);
  console.log(req.body.formDatas.name);
  let Id = req.body.formDatas.Id
  console.log("查询有没有Id传入"+Id)
  let name = req.body.formDatas.name
  let groupId= req.body.formDatas.groupId;
  let englishName= req.body.formDatas.englishName;
  let week = req.body.formDatas.week;
  let date = req.body.formDatas.date;
  let workContent = req.body.formDatas.workContent;
  let rateOfProgress = req.body.formDatas.rateOfProgress;
  let problemsAndSolution = req.body.formDatas.problemsAndSolution;
  let nextWeekPlan = req.body.formDatas.nextWeekPlan;
  let weekConclusion = req.body.formDatas.weekConclusion;
  addReportSqlParams = [date,week,name,englishName,groupId,workContent,rateOfProgress,problemsAndSolution,weekConclusion,nextWeekPlan];
  addReportSql = 'INSERT INTO writereport(date,week,name,englishName,groupId,workContent,rateOfProgress,problemsAndSolution,weekConclusion,nextWeekPlan) VALUES(?,?,?,?,?,?,?,?,?,?)';
  conn.query(addReportSql,addReportSqlParams,function (err, result) {
    if(err){
      console.log('[INSERT ERROR] - ',err.message);
      return;
    }else{
      console.log('添加周报的result'+result)
      console.log('成功插入数据')
      data = data.concat((req.body.formDatas))
      let dataString = JSON.stringify(data);
      let formData = JSON.parse(dataString);
      res.send(formData)
    }
  });
})


// 修改周报系统操作
router.post('/editWriteReport',function (req, res, next) {
  console.log(req.body);
  console.log(req.body.formDatas.name);
  let name = req.body.formDatas.name
  let groupId= req.body.formDatas.groupId;
  let englishName= req.body.formDatas.englishName;
  let week = req.body.formDatas.week;
  let date = req.body.formDatas.date;
  let workContent = req.body.formDatas.workContent;
  let rateOfProgress = req.body.formDatas.rateOfProgress;
  let problemsAndSolution = req.body.formDatas.problemsAndSolution;
  let nextWeekPlan = req.body.formDatas.nextWeekPlan;
  let weekConclusion = req.body.formDatas.weekConclusion;
  console.log(weekConclusion)
  let Id = req.body.formDatas.Id;
  console.log(Id)
  let editReportSqlParams = [date,week,name,englishName,groupId,workContent,rateOfProgress,problemsAndSolution,weekConclusion,nextWeekPlan,Id];
  let editReportSql = 'UPDATE writereport SET date=?,week=?,name=?,englishName=?,groupId=?,workContent=?,rateOfProgress=?,problemsAndSolution=?,weekConclusion=?,nextWeekPlan=? WHERE Id=?';
  conn.query(editReportSql,editReportSqlParams,function (err, result) {
    console.log("进入编辑")
    if(err){
      console.log('[INSERT ERROR] - ',err.message);
      return;
    }else{
      console.log('成功修改数据'+result.length)
    }
  });
})
//删除周报操作
router.get('/removeWriteReport', function(req, res, next) {
  console.log("进入到remove")
  console.log('打印出对应的Id'+req.query.Id)
  console.log(req)
  let Id = req.query.Id;
  console.log(Id)
  conn.query('DELETE FROM writereport WHERE Id=?',Id ,function (error, results, fields) {
    console.log(Id)
    if(error){
      console.log('服务器出现错误')
    }else{
      console.log('删除成功')
      console.log(data)
      for(let i = 0;i<data.length;i++){
        if(data[i].Id == Id){
          console.log("开始删除")
          data.splice(i,1);
          console.log(data)
          let dataString = JSON.stringify(data);
          let formData = JSON.parse(dataString);
          res.send(formData)
        }
      }
      // console.log(data.slice())
      // res.send({Id,message:200})
    }
  });
})


//博客
//写博客
//发布
router.post('/casualNote', function(req, res, next) {
  console.log(req.body)
      conn.query(sqlMap.article.insert,[req.body.username,req.body.title, req.body.content], (err, result) => {
        console.log(err)
        if (err !== null) {
          res.json({
            status: false,
            msg: '添加失败',
          });
        } else {
          res.json({
            status: 200,
            msg: '添加成功',
          });
        }
      })
}),
//存为草稿
  router.post('/saveDraftCasual', function(req, res, next) {
    console.log(req.body)
    conn.query(sqlMap.article.insertdraft,[req.body.username,req.body.title, req.body.content], (err, result) => {
      console.log(err)
      if (err !== null) {
        res.json({
          status: false,
          msg: '添加失败',
        });
      } else {
        res.json({
          status: 200,
          msg: '添加成功',
        });
      }
    })
  }),
  //查询草稿
  router.get('/queryDraftCasual',function (req,res,next) {
    conn.query(sqlMap.article.selectdraft, (err, result) => {
      console.log(err)
      if (err !== null) {
        res.json({
          status: false,
          msg: '服务器发生问题',
        });
      } else {
        res.json({
          status: 200,
          msg: '查询成功',
          data:result
        });
      }
    })
  }),
  //删除草稿
  router.post('/deleteDraftCasual',function (req,res,next) {
    console.log(req.body)
    conn.query(sqlMap.article.deletedraft, req.body.Id,(err, result) => {
      console.log(err)
      if (err !== null) {
        res.json({
          status: false,
          msg: '服务器发生问题',
        });
      } else {
        res.json({
          status: 200,
          msg: '删除成功',
          Index:req.body.Index
        });
      }
    })
  }),
  //更新草稿
  router.post('/updateDraftCasual',function (req,res,next) {
    console.log(req.body)
    conn.query(sqlMap.article.updatedraft, [req.body.title, req.body.content, req.body.Id],(err, result) => {
      console.log(err)
      if (err !== null) {
        res.json({
          status: false,
          msg: '服务器发生问题',
        });
      } else {
        res.json({
          status: 200,
          msg: '更新成功',
          Index:req.body.Index,
          content:req.body.content,
          title:req.body.title,
          username:req.body.username,
          Id:req.body.Id
        });
      }
    })
  }),
//登录
router.post('/login', function(req, res, next) {
  console.log('req.body'+req.body)
  let postData =req.body;
  console.log(postData);
  console.log(req.body.name);
  console.log(req.body.password);
  console.log([postData.username]);
  let content = { name: req.body.name }; // 要生成token的主题信息
  let secretOrPrivateKey = "jwt";// 这是加密的key（密钥）
  let token = jwt.sign(content, secretOrPrivateKey, {
    expiresIn: 60 * 60 * 1  // 1小时过期
  });
  conn.query(sqlMap.user.queryUsername,req.body.name, (err, result) => {
    console.log(result)
    if (result.length === 0) {
      res.json({
        status: false,
        msg: '用户不存在'
      });
    } else {
      if (result[0].password !== postData.password) {
        res.json({
          status: false,
          msg: '密码错误'
        });
      } else {
        res.json({
          status: 200,
          msg: '登录成功',
          token: token
        });
      }
    }
  })
})
module.exports = router;

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql= require("mysql");

bcrypt = require('bcryptjs'),
multer = require('multer'),
moment = require('moment'),

fs= require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');
var http = require('http');

var corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200
};
const app = express();
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

// // parse requests of content-type - application/json
// app.use(bodyParser.json());

// // parse requests of content-type - application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: true }));

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "rsr22@tcS",
  multipleStatements: true,
  database: "equipmax",
  // to convert bit to boolean
  typeCast: function castField(field, useDefaultTypeCasting) {
    // To cast bit fields that have a single-bit in them.
    if (field.type === 'BIT' && field.length === 1) {
      var bytes = field.buffer();
      return bytes[0] === 1;
    }

    return useDefaultTypeCasting();
  },
});
function handleDisconnect() {

con.connect(function (err) {
  // The server is either down
  if (err) {
    // or restarting (takes a while sometimes).
    console.log('error when connecting to db:', err);
    setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
  } else {
    console.log('Reconnected');
  } // to avoid a hot loop, and to allow our nod e script to
}); // process asynchronous requests in the meantime.
// If you're also serving http, display a 503 error.
con.on('error', function (err) {
  console.log('db error', err);
  if (err.code === 'PROTOCOL_CONNECTION_LOST') {
    // Connection to the MySQL server is usually
    handleDisconnect(); // lost due to either server restart, or a
  } else {
    // connnection idle timeout (the wait_timeout
    throw err; // server variable configures this)
  }
});
}
handleDisconnect();

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to  application." });
});

http.createServer(function (req, res) {
  fs.readFile('index.html', function(err, data) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    return res.end();
  });
}).listen(8080);

// for get assetsid
// app.get('/assetid',function (req, res){
 // con.query("SELECT poolAssetID FROM dataitempool LIMIT 10", function (err, rows, fields){
  //  if (err) throw err
   // res.send('users', {title: 'user details',
 // items: rows })
 // })
// });



app.post("/equipmax", (req,res)=>{
  console.log(req.body);
  con.query('select * from checklist', function (err, result) {
    if (err) throw err; res.send(JSON.stringify(result))
  });

})
app.get("/equipmax", (req,res)=>{
  //console.log(req.body);
 // con.query('insert into checklist (checklistField,checklistDataTypeFK,isMandatory,isActive) values("wind" ,3, 1,1) ', function (err, result) {
   // if (err) throw err; res.send(JSON.stringify(result))
  res.send(200)
  });
  app.get('/assetid', (req,res) =>{
    con.query('SELECT poolItemKeyPK,poolAssetID  FROM dataitempool WHERE poolfrequency <> 0 LIMIT 10 ',function(err,result){
      if(err) throw err;
      res.send(JSON.stringify(result))
    });
  }) 

  //amc chart api

  app.get('/assetamcchart', (req,res) =>{
    let sql = 'select  iteName, iteItemPK from dataitem where iteIsActive=1;';
  con.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      res.status(404).json({
        failed: 'Not found',
      });
    } else {
      res.status(200).send(result);
    }
  });
});

// app.get('/getforeditupdate', (req,res) =>{
//   let sql = 'SELECT checklistPK, checklistField as assetsChecklist , checklistDataTypeFK FROM `checklist` ;';
// con.query(sql, (err, result) => {
//   if (err) {
//     console.log(err);
//     res.status(404).json({
//       failed: 'Not found',
//     });
//   } else {
//     res.status(200).send(result);
//   }
// });
// });


app.post("/getforeditupdate",(req,res) =>{
  assetId = req.body.assetId;
 console.log(" assetId", assetId);
 
 sql1=`select checklistpk,checklistField,if(dataitempoolfk is not null,1,0) as selectedValue,0 as doesChange  from checklistpool
 right join checklist on(checklistfk=checklistpk and dataitempoolfk=${assetId})`;
  // sql1 = `Select checklistPoolPK as checklistAssetkey, dataitempoolFK as assetKey, checklistFK as checklistKey, checklistField, poolfrequency,poolfrequencyRate
  // from checklistpool
  //      inner join checklist on(checklistpool.checklistFK = checklist.checklistPK)
  //      inner join dataitempool on(checklistpool.dataitempoolFK = dataitempool.poolItemKeyPK)
  // where checklist.isActive = 1 and checklistpool.isActive = 1 and  dataitempoolFK = '${assetId}'
  // order by dataitempoolFK;`
 
    con.query(sql1, (err, result) => {
  if (err) {
    console.log(err);
  }
  else {
    console.log(result);
    res.send(
      JSON.stringify({
        result: "passed",
        req_log: result
      })
    );
  }
})
})


app.post("/getpoolfrequency",(req,res) =>{
  assetId = req.body.assetId;
 console.log(" assetId", assetId);
  
  sql1 = `Select poolfrequency,poolfrequencyRate
  from dataitempool
      
  where  poolItemKeyPK = '${assetId}'
  order by poolItemKeyPK;`
 
    con.query(sql1, (err, result) => {
  if (err) {
    console.log(err);
  }
  else {
    console.log(result);
    res.send(
      JSON.stringify({
        result: "passed",
        req_log: result
      })
    );
  }
})
})
//get amcPo list
app.get('/getAmcPoList', function (req, res) {
  const query =`select  t.item, t.poolItem, t.amccost,  t.itemcost, t.itemID, t.extraCost,t.difference, t.totalAmc, t.AssetID
  from (
       select  * from (select iteName as item ,  linkItemKeyFK as poolItem, SUM(linkBaseItemCost) as amccost,  
         poolCost as itemcost , iteItemPK as itemID, pmExtraCostIncurred as extraCost,
         (poolCost-(SUM(linkBaseItemCost)+sum(pmExtraCostIncurred))) as difference, ( SUM(linkBaseItemCost) + sum(pmExtraCostIncurred)) AS totalAmc,
         poolAssetID as AssetID from linkitemlayer
       inner join linkitemamc on(linkitemamc.linkItemAMCPK=linkitemlayer.linkItemKeyPK)
       inner join datapmscheduledetails on(datapmscheduledetails.pmItemAMCFK=linkitemamc.linkItemKeyFK)
       inner join dataitempool on(dataitempool.poolitemkeypk=linkitemamc.linkItemKeyFK)
       inner join dataitem on(dataitem.iteItemPK=dataitempool.poolItemFK)
       where poolCost>0 and pmExtraCostIncurred is not null
       GROUP BY poolItem
       order by difference 
       
       
       )  as amc
       ) as t
  ;`
  con.query(query, (err, result) => {  
    if (err) {
      console.log(err);
      res.status(401).json({
        failed: 'Unauthorized Access',
      });
    } else {
      res.end(JSON.stringify(result));
    }
  });
});

//get second amc compare bar chart
app.get('/getAmcCompareList', function (req, res) {
  const query =`SELECT     poolAssetID,
  poolItemKeyPK,
  poolCost as before_cost,
  poolProcurementDate,
  iteDepreciationValue,
  poolCost * power( (1 - iteDepreciationValue / 100),timestampdiff( YEAR, poolprocurementdate,now() )) AS after_depreciation_cost,
  timestampdiff( YEAR, poolprocurementdate,now() ) aS YearsDepreciated 
FROM dataitempool
inner join linkitemlayer on(linkitemlayer.linkItemKeyPK=dataitempool.poolItemKeyPK)
inner join dataitem on(dataitem.iteItemPK=dataitempool.poolItemFK)
GROUP BY poolItemKeyPK
ORDER BY  poolcost-after_depreciation_cost desc  ;`
  con.query(query, (err, result) => {
    if (err) {
      console.log(err);
      res.status(401).json({
        failed: 'Unauthorized Access',
      });
    } else {
      res.end(JSON.stringify(result));
    }
  });
});

//LifeCycle PIE CHART
app.get('/getLifecycleChart', function (req, res) {
  const query =`SELECT  
  COUNT(CASE WHEN lifespanStart > timestampdiff( YEAR, poolprocurementdate,now() ) THEN 1 END) as Life_not_Reached,
  COUNT(CASE WHEN lifespanEnd < timestampdiff( YEAR, poolprocurementdate,now() ) THEN 1 END) as Expired_Life,
   COUNT(CASE WHEN ( ( lifespanEnd <= timestampdiff( YEAR, poolprocurementdate,now() ) ) && 
                    (timestampdiff( YEAR, poolprocurementdate,now() ) <= lifespanStart))THEN 1 END) as Life_within_Range
 FROM dataitempool
 inner join dataitem on(dataitem.iteItemPK=dataitempool.poolItemFK)
 ;`
  con.query(query, (err, result) => {
    if (err) {
      console.log(err);
      res.status(401).json({
        failed: 'Unauthorized Access',
      });
    } else {
      res.end(JSON.stringify(result));
    }
  });
});

  //rest api to get a single employee data
app.get('/assetid/:id', function (req, res) {
  con.query('SELECT poolItemKeyPK,poolAssetID FROM dataitempool  where poolItemKeyPK=?', [req.params.id], function (err, result) {
   if (err) throw err;
   console.log(result);
   res.send(JSON.stringify(result));
 });
});
// api to update record into mysql database
app.put('/assetid/update/:id', function (req, res) {
  con.query('UPDATE `dataitempool` SET `poolAssetID`=? where `poolItemKeyPK`=?', [req.body.poolAssetID, req.body.id], function (err, result) {
   if (err) throw err;
   res.send(JSON.stringify(result));
 });
});
// api to delete record from mysql database
app.delete('/assetid/delete/:id', function (req, res) {
  console.log(req.body);
  con.query('DELETE FROM `dataitempool` WHERE `poolItemKeyPK`=?', [req.body.id], function (err, result) {
   if (err) throw err;
   res.send('Record has been deleted!');
 });
});
app.delete('/checklistpool/delete/:id', function (req, res) {
  console.log(req.body);
  con.query('DELETE FROM `checklistpool` WHERE `checklistPK`=?', [req.body.id], function (err, result) {
   if (err) throw err;
   res.send('Record has been deleted!');
 });
});
  app.get('/asset-table', (req,res) =>{
    
    });
  
  app.get('/checklistpool', (req,res) =>{
    con.query('SELECT * from checklistpool',function(err,result){
      if(err) throw err;
      res.send(JSON.stringify(result))
     });
  })
app.get('/checklist', (req,res) =>{
  con.query('select * from checklist',function(err,result){  
    if(err) throw err;
    res.send(JSON.stringify(result))
  });
 app.post("/checklist", (req,res)=> {
   console.log(req.body);
   con.query('select * from checklist', function(err,result){
     if(err) throw err; res.send(JSON.stringify(result))
   });
 })
})
// app.get('/checklistupdate', (req,res) =>{
//   con.query('select checklistPK, checklistField from checklist  where not exists(select checklistFK from checklistpool where checklist.checklistPK = checklistpool.checklistFK);',function(err,result){  
//     if(err) throw err;
//     res.send(JSON.stringify(result))
//   });
  
 
//  })
 app.get('/checklistupdate/:id', function (req, res) {
  con.query('SELECT checklistPK,checklistField FROM checklist  where checklistPK=?', [req.params.id], function (err, result) {
   if (err) throw err;
   console.log(result);
   res.send(JSON.stringify(result));
 });
});
// Get CheckListFields
app.post('/getCheckListFields', (req, res) => {
  console.log("getCheckListFields");
  console.log(req.body);
  let loc = req.body.location;
  loc += '%';
  const query = `select checklistPK as checklistKey, checklistField 
                   from checklist
                   where isActive = 1;`;
  con.query(query, function (err, result) {
    if (err) {
      console.log("err", err);
      res.status(401).json({
        failed: 'Unauthorized Access',
      });
    }
    console.log("fetch checklist Field result", result);
    res.status(200).json(result);
    
  });
});
// checklist Createditems
app.post('/getchecklistCreateditem', (req, res) => {
  let loc = req.body.location;
  loc += '%';
  const query = `select poolItemKeyPk as itemkey, poolassetid as assetid, poolItemPONumber as poNumber,
      locName as location , buiName as building, layname as layer, 
      dataitem.iteItemPK as itemTypeKey, dataitem.iteName as itemTypeName,
      poolfrequency, poolfrequencyRate
from dataitempool
     inner join linkitemlayer on(dataitempool.poolItemKeyPK = linkitemlayer.linkItemKeyPK)
     inner join datalocation on(SUBSTRING(linkitembuildingFK, 1, 11)=loclocationPK)
     inner join databuilding on(linkitembuildingFK = buiBuildingPK)
     left join  datalayer on(laylayerpk = linkitemlayerfk)
     inner join dataitem on (dataitempool.poolItemFK = dataitem.iteItemPK)
 where linkItemBuildingFK like ? and locIsActive=1 and buiIsActive=1 and poolfrequency <> 0;`;
  con.query(query, [loc], function (err, result) {
    if (err) {
      console.log("err", err);
      res.sendStatus(401).json({
        failed: 'Unauthorized Access',
      });
    }
    console.log("checklist result", result);
    res.send(200).json(result);
  });
});
// get Checklist Creation Assets
app.post('/getChecklistCreationAssets', (req, res) => {
  let loc = req.body.location;
  console.log('i am in')
  console.log('req', req.body)
  loc += '%';
  const query = `select poolItemKeyPk as itemkey, poolassetid as assetid, poolItemPONumber as poNumber,IFNULL(upcomingCheckDate, '') as upcomingCheckDate,
                        locName as location , buiName as building, layname as layer, 
                        dataitem.iteItemPK as itemTypeKey, dataitem.iteName as itemTypeName,
                        poolfrequency, poolfrequencyRate
                   from dataitempool
                        inner join linkitemlayer on(dataitempool.poolItemKeyPK = linkitemlayer.linkItemKeyPK)
                        inner join datalocation on(SUBSTRING(linkitembuildingFK, 1, 11)=loclocationPK)
                        inner join databuilding on(linkitembuildingFK = buiBuildingPK)
                        left join  datalayer on(laylayerpk = linkitemlayerfk)
                        inner join dataitem on (dataitempool.poolItemFK = dataitem.iteItemPK)
                        left outer join ( 
                           SELECT c.dataitempoolFK, c.upcomingCheckDate
                             FROM ( SELECT dataitempoolFK, MAX(upcomingCheckDate) upcomingCheckDate
                                      FROM checklistlog
                                      GROUP BY dataitempoolFK
                                ) c
                         ) b on dataitempool.poolItemKeyPk = b.dataitempoolFK
                   where linkItemBuildingFK like ? and locIsActive=1 and buiIsActive=1 
                     and poolfrequency <> 0
                     and ( upcomingCheckDate <= ? || upcomingCheckDate IS NULL);`;
  con.query(query, [loc, req.body.currentDateTime], function (err, result) {
    if (err) {
      console.log("err", err);
      res.status(401).json({
        failed: 'Unauthorized Access',
      });
    }
    console.log("checklist result", result);
    res.status(200).json(result);
  });
});
app.post("/getAssetDetails",(req,res) =>{
  assetId=req.body.assetId;
  console.log("getasset",assetId);
  sql1 = `select checklistLogPK, poolItemKeyPk as itemkey, poolassetid as assetid, poolItemPONumber as poNumber, 
  dataitem.iteItemPK as itemTypeKey, dataitem.iteName as itemTypeName, 
  poolfrequency, poolfrequencyRate, IFNULL(checklistoperationDate,'') as LastChecklistCreationDateTime
from dataitempool
  inner join dataitem on (dataitempool.poolItemFK = dataitem.iteItemPK)
  left outer join checklistlog on (dataitempool.poolItemKeyPk = checklistlog.dataitempoolFK)
where poolItemKeyPk = '${assetId}'
   order by checklistLogPK desc LIMIT 1`
    con.query(sql1, (err, result) => {
  if (err) {
    console.log(err);
  }
  else {
    console.log(result);
    res.send(
      JSON.stringify({
        result: "passed",
        req_log:result
      })
    );
  }
})
})
// Get Detail for selected asset for checklist Creation 
 app.post('/uuuuuuu', (req, res) => {
   let loc = req.body.location;
   loc += '%';
  const query = `select checklistFK, dataitempoolFK , checklistField
                   from checklistpool
                     inner join checklist on (checklistpool.checklistFK = checklist.checklistPK)
                      left outer join dataitempool on (checklistpool.dataitempoolFK = dataitempool.poolItemKeyPK)
                  where poolItemKeyPk = '${assetId}'
                        order by checklistPK `;
						
                        con.query(sql1, (err, result) => {
                          if (err) {
                            console.log(err);
                          }
                          else {
                            console.log(result);
                            res.send(
                              JSON.stringify({
                                result: "passed",
                                req_log:result
                              })
                            );
                          }
                        })
 });
//save checklist Creation Log and field DataValue 
app.post('/savechecklistCreationLogNDataValue', (req, res) => {
  console.log("savechecklistCreationLogNDataValue");
  console.log(req.body);
  let loc = req.body.location;
  loc += '%';
  let checkListFieldsData = JSON.parse(req.body.checkListFieldsDataArrJson);
  let checklistLogKey;
    const query = `Insert into checklistlog(dataitempoolFK, upcomingCheckDate, checklistoperationDate, serviceDoneDate) values(?, ?, ?, ?)`;
    con.query(query, [req.body.itemkey, req.body.upcomingCheckDate, req.body.checklistoperationDate, req.body.serviceDoneDate], function (err, result) {
      if (err) {
        console.log("err", err);
        res.status(401).json({
          failed: 'Unauthorized Access',
        });
      }
        console.log("save checklistCreation Log", result);
        res.status(200).json(result);
        checklistLogKey = result.insertId
        for(let j = 0; j < checkListFieldsData.length; j++) {
          var currentcheckListFieldData = checkListFieldsData[j];
          savecheckListCreationDataValue(req.body.itemkey, checklistLogKey, currentcheckListFieldData, res);
        }
    });
});
function savecheckListCreationDataValue(itemkey, checklistLogKey, currentcheckListField, res) {
  const isActive = 1;
  const query = `Insert into checklistdata(checklistFk, checklistValue, checklistLogFK) values(?, ?, ?);`;
  con.query(query, [currentcheckListField.checklistKey, currentcheckListField.fieldValue, checklistLogKey], function (err, result) {
  });
};
app.post("/savedata",(req,res) =>{
  serviceDoneDate = req.body.serviceDoneDate;
  localISOTime = req.body.localISOTime;
  localTime = req.body.localTime;
  poolid = req.body.poolid;
  console.log(serviceDoneDate,localISOTime,localTime);
  console.log("poolid",poolid);
  
  sql1 = `insert into checklistlog (dataitempoolFK,upcomingCheckDate,checklistoperationDate,serviceDoneDate) values ('${poolid}','${localTime}','${localISOTime}','${serviceDoneDate}')`
    con.query(sql1, (err, result) => {
  if (err) {
    console.log(err);
  }
  else {
    console.log(result);
    res.send(
      JSON.stringify({
        result: "passed",
        id:res.insertId
      })
    );
  }
})
})
app.post("/getlog",(req,res) =>{
   poolAssetID = req.body.poolAssetID;
 console.log("poolid",poolAssetID);
  sql1 = `select * from checklistlog where dataitempoolFK='${poolAssetID}'`
 con.query(sql1, (err, result) => {
  if (err) {
    console.log(err);
  }
  else {
    console.log(result);
    res.send(
      JSON.stringify({
        result: "passed",
        req_log: result
      })
    );
  }
})
})
app.post("/getupdatechecklist",(req,res) =>{
  checklistField = req.body.checklistField;
console.log("poolid",checklistField);
 sql1 = `select * from checklistpool where checklistFK='${checklistField}'`
con.query(sql1, (err, result) => {
 if (err) {
   console.log(err);
 }
 else {
   console.log(result);
   res.send(
     JSON.stringify({
       result: "passed",
       req_log: result
     })
   );
 }
})
})
app.post("/getAssetlog",(req,res) =>{
  checklistLogPK = req.body.checklistLogPK;
console.log("poolid",poolAssetID);
 sql1 = `select checklistValue,checklistField from checklistlog
 inner join checklistdata on(checklistdata.checklistLogFK = checklistlog.checklistLogPK) 
 inner join checklist on(checklist.checklistPK = checklistData.checklistFk)
 where checklistLogPK = '${checklistLogPK}';`
con.query(sql1, (err, result) => {
 if (err) {
   console.log(err);
 }
 else {
   console.log(result);
   res.send(
     JSON.stringify({
       result: "passed",
       req_log: result
     })
   );
 }
})
})
app.post("/getChecklistLogDetails",(req,res) =>{
  assetId = req.body.assetId;
 console.log(" assetId", assetId);
  
  sql1 = `Select checklistPoolPK as checklistAssetkey, dataitempoolFK as assetKey, checklistFK as checklistKey, checklistField, poolItemPONumber as poNumber, pickparamdatatype.pickParamDataTypePK as dataTypeId, pickparamdatatype.pickDataTypeName as dataTypeName
  from checklistpool
       inner join checklist on(checklistpool.checklistFK = checklist.checklistPK)
       inner join dataitempool on(checklistpool.dataitempoolFK = dataitempool.poolItemKeyPK)
       inner join pickparamdatatype on(checklist.checklistDataTypeFK = pickparamdatatype.pickParamDataTypePK)
  where checklist.isActive = 1 and checklistpool.isActive = 1 and  dataitempoolFK = '${assetId}'
  order by dataitempoolFK;`
 
    con.query(sql1, (err, result) => {
  if (err) {
    console.log(err);
  }
  else {
    console.log(result);
    res.send(
      JSON.stringify({
        result: "passed",
        req_log: result
      })
    );
  }
})
})
  
      
// Get Existing CheckListFields for asset
app.post('/getExistingCheckListFieldsForSelectedAsset', (req, res) => {
  let loc = req.body.location;
  console.log("t",loc);
  loc += '%';
  const query = `Select checklistPoolPK as checklistAssetkey, dataitempoolFK as assetKey, checklistFK as checklistKey, checklistField, poolItemPONumber as poNumber, pickparamdatatype.pickParamDataTypePK as dataTypeId, pickparamdatatype.pickDataTypeName as dataTypeName
                   from checklistpool
                        inner join checklist on(checklistpool.checklistFK = checklist.checklistPK)
                        inner join dataitempool on(checklistpool.dataitempoolFK = dataitempool.poolItemKeyPK)
                        inner join pickparamdatatype on(checklist.checklistDataTypeFK = pickparamdatatype.pickParamDataTypePK)
                   where checklist.isActive = 1 and checklistpool.isActive = 1 and  dataitempoolFK = ?
                   order by dataitempoolFK;`;
  con.query(query, [req.body.assetKey], function (err, result) {
    if (err) {
      console.log("err", err);
      res.status(401).json({
        failed: 'Unauthorized Access',
      });
    }
    // console.log("fetch checklist Field result", result);
    res.status(200).json(result);
  });
});
// save new and existing checkList for selected Asset
app.post('/saveNewNExistingCheckListFieldsForSelectedAsset', (req, res) => {
  console.log("saveCheckListAssetItems");
  console.log(req.body);
  let loc = req.body.location;
  loc += '%';
 
  checkListFields = JSON.parse(req.body.checkListFieldsArrJson);
  let checklistpoolKey;
    const query = `delete from checklistpool where dataitempoolFK = ?`;
    con.query(query, [req.body.itemkey], function (err, result) {
      if (err) {
        console.log("err", err);
        res.status(401).json({
          failed: 'Unauthorized Access',
        });
      }
        console.log("save new or existing checkList asset result", result);
        res.status(200).json(result);
       
    });
    for(let j = 0; j < checkListFields.length; j++) {
      // console.log(checkListFields[j]);
      var currentcheckListField = checkListFields[j];
      saveChkListFields(req.body.itemkey , currentcheckListField, res);
    }
});
function saveChkListFields(itemkey, currentcheckListField, res) {
  const isActive = 1;
  const query = `insert into checklistpool(dataitempoolFK, checklistFK, isActive) values(?, ?, ?);`
  con.query(query, [itemkey, currentcheckListField.checklistPK, isActive], function (err, result) {
  });
};

// save new and existing checkList for selected Asset
app.post('/saveNewNExistingCheckListFieldsForSelectedAsset1/:itemkey', (req, res) => {
  console.log("save");
  console.log(req.body);
 
    const query = `UPDATE dataitempool SET poolfrequency =? ,   poolfrequencyRate =? where poolItemKeyPK=?`;
    con.query(query,[req.body.updatedpool,req.body.updatedpoolRate, req.body.itemkey], function (err, result) {
      if (err) {
        console.log("err", err);
        res.status(401).json({
          failed: 'Unauthorized Access',
        });
      }
        console.log("save new or existing checkList asset result", result);
        res.status(200).json(result);
        // for(let j = 0; j < checkListFieldsData.length; j++) {
        //   var currentcheckListFieldData = checkListFieldsData[j];
        //   savecheckListCreationDataValue1(req.body.itemkey, currentcheckListFieldData, res);
        // }
       
    });
   
});
// function savecheckListCreationDataValue1(itemkey, currentcheckListField, res) {
//   const query = `UPDATE dataitempool SET poolfrequency =?`;
//   con.query(query, [currentcheckListField.fieldValue], function (err, result) {
//   });
// };
// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
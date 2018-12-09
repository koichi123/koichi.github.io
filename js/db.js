// var dbName = 'sampleDB';
// var dbVersion = '1';
// var storeName  = 'sampleStore';
// var data = {id : '1', name : 'test'};

// //　DB名を指定して接続。DBがなければ新規作成される。
// var openReq  = indexedDB.open(dbName, dbVersion);

// openReq.onerror = function(event){
//     // 接続に失敗
//     console.log('db open error');
// }

// openReq.onupgradeneeded = function(event){
//     var db = event.target.result;
//     db.createObjectStore(storeName, {keyPath : 'id'})
//     //onupgradeneededは、DBのバージョン更新(DBの新規作成も含む)時のみ実行
//     console.log('db upgrade');
// }

// openReq.onsuccess = function(event){
//     //onupgradeneededの後に実行。更新がない場合はこれだけ実行
//     var db = event.target.result;

//     var trans = db.transaction(storeName, "readwrite");
//     var store = trans.objectStore(storeName);
//     var putReq = store.put(data);
//     var getReq = store.get("1").onsuccess = function(event) {
//         console.log("取得しました", event.target.result.id);
//       };

//     putReq.onsuccess = function(){
//         console.log('put data success');
//     }

//     trans.oncomplete = function(){
//     // トランザクション完了時(putReq.onsuccessの後)に実行
//         console.log('transaction complete');
//     }

//     console.log('db open success');
//     // dbVersion = db.version;
//     console.log(dbVersion);

//     // var trans = db.transaction(storeName, 'readonly');
//     // var store = trans.objectStore(storeName);
//     // var getReq = store.get("A1");

//     // 接続を解除する
//     db.close();
// }
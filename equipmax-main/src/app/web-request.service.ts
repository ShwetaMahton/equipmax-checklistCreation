import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import {  Observable, of, Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
//import 'rxjs/add/operator/map';

const baseUrl = 'http://localhost:4200/api/createchecklist';
const baseurl = 'http://localhost:4200/asset-table';
@Injectable({
  providedIn: 'root'
})
export class WebRequestService {

  constructor(private http: HttpClient) {}
  sendData: any;
  public checklistField:any;
  public  checklistKey:number;
  public poolAssetID:number;
  public checklistLogPK:number;
  public checklistPK:number;
  getchecklist() {
      return this.http.get(environment.url+'/checklist')
  }
  getDialogId(){
    console.log(this.poolAssetID);
    localStorage.setItem('id', JSON.stringify(this.poolAssetID));
  }
  getupdatechecklist(){
    console.log(this.checklistField);
    localStorage.setItem('id', JSON.stringify(this.checklistField));
  }

  getOne(id) {
    return this.http.get('http://localhost:3000/assetid/'+id)
 }
 getoneupdate(id) {
  return this.http.get('http://localhost:3000/checklistupdate/'+id)
}
 updateData(info)
 {
  return this.http.put('http://localhost:3000/assetid/update/'+info.id,info)
 }

  getassetid()  {
    return this.http.get(environment.url + '/assetid')
  }
  
  getassetamc()  {
    //return this.http.get(environment.url + '/getAmcPoList')
    const url = environment.url + '/getAmcPoList';
    return this.http.get(url)
    .pipe(
      tap((_) => console.log('fetched successfully')),
      catchError(
        this.handleError<any>('get amc po', [])
      )
    );
  }

  getAssetcostDepreciatecostChart()  {
    //return this.http.get(environment.url + '/getAmcCompareList')
    const url = environment.url + '/getAmcCompareList';
    return this.http.get(url)
    .pipe(
      tap((_) => console.log('fetched successfully')),
      catchError(
        this.handleError<any>('get assetCost DepreciateCost Comparison Bar chart', [])
      )
    );
  }

  getchecklistpool()  {
    return this.http.get(environment.url + '/checklistpool')
  }

  getRecord() {
    return this.http.get(environment.url + '/asset-table-index')
  }
  open() {
    return this.http.get(environment.url + '/dialog-asset-table')
  }

handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
  getData() {
  return this.http.get('http://localhost:3000/equipmax')
  }


  create(data) {
    return this.http.post('http://localhost:3000/equipmax', data);
  }

  fetchAssetDetails(assetId){
    console.log("////id",assetId);
    return this.http.post('http://localhost:3000/getAssetDetails', {assetId});
   
  }

  fetch(assetId){
    console.log("////id",assetId);
    return this.http.post('http://localhost:3000/uuuuuuu', {assetId});
   
  }


  fetchCheckListFields(): any {
    const headers = new HttpHeaders();
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'POST,GET,OPTIONS,PUT');
    headers.append('Accept', 'application/json');
    headers.append('content-type', 'application/json');

    const url = environment.url + '/getCheckListFields';
    console.log('url', url);

    return this.http.post(url, { headers })
    .pipe(
      tap((_) => console.log('fetched successfully')),
      catchError(
        this.handleError<any>('fetched CheckListFields', [])
      )
    );
  }
  savechecklistCreationLogNDataValue(data): any {
    const headers = new HttpHeaders();
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'POST,GET,OPTIONS,PUT');
    headers.append('Accept', 'application/json');
    headers.append('content-type', 'application/json');

    const url = environment.url + '/savechecklistCreationLogNDataValue';
    console.log('url', url);

    return this.http.post(url, data, { headers })
    .pipe(
      tap((_) => console.log('saved successfully')),
      catchError(
        this.handleError<any>('save checklistCreation Log', [])
      )
    );
  }
  saveNewNExistingCheckListFieldsForSelectedAsset(data): any {
    const headers = new HttpHeaders();
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'POST,GET,OPTIONS,PUT');
    headers.append('Accept', 'application/json');
    headers.append('content-type', 'application/json');

    const url = environment.url + '/saveNewNExistingCheckListFieldsForSelectedAsset';
    console.log('url', url);

    return this.http.post(url, data, { headers })
    .pipe(
      tap((_) => console.log('saved successfully')),
      catchError(
        this.handleError<any>('save saveNewNExistingCheckListFieldsForSelectedAsset', [])
      )
    );
  }

  updatechecklist(data): any {
    const headers = new HttpHeaders();
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'POST,GET,OPTIONS,PUT');
    headers.append('Accept', 'application/json');
    headers.append('content-type', 'application/json');

    const url = environment.url + '/updatechecklist';
    console.log('url', url);

    return this.http.post(url, data, { headers })
    .pipe(
      tap((_) => console.log('saved successfully')),
      catchError(
        this.handleError<any>('update checklist', [])
      )
    );
  }

  fetchExistingCheckListFieldsForSelectedAsset(data): any {
    const headers = new HttpHeaders();
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'POST,GET,OPTIONS,PUT');
    headers.append('Accept', 'application/json');
    headers.append('content-type', 'application/json');

    const url = environment.url + '/getExistingCheckListFieldsForSelectedAsset';
    console.log('data Jyoti', data);
    
    return this.http.post(url, data, { headers })
    .pipe(
      tap((_) => console.log('fetched successfully')),
      catchError(
        
        this.handleError<any>('fetched ExistingCheckListFields For SelectedAsset', [])
      )
    );
  }
  getchecklistlog()  {
    console.log(this.poolAssetID);
    var poolAssetID= this.poolAssetID;
   return this.http.post('http://localhost:3000/getlog', {poolAssetID});

  }
  getchecklistid()  {
    console.log(this.checklistField);
    var checklistField= this.checklistField;
   return this.http.post('http://localhost:3000/getupdatechecklist', {checklistField});  

  }
  
  getchecklistlogData(assetId:number)  {
    console.log("assetId...........",assetId);
   return this.http.post('http://localhost:3000/getChecklistLogDetails', {assetId});

  }

  getAssetlogData()  {
    console.log("checklistLogPK....",this.checklistLogPK);
    var checklistLogPK= this.checklistLogPK;
   return this.http.post('http://localhost:3000/getAssetlog', {checklistLogPK});

  }
  deleteData(assetId:number)  {
    console.log(assetId);
    
    return this.http.delete('http://localhost:3000/checklistpool/delete/'+ {assetId})
  }
  

}

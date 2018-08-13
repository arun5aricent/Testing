import {Injectable} from '@angular/core';

@Injectable()
export class PagerService{
 public allItems:any[] = [];  
  getPager(totalItems:number , currentPage:number = 1, pageSize:number = 10){
    let totalPages = Math.ceil(totalItems/pageSize);
    let startPage: number, endPage:number;
    if(totalPages<=10){
      startPage = 1;
      endPage = totalPages;
    } else {
      if(currentPage <=6){
        startPage = 1;
        endPage = 10;
      } else if(currentPage+4 <= totalPages){
        startPage = totalPages - 9;
        endPage = currentPage + 4;
      }else {
        startPage = currentPage - 5;
        endPage = totalPages;
      }
    }
    let startIndex = (currentPage - 1) * pageSize;
    let endIndex = Math.min(startIndex + pageSize -1, totalItems -1);
    let pages = this.getPageRange(startPage, endPage+1);
    return {
            totalItems: totalItems,
            currentPage: currentPage,
            pageSize: pageSize,
            totalPages: totalPages,
            startPage: startPage,
            endPage: endPage,
            startIndex: startIndex,
            endIndex: endIndex,
            pages: pages
        };
  }
  
  getPageRange(startPage:number, endPage:number){
    var pageNumber:number;
    var pageRange:number[] = [];
    for(pageNumber = startPage ; pageNumber<endPage; pageNumber++ ){
      pageRange.push(pageNumber);
    }
    return pageRange;
  }
}
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from 'src/app/models/model';
import { PostService } from 'src/app/services/post.service';


@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {

 //Paginacion
 pageSize = 14; // Número de elementos por página
 currentPage = 1; 
 totalItems = 0;
 dataSource: MatTableDataSource<Post>;
 @ViewChild(MatPaginator) paginator: MatPaginator;
 @ViewChild(MatSort) sort: MatSort;
 displayedColumns = ['Id','Name', 'Title','Status','Edit','Delete'];
 constructor(private service:PostService,private route: ActivatedRoute,private router: Router) 
 {
  
 }
 ngOnInit(): void {   
   this.onSubmit();
 }
 onSubmit():void
 {     
     this.service.findAll()
     .subscribe(res=>{this.dataSource = new MatTableDataSource(res);this.configTable();this.calcular();})    
 }
 configTable() {
   this.dataSource.paginator = this.paginator;
   this.dataSource.sort = this.sort;
 }
 onPrint():void
 {
  
 }
 onDelete(id:number){
  if (confirm("Desea borrar el actual asiento ? ")) {
    
    this.service.delete(id)
      .subscribe(res=>this.onSubmit(),
        err => {
          alert("El servidor de mail no se puede eliminar.");
          // Revert the view back to its original state              
        });
  }
}
 addNew(): void
     {       
       this.router.navigate(['post/add'] );
     }
 findByName(name): void {       
   this.dataSource.filter = name.trim().toLowerCase();
   this.calcular();    
 }
 
 calcular():void
 {
 
 }   

}

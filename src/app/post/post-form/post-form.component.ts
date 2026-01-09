import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post, statusPost } from 'src/app/models/model';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css']
})
export class PostFormComponent implements OnInit {
  form :  FormGroup;
  entity: Post = new Post();  
  submitted = false;
  mode = "new";
  _id: String;  
  errMsg = [];
  statusPost = [];

  get f() { return this.form.controls; }
  
  constructor(private entityService: PostService,
              private router: Router,private route: ActivatedRoute,
              private formBuilder: FormBuilder)            
              {                      
              }
    
    ngOnInit(): void {
      this.popupData();    
      this._id = this.route.snapshot.params['id'];      
      this.createForm();
      //editar
      if(this._id)
      { 
         this.getById(this._id);
         this.mode="edit"
      }
      else //set default values
      {
        this.setDefaultValues();
      }
       
      
      this.calculateOnInit();
      }
  
    createForm():void
      {
        this.form = this.formBuilder.group({
        id: [this.entity.id  || 0],
        name: new FormControl(this.entity.name,Validators.required),
        title: new FormControl(this.entity.title,Validators.required),
        content: new FormControl(this.entity.content,Validators.required),
        status: new FormControl(this.entity.status,Validators.required),        
      });
    }
  
    popupData():void
    {
      this.statusPost =statusPost;      
    }
    setDefaultValues():void
    {
      this.entity.id = 0;
      this.entity.status = "Publicado";
      this.createForm();
    }
       
    getById(id):void
    {
      this.entityService.findOne(id).subscribe(res=>{this.entity = res;this.createForm();});
    }
   new(): void
    {
      this.submitted = false;   
    }
     
    save() 
    {    
      var entity = this.form.value;
      if( this.mode=="new"){  //  
      delete entity.id;      
      this.entityService.add(entity)
      .subscribe(data => {this.goBack();}, 
                 error => {console.log(error);
                 this.errMsg = error;               
                 this.setControlsError(error.error);});
       }
       else //Edit
       {
        this.entityService.update(this.entity.id,this.form.value)
        .subscribe(data => {this.goBack();}, error => {
                   console.log(error);                 
                   this.setControlsError(error.error);               
                   }
         );
       }
    }
    delete(){
      if (confirm("Desea borrar el actual asiento ? ")) {
        
        this.entityService.delete(this.entity.id)
          .subscribe(res=>this.goBack(),
            err => {
              alert("El servidor de mail no se puede eliminar.");
              // Revert the view back to its original state              
            });
      }
    }
  calculateOnInit():void
  {         
   
  }
    onSubmit() {
       this.save();
    }
  
    goBack() {
      this.router.navigate(['post/list']);
    }
       
    setControlsError(validationErrors)
    {    
      Object.keys(validationErrors).forEach(prop=>
        {
          const formControl = this.form.get(prop);
          if (formControl)
             {
              formControl.setErrors({serverError: validationErrors[prop]});
              formControl.markAsTouched();
                     }
         });    
    }
    get id() { return this.form.get('id'); }


}

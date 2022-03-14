import { element } from 'protractor';
import { ClickCategorie } from 'src/app/models/profiling/ClickCategorie';
import { ProfileCatergorie } from 'src/app/models/profiling/ProfileCategorie';
import { ProfileReviews } from 'src/app/models/profiling/ProfileReview';
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Click } from 'src/app/models/profiling/Click';
import { ProfileTag } from 'src/app/models/profiling/ProfileTag';
import { ClickTag } from 'src/app/models/profiling/ClickTag';

@Injectable({
  providedIn: 'root'
})
export class CollectDataServiceService {

  


  
  private RecommendationUrl: string="http://localhost:8080/ProfileReview" 
  private CategorieUrl : string ="http://localhost:8080/ProfileCategorie"
  private TagUrl : string = "http://localhost:8080/ProfileTag"

  private click: Click;
  private clickCategorie: ClickCategorie;
  private clickTag: ClickTag;
  private  profileReviews: ProfileReviews;
  private  profileCatergorie: ProfileCatergorie;
  private  ProfileTag: ProfileTag;

  constructor(private http: HttpClient) { 
    
 
        
  }


  createProfileReview(profile_id : string , recommendation_id : string ){
    this.click={
      id_Profile:profile_id,
      id_Recommendation:recommendation_id,

    } 

    this.profileReviews={
     
      click: this.click,
      clickRecommendationCard: 0,
      clickRecommendationMarker:0,
      clickRecommendationWebsite:0,
      clickSyRendre:0,
      clickNavigation: false,
      isLike: false
    }


      

  }


  
  createProfileCategorie(profile_id : string , categorie_id : string){
      this.clickCategorie={
        id_Profile:profile_id,
        id_Categorie:categorie_id
      }

      this.profileCatergorie={
        click: this.clickCategorie,
        clickOnCategorie:0
      }

  }


  
  createProfileTag(profile_id: string , tag_id: string){
    this.clickTag={
      id_Profile: profile_id,
      id_Tag: tag_id
    }

    this.ProfileTag={
      click: this.clickTag,
      clickOnTag:0
    }

    
  }




    // If profile click on Tag in Categorie
    setOnClickTag(profile_id : string , tag_id : string){
     
      this.createProfileTag(profile_id , tag_id)
      return this.http.post<any>(this.TagUrl , this.ProfileTag).toPromise().then((data:any) => {
        console.log(data);
        
       
      });
    }
  
  
  


  // If profile click on Categories :
  setOnClickCategorie(profile_id : string , categorie_id : string){
   
    this.createProfileCategorie(profile_id , categorie_id)
    
    return this.http.post<any>(this.CategorieUrl , this.profileCatergorie ).toPromise().then((data:any) => {
      console.log(data);
      
     
    });

    

  }
  
  
  

  
  

  // IF profile click on Marker in Map
  setOnClickMarker(profile_id : string , recommendation_id : string){
   
     this.createProfileReview(profile_id , recommendation_id);

    
    //alert('Profile of id [ '+profile_id+' ] Click on recomendation card of Business  [ '+recommendation_id+' ]');
    return this.http.post<any>(this.RecommendationUrl  + "/RecommendationMarker" , this.profileReviews).toPromise().then((data:any) => {
      console.log(data);
      
     
    });



    
  }



  // If profile click on Viste web site 

  setOnClickVisteWebSite(profile_id : string , recommendation_id : string){
  
    this.createProfileReview(profile_id , recommendation_id);
    
    
    //alert('Profile of id [ '+profile_id+' ] Click on recomendation card of Business  [ '+recommendation_id+' ]');
    return this.http.post<any>(this.RecommendationUrl  + "/RecommendationWebsite" , this.profileReviews).toPromise().then((data:any) => {
      console.log(data);
      
     
    });


    
  }

  
  
  // If profile click on S'y Rendre 
  setOnClickSyRendre(profile_id : string , recommendation_id : string){
    this.createProfileReview(profile_id , recommendation_id);
    
  
    return this.http.post<any>(this.RecommendationUrl  + "/SyRendre" , this.profileReviews).toPromise().then((data:any) => {
      console.log(data);
      
     
    });
  }


  // If click on Next to navigate in PHOTOS in Card
  setOnClickNextInPhoto(profile_id : string, reccommendation_id: string){
    
      this.createProfileReview(profile_id , reccommendation_id );
    return this.http.post<any>(this.RecommendationUrl  + "/Navigation" , this.profileReviews).toPromise().then((data:any) => {
      console.log(data);
      
     
    });

    

  }

  //if click on Like 
  setOnclickOnLike(profile_id: string , reccommendation_id : string){
      this.createProfileReview(profile_id , reccommendation_id);
      return this.http.post<any>(this.RecommendationUrl +"/Like" , this.profileReviews).toPromise().then((data:any) => {
        console.log(data);
        
       
      });
  }


  // Get informations from Page Gest View , Home page 
  // If click on Item from recomendation parte :
  setOnClickItemInRecomendation(profile_id : string , recommendation_id : string ){



    this.createProfileReview(profile_id , recommendation_id);


    return this.http.post<any>( this.RecommendationUrl  + "/RecommendationCard" , this.profileReviews).toPromise().then((data:any) => {
      console.log(data);
      
     
    });

  }





}

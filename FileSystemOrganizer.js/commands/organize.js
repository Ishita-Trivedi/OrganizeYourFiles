function organizeFn(dirPath)
{
   //console.log("organize command implemented for",dirPath);
    //steps or psueduocode
    //1.input->directory path given
    let destPath;
    
    if(dirPath==undefined)
    {
   //console.log("kindly enter the path");
   destPath =process.cwd();
   return;
    }
    else {
        let doesExist=fs.existsSync(dirPath);
            if(doesExist)
            {
                 //2.create->organized_files->directory
                 destPath = path.join(dirPath,"oraganized_files");
                 if (fs.existsSync(destPath)) {
                    console.log('Directory exists!')
                 }
               else
                fs.mkdirSync(destPath);
                
            }
            else{
                console.log("kindly enter the path");
               return ;
            }
    }
    organizeHelper(dirPath,destPath);//define the destination of folder
   
}
function  organizeHelper(rough,destPath)
{
      //3.identify category of all the files present in that input directory
   let childNames= fs.readdirSync(rough); 
  //  console.log(childNames);//it gives names of all files inside folder

   let category ;
  
   for(let i=0;i<childNames.length;i++)
   {
    let childAddress=path.join(rough,childNames[i]);
    let isFile=fs.lstatSync(childAddress).isFile();
    if(isFile)
    {
        category = getCategory(childNames[i]);
        sendFiles(childAddress,destPath,category);
       //  console.log(childNames[i],"belong to->->",category);
    }
   
     //4.copy / cut files to that organized directory inside of any category folder
    
     //       this file put in this(dest) folder of this category


   }

}
function sendFiles(roughFilePath,dest,category)//node main.js organize "C:\Users\Ishita\Desktop\rough"
{
    let categoryPath=path.join(dest,category);
    if(fs.existsSync(categoryPath)==false)
    {
        fs.mkdirSync(categoryPath);
    }

    let fileName=path.basename(roughFilePath);
    let destFilePath =path.join(categoryPath,fileName);
    
        fs.copyFileSync(roughFilePath,destFilePath);
        fs.unlinkSync(roughFilePath);// deltes files fom original folder
        
    console.log(fileName,"copied to  ",category);
    
    



}

function getCategory(name)
{
    let ext =path.extname(name);
     ext=ext.slice(1);//removes . from .pdf in ext for etensions that come in it

    for(let type in types)
    {
        let currentTypeArray = types[type];
        for(let i=0;i<currentTypeArray.length;i++)
        {
         //   console.log("type=",type,"i=",i,"currrent=",currentTypeArray[i],"ext =",ext);
            if(ext==currentTypeArray[i])
            {
                return type;
            }
        }
          
    }
    return "others";
}
module.exports ={
    organizeKey:organizeFn
}
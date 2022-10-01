let inputArr = process.argv.slice(2);
const { ChildProcess } = require("child_process");
let fs=require("fs");
console.log(inputArr);
let path=require("path");
let types={
    media:["mp4","mkv"],
    archives:['zip','7z','rar','tar','gz','ar','iso','xz'],
    documents:['docx','doc','.pdf','xlsx','xls','odt','ods','odp','odg','odf','txt','ps'],
    app:['exe','dmg','pkg',"deb"]
}// types is an object containing what basis we will swgregate tbe files

// node main.js tree "diretory/folder path"

// node main.js organise "diretory/folder path"

//node main.js help

let command =inputArr[0];
switch(command)
{
    case "tree":treeFn(inputArr[1]);break;
    case "organize":organizeFn(inputArr[1]);break;
    case "help":helpFn(inputArr[1]);break;
    default:console.log(" please input command");break;
}
function treeFn(dirPath)
{
    console.log("tree command implemented for",dirPath);
}
function organizeFn(dirPath)
{
    console.log("organize command implemented for",dirPath);
    //steps or psueduocode
    //1.input->directory path given
    let DestinationPath;
    
    if(dirPath==undefined)
    {
   console.log("kindly enter the path");return;
    }
    else {
        let doesExist=fs.existsSync(dirPath);
            if(doesExist)
            {
                 //2.create->organized_files->directory
                 DestinationPath = path.join(dirPath,"oraganized_files");
                if(fs.existsSync(DestinationPath==false))
                fs.mkdirSync(DestinationPath);

            }
            else{
                console.log("kindly enter the path");
               return ;
            }
    }
    organizeHelper(dirPath,DestinationPath);//define the destination of folder
   
}
function  organizeHelper(rough,DestinationPath)
{
      //3.identify category of all the files present in that input directory
   let childNames= fs.readdirSync(rough); let category ;
  // console.log(ChildProcess);
   for(let i=0;i<childNames.length;i++)
   {
    let childAddress=path.join(rough,childNames[i]);
    let isFile=fs.lstatSync(childAddress).isFile();
    if(isFile)
    {
         category = getCategory(childNames[i]);
         console.log(childNames[i],"belong to->->",category);
    }
    //console.log(childNames[i]);
     //4.copy / cut files to that organized directory inside of any category folder
    sendFiles(childAddress,DestinationPath,category);


   }

}
function sendFiles(roughFilePath,DestinationPath,category)
{
    let categoryPath=path.join(DestinationPath,category);
    if(fs.existsSync(categoryPath)==false)
    {
        fs.mkdirSync(categoryPath);
    }

    let fileName=path.basename(roughFilePath);
    let destFilePath =path.join(categorypath,fileName);
    fs.copyFileSync(roughFilePath,destFilePath);
    console.log(fileName,"copied to  ",category);



}
function getCategory(name)
{
    let ext =path.extname(name);
    ext=ext.slice(1);
    for(let type in types)
    {
        let currentTypeArray = types[type];
        for(let i=0;i<currentTypeArray.length;i++)
        {
            if(ext==currentTypeArray[i])
            {
                return type;
            }
        }
        return "others";
    }
}


function helpFn(dirPath)
{
   // console.log("help command implemented for",dirPath);
   // multiple lines
   console.log('List of all commands:node main.js tree "diretory/folder path"\n  node main.js organise "diretory/folder path"\nnode main.js help',dirPath);
}
//node main.js organize "C:\Users\Ishita\Desktop\rough"

   // organizeHelper(dirPath,DestinationPath);//define the destination of folder
   //C:\Users\Ishita\Desktop\print


   //node main.js organize "C:\Users\Ishita\Desktop\rough"
/*   function print()
   {
 // let  ext ="pdf";let ans;
   for(let type in types)
   {
       let cTypeArray = types[type];
       for(let i=0;i<cTypeArray.length;i++)
       {
       // ans=others;
           //console.log("ext =",ext,"ctype=",cTypeArray[i]);
         //  if(ext==cTypeArray[i])
          // {
               console.log("current arr","i=",i,cTypeArray[i],"type =",type);
           //    ans= cTypeArray[i];
          // }
       }
     //  console.log(ans);
      
       //ans= "others";
   }
}
  for (let type in types) {
        if (types.hasOwnProperty(type))
        {
            value = types[type];
            console.log("value =",value);
            if(value==ext)
            return type;
        }
    }
    return "others";*/

    /*function getCategory(name)//node main.js organize "C:\Users\Ishita\Desktop\rough"
{
    let ext =path.extname(name);
     ext=ext.slice(1);//removes . from .pdf in ext for etensions that come in it
   let i;let cTypeArray = types[type];
  
    for(let type in types)
    {
        console.log("type=",type);
        for(i=0;i<cTypeArray.length;i++)
        {
            console.log("ext =",ext,"i=",i," ctype=",cTypeArray[i]);
            if(ext==cTypeArray[i])
            {
               // console.log("hereeeee",cTypeArray[i]);
                return type;
            }
          type++;
        }
        return "others";
       
        
    }
}*/
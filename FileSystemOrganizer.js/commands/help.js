function helpFn(dirPath)
{
   // console.log("help command implemented for",dirPath);
   // multiple lines
   console.log('List of all commands:node main.js tree "diretory/folder path"\n  node main.js organise "diretory/folder path"\nnode main.js help',dirPath);
}
module.exports={
    helpKey:helpFn
}


// node main.js tree "diretory/folder path"

// node main.js organise "diretory/folder path"

//node main.js help
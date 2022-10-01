#!/usr/bin/env node
// use fileSys for command prompt(package.json->bin)
let inputArr = process.argv.slice(2);
console.log(inputArr);
const { ChildProcess } = require("child_process");

let fs=require("fs");
const { dirname } = require("path");

console.log(inputArr);
let path=require("path");
let helpObj=require("./commands/help");
let treeObj=require("./commands/tree");
let organizeObj=require("./commands/organize");

let types = {
    documents: ['docx', 'doc', 'pdf', 'xlsx', 'xls', 'odt', 'ods', 'odp', 'odg', 'odf', 'txt', 'ps', 'tex'],
    media: ["mp4", "mkv","jpeg"],
    archives: ['zip', '7z', 'rar', 'tar', 'gz', 'ar', 'iso', "xz"],
    
    app: ['exe', 'dmg', 'pkg', "deb"]
}
// types is an object containing what basis we will segregate tbe files

let command =inputArr[0];
switch(command)
{
    case "tree":treeObj.treeKey(inputArr[1]);break;
    case "organize":organizeObj.organizeKey(inputArr[1]);break;
    case "help":helpObj.helpKey(inputArr[1]);break;
    default:console.log(" please input command");break;
}






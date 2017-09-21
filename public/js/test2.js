function test(){
    console.log('子之行函数')
}
test();

//行为对象
class Person{
    constructor(){

    }
    say(){
        console.log("你好我是人");
    }
}
Person.age=12;
export {Person};
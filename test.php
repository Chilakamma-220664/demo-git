<?php
echo "<h2>PART-A</h2>"."<br>";
echo "My name is chilakamma I am very good girl"."<br>";
echo "PHP is working successfully"."<br>";
echo "Hello world"."<br>"."<br>";
//types of String
echo "<h3>Types of String</h3>";
//Single Quote String
$name='chilakamma';
echo $name."<br>";
echo gettype($name)."<br>";
$age='19';
echo $age."<br>";
echo gettype($age)."<br>";
//Double Quote String
$name="Nagamalleswari";
echo $name."<br>";
echo gettype($name)."<br>";
$her="My sister is very good girl";
echo $her."<br>";
echo gettype($her)."<br>";
//Integer
$a=10;
$b=20;
echo $a."<br>";
echo gettype($a)."<br>";
echo $b."<br>";
echo gettype($b)."<br>";
//Float
$c=8.2441;
$d=7.4;
echo $c."<br>";
echo gettype($c)."<br>";
echo $d."<br>";
echo gettype($d)."<br>";
//boolean
$islogin=true;
$isAdmin=false;
var_dump($islogin);
echo "<br>";
var_dump($isAdmin);
//Arrays
//a.indexed Array
$aa=array("hello",'hi');
echo $aa[1]."<br>";
echo gettype($aa)."<br>";
//b.Associated Array
$bb=array("name">="chilakamma",
"age">=19,
"coures">="cse");
echo gettype($bb)."<br>";
echo "<h3>Variable Scope</h3>"."<br>";
echo "<h5>Local variable</h5>"."<br>";
function test(){
    $x=10;
    echo $x;
}
test();
echo "<h5>Global variable</h5>"."<br>";
$y=20;
function show(){
    global $y;
    echo $y;
}
show();
echo "<h5>Static variable</h5>"."<br>";
function countNum(){
    static $count=0;
    $count++;
    echo $count."<br>";
}
countNum();
countNum();
countNum();
$x=15;
function demo(){
    $y=10;//local variable

    global $x;//global variable

    static $count=0;//static variable
    $count++;
    echo "Global x=$x<br>";
    echo "local y=$y<br>";
    echo "static count=$count<br>";
}
demo();
demo();
demo()."<br>";
echo "<h2>PART-B</h2>"."<br>";
echo "<h4>String Function</h4>"."<br>";
$vinu="My Name Is Vinu"."<br>";
echo strtolower($vinu)."<br>";
echo strtoupper($vinu)."<br>";
echo ucfirst($vinu);
echo ucwords($vinu);
echo strlen($vinu)."<br>";
echo  strrev($vinu)."<br>";
echo str_replace($vinu,"hello","hi")."<br>";
echo  strpos($vinu,"e")."<br>";
echo trim($vinu)."<br>";
echo ltrim($vinu)."<br>";
echo rtrim($vinu)."<br>";
echo strcmp($vinu,"b")."<br>";
echo strcasecmp($vinu,"n")."<br>";









?>
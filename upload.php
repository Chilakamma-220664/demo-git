<?php

$targetFolder = "uploads/";
$fileName = $_FILES["myfile"]["name"];
$tempName = $_FILES["myfile"]["tmp_name"];

$targetPath = $targetFolder . $fileName;

if (move_uploaded_file($tempName, $targetPath)) {
    echo "File Uploaded Successfully!<br>";
    echo "<a href='index.php'>Go Back</a>";
} else {
    echo "Upload Failed!";
}
?>

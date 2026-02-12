<!DOCTYPE html>
<html>
<head>
    <title>Mini File Manager</title>
</head>
<body>

<h2>Upload File</h2>

<form action="upload.php" method="POST" enctype="multipart/form-data">
    Select file:
    <input type="file" name="myfile" required>
    <input type="submit" value="Upload">
</form>

<hr>

<h2>Uploaded Files</h2>

<?php
$folder = "uploads/";

if (is_dir($folder)) {
    $files = scandir($folder);

    foreach ($files as $file) {
        if ($file != "." && $file != "..") {

            echo "File Name: " . $file . "<br>";
            echo "Size: " . filesize($folder.$file) . " bytes<br>";
            echo "Last Modified: " . date("Y-m-d H:i:s", filemtime($folder.$file)) . "<br>";

            echo "<a href='download.php?file=$file'>Download</a> | ";
            echo "<a href='delete.php?file=$file'>Delete</a>";

            echo "<hr>";
        }
    }
}
?>

</body>
</html>

<?php
$uploaded_file = ""; //Temporary file variable which stores the filename 

if (isset($_FILES["fileupload"])) {
    $file_name = $_FILES["fileupload"]["name"];
    $temp_file = $_FILES["fileupload"]["tmp_name"];
    $destination_directory = __DIR__ . "/uploads/";
    
    // Create uploads directory if it doesn't exist
    if (!is_dir($destination_directory)) {
        mkdir($destination_directory, 0777, true);
    }

    if (move_uploaded_file($temp_file, $destination_directory . $file_name)) {
        $uploaded_file = $file_name; 
        echo "Registration Successful! File uploaded<br>";
    } else {
        echo "File not Uploaded<br>";
    }
}

if (isset($_POST["download"])) {
    $file = __DIR__ . "/uploads/" . $_POST["filename"];
    header("Content-Type: application/octet-stream");
    header("Content-Disposition: attachment; filename=" . basename($file));
    readfile($file);
    exit;
}
?>
<!DOCTYPE html>
<html>
<body>
<?php if ($uploaded_file != "") { ?>
    <form method="post">
        <input type="hidden" name="filename" value="<?php echo $uploaded_file; ?>">
        <input type="submit" name="download" value="Download">
    </form>
<?php } ?>
</body>
</html>

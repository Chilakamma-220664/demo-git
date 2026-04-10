<?php

$file = "uploads/" . $_GET['file'];

if (file_exists($file)) {
    unlink($file);
    echo "File Deleted Successfully!<br>";
} else {
    echo "File not found!";
}

echo "<a href='index.php'>Go Back</a>";
?>

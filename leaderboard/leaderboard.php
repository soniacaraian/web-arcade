<?php
    include '../connection.php';

    ini_set('display_errors', 1);

    $result = mysqli_query($conn,"SELECT * FROM PBA ORDER BY score DESC");



?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">

    <link rel="stylesheet" href="leaderboard.css">
    <link rel="stylesheet" href="../arcade_bootstrap.css">

    <script language="javascript" type="text/javascript">
        
        var timeRef;
        var s = 0;

        function changeImage()
        {
            var url = document.getElementById('Change_Image').src;

            if (s === 0)
            {
                document.getElementById('Change_Image').src = "img/title1.png";
                console.log("1");
                s = 1;
            }

            else if (s === 1)
                {
                    s = 2;
                    document.getElementById('Change_Image').src = "img/title2.png";
                    console.log("2");
                }
            else if (s === 2)
                {
                    s = 0;
                    document.getElementById('Change_Image').src = "img/title5.png";
                }
        
                clearInterval(timeRef);
                timeRef = setInterval(changeImage, 450);
        };    

    </script>
</head>
<body onload="changeImage()">
    <div class="top">
        <div class="container">
           
    <div class="row">
        <div class = "col-md-2">
            <div class="title">
                <img id="Change_Image" src="img/title1.png">
       
            </div>
        </div>

    </div>
    

    </div>


</div>


<?php
        
        echo "<table border='1'>
        <tr>
        <th>NAME</th>
        <th>SCORE</th>
        </tr>";
        $i = 1;
    
        echo"<div class='scroll'>";
        while($row = mysqli_fetch_array($result))
        {
        echo "<tr  id='rand" . $i ."'>";
        echo "<td>" . $row['username'] . "</td>";
        echo "<td>" . $row['score'] . "</td>";
        echo "</tr>";

        $i++;
        }
        echo "</table>";
    
        echo"</div>";
        mysqli_close($conn);
?>

</div>
<ul class="games">
            <div class="row">
                
                    <li><button class="btn3"></button></li>
                    <li><a href="../leaderboard2/leaderboard2.php"><button class="btn1" id="pacman"></button></a></li>
                   
            </div>
        </ul>
    </div>

</body>
</html>



</body>
</html>
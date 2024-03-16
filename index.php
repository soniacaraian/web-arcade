<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="arcade_bootstrap.css">
    <link rel="stylesheet" href="index.css">


    <script language="javascript" type="text/javascript">
        
        var timeRef;
        var s = 0;

        function changeImage()
        {
            var url = document.getElementById('Change_Image').src;

            if (s === 0)
            {
                document.getElementById('Change_Image').src = "img/choose12.png";
                console.log("1");
                s = 1;
            }

            else if (s === 1)
                {
                    s = 0;
                    document.getElementById('Change_Image').src = "img/choose02.png";
                    console.log("2");
                }
            

                clearInterval(timeRef);
                timeRef = setInterval(changeImage, 650);
        };    

    </script>
</head>
<body onload="changeImage()">
    <div class="top">
        <div class="container">
           
    <div class="row">
        <div class="col-md-2">
            
        </div>

        <div class = "col-md-2">
            <div class="title">
               <img src="img/arcade7.png">
       
            </div>
        </div>

    </div>

    <div class="row">
        
            <div class="col-md-3">
            </div>

            <div class = "col-md-8">
            <div class = "title2">
               <img id="Change_Image" src="img/choose12.png">
       
            </div>
        </div>
    </div>

    
        <ul class="games">
            <div class="row">
                
                    <li><a href="platformer/platformer.php"><button class="btn3"></button></a></li>
                    <li><a href= "http://127.0.0.1:8080/flappy-bird" ><button class="btn1" id="flappy"></button></a></li>
                    <li><a href="pacman/pacman.php"><button class="btn1" id="pacman"></button></a></li>
                    <li><a href="leaderboard/leaderboard.php"><button class="btn2" id="leaderboard"></button></a></li>
                   
            </div>
        </ul>
    </div>

</div>
</div>

<div class="bottom">
    <div class="container">
        <div class="row">

            <div class="col-md-3">
            </div>

            <div class="col-md-5">
                <p>© CaraianSonia 1211B</p>
            </div>
        </div>
    </div>
</div>

</body>
</html>

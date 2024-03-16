<?php
  include '../connection.php';

 ini_set('display_errors', 1);
  session_start();
  $_SESSION['name'] = '';
  $_SESSION['score'] = 0;

  if(isset($_POST['first']) && isset($_POST['second']) && isset($_POST['third']) && isset($_POST['score'])) {
    $_SESSION['name'] = $_POST['first'] . $_POST['second'] . $_POST['third'];
    $_SESSION['score'] = $_POST['score'];

    $name = $_SESSION['name'];
    $score = $_SESSION['score'];

    $sql = "INSERT INTO PBA (username,score)
    VALUES ('$name','$score')";
    if (mysqli_query($conn, $sql)) {
    
    } else {
     echo "Error: " . $sql . "
 " . mysqli_error($conn);
    }
    mysqli_close($conn);
 }

?>

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8"/>
    <link rel="stylesheet" type="text/css" href="platformer.css">
    <link rel="stylesheet" href="../arcade_bootstrap.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>


    <audio id="track">
      <source src="../music/platformer_music.mp3" type="audio/mpeg" />
    </audio>
  
    <div id="player-container">
      <div id="play-pause" class="play">Play</div>
      <a href="../index.html"><div id="home" class="home">Home</div></a>
    </div>

    <div id="loading"></div>
    
    <script>
      var track = document.getElementById('track');

      var controlBtn = document.getElementById('play-pause');

      function playPause() {
          if (track.paused) {
              track.play();
     
              controlBtn.className = "pause";
          } else { 
              track.pause();
   
              controlBtn.className = "play";
          }
      }

      controlBtn.addEventListener("click", playPause);
      track.addEventListener("ended", function() {
        controlBtn.className = "play";
      });

    </script>

    <script>
      function hideLoader() {
          $('#loading').hide();
      }
    
      //$(window).ready(hideLoader);
      setTimeout(hideLoader, 3 * 1000);
    
    </script>

    <style>
      body {
        margin: 0;
        display: flex;
        justify-content: center;
        background-color: rgba(255, 211, 228, 0.765);
        
      }

      canvas{
          position: absolute;
            margin-top: 110px;
            padding: 0px;
            border: ridge 10px  #e8587e;
            min-height: 3em;
            width: 65%;
            resize: both;
            border-radius: 0px;
            filter: grayscale(10%);
            z-index: 100;
          }


     .title {
        position: absolute;
        height: 30px;
        margin-top: 50px;
     
      }

      #loading {
        background: url('../img/bg.gif');
        background-repeat: no-repeat;
        background-position: center;
        background-size:1070px 602px;
        position: absolute;
        height: 97.6%;
        width: 100%;
        z-index: 999;
        
    }

    #player-container #play-pause, #home {
      margin-left: 0px;
      margin-top: 760px;
      position: absolute;
      cursor: pointer;
      text-indent: -999999px;
      height:60px;
      width: 60px;
      padding: 12px 18px;
      z-index: 2;
      
      background-repeat: no-repeat;
      background-position: center;
      background-size: 16px;
      background-repeat:no-repeat;
      background-position:center;
      background-size:60px;
      background-color: gainsboro;
      border-radius: 50px;
    }

    #player-container #home {
      margin-right: 100px;
    }

    #player-container #play-pause {
      margin-left: 200px;
    }

.play {
  background-image: url("../img/button1.png");
}
.pause {
   background-image: url("../img/button2.png");
}
.home{
  background-image: url('../img/button3.png');
}

.test{
  margin-top: 500px;
  width: 40px;
  margin-left: 40px;

  background-color: #f3a5c4;
  border-color:#ffdfe8;
  border-radius:5px;

  border-width: 5px;

  font-size:large;
  color:#ffffff;
}


#first {
  margin-left: 0px;
  width: 40px;
  height: 50px;

}


#second {
  margin-left: 80px;
  width: 40px;
  height: 50px;

}

#third {
  margin-left: 80px;
  width: 40px;
  height: 50px;

}

.submit{
  margin-right: 500px;

  background-color:#ec91b7;
  margin-top: 50px;
  height: 30px;
  width: 140px;
  border-color:#ffe1ea;
  color: #fff3f6;
  margin-left: 50px;

  z-index: 9999;
  position: absolute;
}

::placeholder{
  color:#ffeef2;
}

.form{
  display:block;
  position:absolute;
  z-index: 999;
  margin-top: 0px;

  float: left;
}

.test {
  margin-right: 0 px;
  z-index: 999;
  position: inherit;
}

.invisible {
  visibility: hidden;
}

  </style>



  </head>
  <body onload="changeImage()">

      <img src="../img/gametitle1.png" class="title" id="Change_Image">

    
      
      <canvas></canvas>

      <form class="name" method="POST">
        <div class="row">
        <input type="text" class="test" id="first" name="first" placeholder="A" style="text-align:center;" maxlength="1">          
        <input type="text" class="test" id="second" name="second" placeholder="A" style="text-align:center;" maxlength="1">
        <input type="text" class="test" id="third" name="third" placeholder="A" style="text-align:center;" maxlength="1">
        
      
        </div>
        <input type="text" class="invisible" name="score" id="score">
        <button class="submit" id="sub">SUBMIT</button>
        
      </form> 

      <script language="javascript" type="text/javascript">
        
        var timeRef;
        
        var s = 0;

        function changeImage()
        {
            var url = document.getElementById('Change_Image').src;

            if (s === 0)
            {
                document.getElementById('Change_Image').src = "../img/gametitle2.png";
                
                s = 1;
            }

            else if (s === 1)
                {
                    document.getElementById('Change_Image').src = "../img/gametitle1.png";
                    s = 0;
                }
            

                clearInterval(timeRef);
                timeRef = setInterval(changeImage, 750);
        };    

        

        </script>
  <script>
    document.getElementById("first").style.display="none";
    document.getElementById("second").style.display="none";
    document.getElementById("third").style.display="none";
    document.getElementById("sub").style.display="none";
  </script>
       

  <script type="text/javascript" src="platformer.js"></script>
  


</body>

 
</html>
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

    $sql = "INSERT INTO PACMAN (username,score)
    VALUES ('$name','$score')";
    if (mysqli_query($conn, $sql)) {
    
    } else {
     echo "Error: " . $sql . "
 " . mysqli_error($conn);
    }
    mysqli_close($conn);
 }

?>

<style>
    body{
        background-image: url("../img/bg1.gif");
        background-repeat: no-repeat;
        background-size: cover;
        background-blend-mode: darken;
    }

    canvas {
        position: absolute;
        background-color:black;
        margin-left: 550px;
        margin-top: 200px;
    }

    .title {
        position: absolute;
        width: 400px;
        margin-left: 570px;
        margin-top: 20px;
    }

    p{
        position: absolute;
        margin-left: 730px;
        margin-top: 770px;
        color: rgb(240, 176, 55);
        font-family: sans-serif;
    }

    .pinky, .orange{
        margin-top: 300px;
        margin-left: 200px;
        width: 200px;
    }

    .orange{
        margin-left: 750px;
    }

    .test{
  margin-top: 400px;
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
    position: absolute;
  margin-left: 680px;
  width: 40px;
  height: 50px;

}


#second {
    position: absolute;
  margin-left: 760px;
  width: 40px;
  height: 50px;


}

#third {
    position: absolute;
  margin-left: 840px;
  width: 40px;
  height: 50px;

}

.submit{
  margin-left: 720px;

  background-color:#ec91b7;
  margin-top: 550px;
  height: 30px;
  width: 140px;
  border-color:#ffe1ea;
  color: #fff3f6;
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
  margin-top: 200px;

  float: left;
}

.test {
  margin-right: 50 px;
  z-index: 999;
  position: absolute;
}

.invisible {
  visibility: hidden;
}

</style>

<img src = "assets/banner.png" class="title">
<canvas></canvas>

<form class="name" method="POST">
        <div class="row">
        <input type="text" class="test" id="first" name="first" placeholder="A" style="text-align:center;" maxlength="1">          
        <input type="text" class="test" id="second" name="second" placeholder="A" style="text-align:center;" maxlength="1">
        <input type="text" class="test" id="third" name="third" placeholder="A" style="text-align:center;" maxlength="1">
        
      
        </div>
        <input type="text" class="invisible" name="score" id="sc">
        <button class="submit" id="sub">SUBMIT</button>
        
      </form> 

<p>
    <span>SCORE: </span>
    <span id="score"> 0</span>
</p>

<script>
    document.getElementById("first").style.display="none";
    document.getElementById("second").style.display="none";
    document.getElementById("third").style.display="none";
    document.getElementById("sub").style.display="none";
  </script>
       


<script src="pacman.js"></script>


<img src = "assets/pinky.png" class="pinky">
<img src = "assets/orange.png" class="orange">
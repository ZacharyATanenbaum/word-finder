<!DOCTYPE html>
<html>
<head>
    <?php $base = "../../" ?>
    <base href="../../">
    <script src="js/jquery-2.2.4.min.js"></script>
    <script src="js/facebox.js"></script>
    <script src="js/gameSettings.js"></script>
    <link rel="stylesheet" type="text/css" href="css/facebox.css"/>
    <link rel="stylesheet" type="text/css" href="css/main.css"/>
    <link rel="stylesheet" type="text/css" href="css/bootstrap.css"/>
    <script type="text/javascript">
        jQuery(document).ready(function($) {
            $('a[rel*=facebox]').facebox()
        })
    </script>
</head>
<body>
<div class="container">
    <?php include $base."header.php"; ?>
    <nav>
        <ul>
        <li><a href="">Home</a></li>
        </ul>
        <?php include $base."leftMenuGame.php"; ?>
    </nav>
    <article>
        <h1 id="gameName">Word-Finder</h1>
        <h3 id="groupName">The Raging Dissapointments</h3>
        <h3>Instruction:</h3>
        <div id="gameDesc" class="jumbotron">
            <div>
                <p>
                    <b>How to Win</b>
                    <br>
                    <font size="2">The goal of the game is to have the most points when the game ends. The game ends when all rounds have been completed. A round being a cycle where each player gets a single turn.</font>
                </p>
                <p>
                    <b>Turns</b>
                    <br>
                    <font size="2">A turn is split into two section - The Action Phase and Word Phase. In the Action Phase a player gets to rotate a column (up/down) a row (right/left) or swap a letter with any other letter. The Word Phase is where a player may select a word on the board to remove for points. The removed letters are then re-populated randomly.</font>
                </p>
                <p>
                    <b>Rules</b>
                    <br>
                <ul>
                    <li>A word may only go from left to right or up to down.</li>
                    <li>A word must be adjacent letters that are not diagonal.</li>
                    <li>The maximum board size is 12 letters by 12 letters.</li>
                    <li>There may be up to four players and a bot. His name is Botty Mc. BotFace.</li> 
                </ul>
                </p>
            </div>
        </div>
        <div id="scoreArea", class="jumbotron">
	</div>
        <h3>Play It!</h3>
        <form id="gameSettings" class="well">
        </form>
<!--        <iframe src="games/Word-Finder/build/index.html" class="game" width="800" height="800"></iframe>-->
    </article>
    <?php include $base."footer.php"; ?>
</div>
<script type="text/javascript">
    newWindowBtn(1000,900,"games/Word-Finder/build/index.html", ['textBoxDemo', 'btnDemo', 'selectDemo']);
</script>
</body>
</html>

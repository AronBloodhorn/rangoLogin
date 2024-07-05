<?php
    if(isset($_POST["username"]) && isset($_POST["password"]))
    {
        
        try{
            define("conn", new PDO("mysql:host=localhost; dbname=testdb3", "root", "RootPass142536.o;o"));
            $sql = "SELECT username, password FROM USERS
                    WHERE username = :username AND password = :password";
            $stmt = conn->prepare($sql);
            $stmt->bindValue(":username", $_POST["username"]);
            $stmt->bindValue(":password", $_POST["password"]);
            $stmt->execute();
            if($stmt->rowCount() > 0)
            {
                echo"Проверка данных пройдена";
            }else{
                $sql = "SELECT * From USERS";
                $stmt = conn->prepare($sql);
                $stmt->execute();
                if($stmt->rowCount() > 0){
                    foreach($stmt as $row){
                        if(!empty($_POST["username"]) && $_POST["username"] == $row["username"]){
                            echo "Пароль не введён или введён не верно";
                        }else if(!empty($_POST["password"]) && $_POST["password"] == $row["password"]){
                            echo "Введите имя пользователя";
                        }else if(empty($_POST["username"]) && empty($_POST["password"])) {
                            echo "Введите имя пользователя и пароль!";
                        }else if($_POST["username"] != $row["username"] || $_POST["password"] != $row["password"]){
                            echo "Ошибка в имени пользователя или пароле";
                        }
                    }
                }
            }
        }
        catch(PDOException $ex){ echo "Ошибка подключения базы данных - ". $ex->getMessage();}
    }